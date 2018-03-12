/**
 * RecMapper.java
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
import com.ovt.alarm.dao.vo.Rec;

/**
 * RecMapper
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class RecMapper implements RowMapper<Rec>
{
    public Rec mapRow(ResultSet rs, int rowNum) throws SQLException
    {
        Rec rec = new Rec();
        rec.setRecId(rs.getLong(TABLES.REC.REC_ID));
        rec.setTaskNum(rs.getString(TABLES.REC.TASK_NUM));
        rec.setCallerAccount(rs.getString(TABLES.REC.CALLER_ACCOUNT));
        rec.setCallerName(rs.getString(TABLES.REC.CALLER_NAME));
        rec.setCallerPhone(rs.getString(TABLES.REC.CALLER_PHONE));
        rec.setCallerAddress(rs.getString(TABLES.REC.CALLER_ADDRESS));
        rec.setCallerDesc(rs.getString(TABLES.REC.CALLER_DESC));
        rec.setState(rs.getString(TABLES.REC.STATE));
        rec.setCreateTime(rs.getLong(TABLES.REC.CREATE_TIME));
        return rec;
    }

}
