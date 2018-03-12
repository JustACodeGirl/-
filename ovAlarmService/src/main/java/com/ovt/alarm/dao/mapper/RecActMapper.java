/**
 * RecActMapper.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.ovt.alarm.common.constant.DBConstants.TABLES;
import com.ovt.alarm.dao.vo.RecAct;

/**
 * RecActMapper
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class RecActMapper implements RowMapper<RecAct>
{
    public RecAct mapRow(ResultSet rs, int rowNum) throws SQLException
    {
        RecAct act = new RecAct();
        act.setActId(rs.getLong(TABLES.REC_ACT.ACT_ID));
        act.setRecId(rs.getLong(TABLES.REC_ACT.REC_ID));
        act.setUserId(rs.getLong(TABLES.REC_ACT.USER_ID));
        act.setUserCode(rs.getString(TABLES.REC_ACT.USER_CODE));
        act.setUserName(rs.getString(TABLES.REC_ACT.USER_NAME));
        act.setRoleId(rs.getLong(TABLES.REC_ACT.ROLE_ID));
        act.setRoleName(rs.getString(TABLES.REC_ACT.ROLE_NAME));
        act.setDealType(rs.getString(TABLES.REC_ACT.DEAL_TYPE));
        act.setDealOpinion(rs.getString(TABLES.REC_ACT.DEAL_OPINION));
        act.setCreateTime(rs.getLong(TABLES.REC_ACT.CREATE_TIME));
        return act;
    }

}
