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
import com.ovt.alarm.dao.vo.User;

/**
 * UserMapper
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[DAO] 1.0
 */
public class UserMapper implements RowMapper<User>
{
    private final String ROLE_ID = "role_id";
    private final String ROLE_NAME = "role_name";
    
    public User mapRow(ResultSet rs, int rowNum) throws SQLException
    {
        User user = new User();
        user.setId(rs.getLong(TABLES.USER.ID));
        user.setUserCode(rs.getString(TABLES.USER.USER_CODE));
        user.setUserName(rs.getString(TABLES.USER.USER_NAME));
        user.setPassword(rs.getString(TABLES.USER.PASSWORD));
        user.setPhone(rs.getString(TABLES.USER.PHONE));
        user.setRoleId(rs.getLong(ROLE_ID));
        user.setRoleName(rs.getString(ROLE_NAME));
        return user;
    }

}
