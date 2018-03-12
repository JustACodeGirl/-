/**
 * RecDaoImpl.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.dao;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ovt.alarm.common.utils.StringUtils;
import com.ovt.alarm.dao.mapper.RecActMapper;
import com.ovt.alarm.dao.mapper.RecMapper;
import com.ovt.alarm.dao.mapper.RecMediaMapper;
import com.ovt.alarm.dao.vo.Rec;
import com.ovt.alarm.dao.vo.RecAct;
import com.ovt.alarm.dao.vo.RecMedia;

/**
 * RecDaoImpl
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
@Repository
public class RecDaoImpl implements RecDao
{
    @Autowired
    private DaoHelper daoHelper;

    @Autowired
    private RecMapper recMapper;

    @Autowired
    private RecMediaMapper mediaMapper;

    @Autowired
    private RecActMapper actMapper;

    private final static String SQL_GET_PREFIX = " select rec.rec_id,task_num,caller_account,caller_name, "
            + " caller_phone,caller_address,caller_desc,state,rec.create_time from t_rec rec ";

    private final static String SQL_GET_MEDIAS_BY_REC_ID = " select media_id,rec_id,media_type,media_path, "
            + " screenshot_path,record_time from t_rec_media where rec_id = ? ";

    private final static String SQL_GET_ACTS_BY_REC_ID = "select act_id,rec_id,user_id,user_name,user_code, "
            + " role_id,role_name,deal_type,deal_opinion,create_time from t_rec_act where rec_id = ? order by create_time ";

    private static final String SQL_INSERT_REC_ACT = "INSERT INTO t_rec_act(rec_id,user_id,user_code,user_name, "
            + " role_id,role_name,deal_type,deal_opinion,create_time) VALUES(?, ?, ?, ?, ?, ?, ?, ?,?)";

    private static final String SQL_UPDATE_REC = "UPDATE t_rec "
            + " SET state=?,next_role_id=?,next_role_name=? WHERE rec_id=? ";

    private final static String SQL_GET_COUNT_PREFIX = " select count(*) from t_rec rec ";

    private final static String SQL_COUNT_UNFINISHED_RECORDS = " select count(*) from t_rec rec where (rec.state='处理中' or rec.state='挂起') and next_role_id = ? ";

    private static final String SQL_INSERT_REC = "INSERT INTO t_rec(task_num,caller_account,caller_name,caller_phone, "
            + " caller_address,caller_desc,state,next_role_id,next_role_name,create_time) VALUES(?, ?, ?, ?, ?, ?, '待办', 0, '',?)";

    private static final String SQL_INSERT_REC_MEIDA = "INSERT INTO t_rec_media(rec_id,media_type,media_path,screenshot_path, "
            + " record_time) VALUES(?, ?, ?, ?, ?)";

    private final static String SQL_GET_MAX_TASKNUM = " select max(task_num) from t_rec where create_time between ? and ? ";

    @Override
    public List<Rec> getRecListByBox(long index, int count, String boxType,
            long roleId)
    {
        String errMsg = "Failed to query rec list by box:{0}!";

        String sql = "";
        if ("TODO".equals(boxType))
        {
            sql = SQL_GET_PREFIX + " where rec.state = '待办'";
        }
        else if ("DOING".equals(boxType))
        {
            sql = SQL_GET_PREFIX
                    + " where rec.state='处理中' and rec.next_role_id=" + roleId;
        }
        else if ("HANDLED".equals(boxType))
        {
            sql = SQL_GET_PREFIX
                    + " left join t_rec_act act on rec.rec_id = act.rec_id where act.role_id="
                    + roleId;
        }
        else if ("HANGUP".equals(boxType))
        {
            sql = SQL_GET_PREFIX
                    + " where rec.state='挂起' and rec.next_role_id=" + roleId;
        }
        sql += " order by rec.rec_id desc limit ?,? ";
        List<Rec> recs = daoHelper.queryForList(sql, recMapper, errMsg, index,
                count);
        return recs;
    }

    @Override
    public List<Rec> getRecListByCondition(long index, int count,
            long startTime, long endTime, String state, String keyword)
    {
        String errMsg = "Failed to query rec list by condition!";

        String sql = SQL_GET_PREFIX + " where 1=1 ";
        if (startTime != 0 || endTime != 0)
        {
            sql += " and create_time between " + startTime + " and " + endTime;
        }
        if (StringUtils.isNotBlank(state))
        {
            sql += " and state = '" + state + "' ";
        }
        if (StringUtils.isNotBlank(keyword))
        {
            sql += " and (caller_account = '" + keyword + "' ";
            sql += " or caller_name = '" + keyword + "' ";
            sql += " or caller_phone = '" + keyword + "' ";
            sql += " or task_num = '" + keyword + "') ";
        }

        sql += " order by rec.rec_id desc limit ?,? ";

        List<Rec> recs = daoHelper.queryForList(sql, recMapper, errMsg, index,
                count);
        return recs;
    }

    @Override
    public List<Rec> getRecListByCallerAccount(String callerAccount)
    {
        String errMsg = "Failed to query rec list by String callerAccount!";

        String sql = SQL_GET_PREFIX + " where caller_account = ? ";
        List<Rec> recs = daoHelper.queryForList(sql, recMapper, errMsg,
                callerAccount);
        return recs;
    }

    @Override
    public List<RecMedia> getRecMediaList(long recId)
    {
        String errMsg = MessageFormat.format(
                "Failed query rec medias by recId {0}!", recId);
        List<RecMedia> medias = daoHelper.queryForList(
                SQL_GET_MEDIAS_BY_REC_ID, mediaMapper, errMsg, recId);

        return medias;
    }

    @Override
    public List<RecAct> getRecActList(long recId)
    {
        String errMsg = MessageFormat.format(
                "Failed query rec acts by recId {0}!", recId);
        List<RecAct> acts = daoHelper.queryForList(SQL_GET_ACTS_BY_REC_ID,
                actMapper, errMsg, recId);

        return acts;
    }

    @Override
    public long saveRecAct(RecAct act)
    {
        String errMsg = MessageFormat.format(
                "Failed create rec act with recId {0}!", act.getRecId());
        Object[] param = new Object[9];
        param[0] = act.getRecId();
        param[1] = act.getUserId();
        param[2] = act.getUserCode();
        param[3] = act.getUserName();
        param[4] = act.getRoleId();
        param[5] = act.getRoleName();
        param[6] = act.getDealType();
        param[7] = act.getDealOpinion();
        param[8] = act.getCreateTime();

        long id = daoHelper.save(SQL_INSERT_REC_ACT, errMsg, true, param);
        return id;
    }

    @Override
    public void updateRec(Rec rec)
    {
        String errMsg = MessageFormat.format(
                "Failed update rec with recId {0}!", rec.getRecId());
        Object[] param = new Object[4];
        param[0] = rec.getState();
        param[1] = rec.getNextRoleId();
        param[2] = rec.getNextRoleName();
        param[3] = rec.getRecId();
        daoHelper.update(SQL_UPDATE_REC, errMsg, param);
    }

    @Override
    public long countBoxRecords(String boxType, long roleId)
    {
        String errMsg = "Failed to query rec count by box:{0}!";

        String sql = "";
        if ("TODO".equals(boxType))
        {
            sql = SQL_GET_COUNT_PREFIX + " where rec.state = '待办'";
        }
        else if ("DOING".equals(boxType))
        {
            sql = SQL_GET_COUNT_PREFIX
                    + " where rec.state='处理中' and rec.next_role_id=" + roleId;
        }
        else if ("HANDLED".equals(boxType))
        {
            sql = SQL_GET_COUNT_PREFIX
                    + " left join t_rec_act act on rec.rec_id = act.rec_id where act.role_id="
                    + roleId;
        }
        else if ("HANGUP".equals(boxType))
        {
            sql = SQL_GET_COUNT_PREFIX
                    + " where rec.state='挂起' and rec.next_role_id=" + roleId;
        }
        Long count = daoHelper.queryForObject(sql, Long.class, errMsg);
        if (count != null)
        {
            return count.longValue();
        }

        return 0;
    }

    @Override
    public long countConditionRecords(long startTime, long endTime,
            String state, String keyword)
    {
        String errMsg = "Failed to query rec count by condition!";

        String sql = SQL_GET_COUNT_PREFIX + " where 1=1 ";
        if (startTime != 0 || endTime != 0)
        {
            sql += " and create_time between " + startTime + " and " + endTime;
        }
        if (StringUtils.isNotBlank(state))
        {
            sql += " and state = '" + state + "' ";
        }
        if (StringUtils.isNotBlank(keyword))
        {
            sql += " and (caller_account = '" + keyword + "' ";
            sql += " or caller_name = '" + keyword + "' ";
            sql += " or caller_phone = '" + keyword + "' ";
            sql += " or task_num = '" + keyword + "') ";
        }

        Long count = daoHelper.queryForObject(sql, Long.class, errMsg);
        if (count != null)
        {
            return count.longValue();
        }

        return 0;
    }

    @Override
    public long countUnfinishedRecords(long roleId)
    {
        if (roleId > 0)
        {
            String errMsg = "Failed to query unfinished rec count by role!";
            Long count = daoHelper.queryForObject(SQL_COUNT_UNFINISHED_RECORDS,
                    Long.class, errMsg, roleId);
            if (count != null)
            {
                return count.longValue();
            }
        }
        return 0;
    }

    @Override
    public long saveRec(Rec rec)
    {
        String errMsg = "Failed create rec!";
        Object[] param = new Object[7];
        param[0] = rec.getTaskNum();
        param[1] = rec.getCallerAccount();
        param[2] = rec.getCallerName();
        param[3] = rec.getCallerPhone();
        param[4] = rec.getCallerAddress();
        param[5] = rec.getCallerDesc();
        param[6] = rec.getCreateTime();

        long id = daoHelper.save(SQL_INSERT_REC, errMsg, true, param);
        return id;
    }

    @Override
    public void batchSaveRecMedia(long recId, List<RecMedia> medias)
    {
        String errMsg = MessageFormat.format(
                "Failed create rec medias with recId {0}!", recId);

        List<Object[]> batchArgs = new ArrayList<Object[]>();

        for (RecMedia media : medias)
        {
            Object[] param = new Object[5];
            param[0] = recId;
            param[1] = media.getMediaType();
            param[2] = media.getMediaPath();
            if ("IMAGE".equals(media.getMediaType()))
            {
                param[3] = media.getMediaPath();
            }
            else
            {
                param[3] = media.getScreenshotPath();
            }
            param[4] = media.getRecordTime();
            batchArgs.add(param);
        }

        daoHelper.batchUpdate(SQL_INSERT_REC_MEIDA, errMsg, batchArgs);

    }

    @Override
    public String getMaxTaskNum(long startTime, long endTime)
    {
        String errMsg = "Failed to query max tasknum!";
        String taskNum = daoHelper.queryForObject(SQL_GET_MAX_TASKNUM,
                String.class, errMsg, startTime, endTime);
        if (taskNum != null)
        {
            return taskNum;
        }

        return "";
    }

}
