/**
 * RecServiceImpl.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ovt.alarm.common.utils.DateTimeUtils;
import com.ovt.alarm.common.utils.StringUtils;
import com.ovt.alarm.dao.RecDao;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.dao.vo.Rec;
import com.ovt.alarm.dao.vo.RecAct;
import com.ovt.alarm.dao.vo.RecMedia;
import com.ovt.alarm.dao.vo.RecReport;
import com.ovt.alarm.dao.vo.User;
import com.ovt.alarm.service.context.SessionContext;
import com.ovt.alarm.service.exception.ServiceErrorCode;
import com.ovt.alarm.service.exception.ServiceException;
import com.ovt.alarm.service.websocket.WebSocketMsg;

/**
 * RecServiceImpl
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
@Service
public class RecServiceImpl implements RecService
{

    @Autowired
    private RecDao recDao;

    @Override
    public CommonList<Rec> getRecListByBox(long index, int count, String boxType)
            throws ServiceException
    {
        User currentuser = SessionContext.getCurrentUser();
        CommonList<Rec> commonList = new CommonList<Rec>();
        List<Rec> recs = recDao.getRecListByBox(index, count, boxType,
                currentuser.getRoleId());
        if (recs == null)
        {
            return commonList;
        }
        commonList.setList(recs);
        commonList.setResultSize(recs.size());
        commonList.setTotalSize(recDao.countBoxRecords(boxType,
                currentuser.getRoleId()));
        return commonList;
    }

    @Override
    public CommonList<Rec> getRecListByCondition(long index, int count,
            long startTime, long endTime, String state, String keyword)
            throws ServiceException
    {
        CommonList<Rec> commonList = new CommonList<Rec>();
        List<Rec> recs = recDao.getRecListByCondition(index, count, startTime,
                endTime, state, keyword);
        if (recs == null)
        {
            return commonList;
        }
        commonList.setList(recs);
        commonList.setResultSize(recs.size());
        commonList.setTotalSize(recDao.countConditionRecords(startTime,
                endTime, state, keyword));
        return commonList;
    }

    @Override
    public CommonList<Rec> getRecListByCallerAccount(String callerAccount)
            throws ServiceException
    {
        if (StringUtils.isBlank(callerAccount))
        {
            throw new ServiceException(
                    ServiceErrorCode.CALLER_ACCOUNT_NULL,
                    "Caller account is null");
        }
        CommonList<Rec> commonList = new CommonList<Rec>();
        List<Rec> recs = recDao.getRecListByCallerAccount(callerAccount);
        if (recs == null)
        {
            return commonList;
        }
        commonList.setList(recs);
        commonList.setResultSize(recs.size());
        commonList.setTotalSize(recs.size());
        return commonList;
    }

    @Override
    public List<RecMedia> getRecMediaList(long recId) throws ServiceException
    {
        return recDao.getRecMediaList(recId);
    }

    @Override
    public List<RecAct> getRecActList(long recId) throws ServiceException
    {
        return recDao.getRecActList(recId);
    }

    @Override
    public void dealRec(long recId, String dealType, String dealOpinion)
            throws ServiceException
    {
        User currentuser = SessionContext.getCurrentUser();
        if (currentuser.getRoleId() <= 0)
        {
            throw new ServiceException(
                    ServiceErrorCode.USER_HAS_NOT_SETTED_ROLE,
                    "User has not setted role");
        }
        Rec rec = new Rec();
        rec.setRecId(recId);

        RecAct act = new RecAct();
        act.setRecId(recId);
        act.setUserId(currentuser.getId());
        act.setUserCode(currentuser.getUserCode());
        act.setUserName(currentuser.getUserName());
        act.setRoleId(currentuser.getRoleId());
        act.setRoleName(currentuser.getRoleName());
        act.setDealType(dealType);
        act.setDealOpinion(dealOpinion);
        act.setCreateTime(DateTimeUtils.getCurrentTimestamp().getTime());

        if ("受理".equals(dealType))
        {
            rec.setState("处理中");
            rec.setNextRoleId(currentuser.getRoleId());
            rec.setNextRoleName(currentuser.getRoleName());
            recDao.updateRec(rec);
        }
        else if ("办结".equals(dealType))
        {
            rec.setState("办结");
            rec.setNextRoleId(currentuser.getRoleId());
            rec.setNextRoleName(currentuser.getRoleName());
            recDao.updateRec(rec);
        }
        else if ("退回".equals(dealType))
        {
            rec.setState("退回");
            rec.setNextRoleId(0);
            rec.setNextRoleName("");
            recDao.updateRec(rec);
        }
        else if ("转交".equals(dealType))
        {
            rec.setState("待办");
            rec.setNextRoleId(0);
            rec.setNextRoleName("");
            recDao.updateRec(rec);
        }
        else if ("挂起".equals(dealType))
        {
            rec.setState("挂起");
            rec.setNextRoleId(currentuser.getRoleId());
            rec.setNextRoleName(currentuser.getRoleName());
            recDao.updateRec(rec);
        }
        else if ("作废".equals(dealType))
        {
            rec.setState("作废");
            rec.setNextRoleId(0);
            rec.setNextRoleName("");
            recDao.updateRec(rec);
        }
        else
        {
            throw new ServiceException(ServiceErrorCode.OPERATION_IS_ILLEGAL,
                    "Operation is illegal");
        }
        recDao.saveRecAct(act);

    }

    @Override
    public void reportRec(RecReport report) throws ServiceException
    {
        int nextNum = 1;
        Date todayDate = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        String todayStr = df.format(todayDate);
        long startTime = DateTimeUtils.getDayStart(todayDate).getTime();
        long endTime = DateTimeUtils.getDayEnd(todayDate).getTime();
        String taskNum = recDao.getMaxTaskNum(startTime, endTime);
        if (StringUtils.isNotBlank(taskNum))
        {
            nextNum = Integer.parseInt(taskNum.substring(8)) + 1;
        }
        if (nextNum < 10)
        {
            taskNum = todayStr + "000" + String.valueOf(nextNum);
        }
        else if (nextNum < 100)
        {
            taskNum = todayStr + "00" + String.valueOf(nextNum);
        }
        else if (nextNum < 1000)
        {
            taskNum = todayStr + "0" + String.valueOf(nextNum);
        }
        else
        {
            taskNum = todayStr + String.valueOf(nextNum);
        }

        Rec rec = new Rec();
        rec.setTaskNum(taskNum);
        rec.setCallerAccount(report.getCallerAccount());
        rec.setCallerName(report.getCallerName());
        rec.setCallerPhone(report.getCallerPhone());
        rec.setCallerAddress(report.getCallerAddress());
        rec.setCallerDesc(report.getCallerDesc());
        rec.setCreateTime(DateTimeUtils.getCurrentTimestamp().getTime());
        long recId = recDao.saveRec(rec);
        recDao.batchSaveRecMedia(recId, report.getMedias());
        try
        {
            WebSocketMsg.sendMessageToOnlineUsers(null,"您有新案件["+taskNum+"]到达，报警地址:"+report.getCallerAddress());
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

    }

}
