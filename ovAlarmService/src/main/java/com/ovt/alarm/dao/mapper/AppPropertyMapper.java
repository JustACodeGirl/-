/**
 * UserMapper.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 5, 2015
 */
package com.ovt.alarm.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.ovt.alarm.common.constant.DBConstants.TABLES;
import com.ovt.alarm.dao.vo.AppProperty;

/**
 * UserMapper
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[DAO] 1.0
 */
public class AppPropertyMapper implements RowMapper<AppProperty>
{

    public AppProperty mapRow(ResultSet rs, int rowNum) throws SQLException
    {
        AppProperty appProperty = new AppProperty();
        appProperty.setId(rs.getLong(TABLES.APP_PROPERTY.ID));
        appProperty.setPropName(rs.getString(TABLES.APP_PROPERTY.PROP_NAME));
        appProperty.setPropValue(rs.getString(TABLES.APP_PROPERTY.PROP_VALUE));
        appProperty.setDesc(rs.getString(TABLES.APP_PROPERTY.DESC));
        appProperty.setUpdateTime(rs.getTimestamp(TABLES.APP_PROPERTY.UPDATE_TIME));
        return appProperty;
    }

}
