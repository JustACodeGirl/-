/**
 * RoleMapper.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月19日
 */
package com.ovt.alarm.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.ovt.alarm.common.constant.DBConstants.TABLES;
import com.ovt.alarm.dao.vo.Role;

/**
 * RoleMapper
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class RoleMapper implements RowMapper<Role>
{

    public Role mapRow(ResultSet rs, int rowNum) throws SQLException
    {
        Role role = new Role();
        role.setId(rs.getLong(TABLES.ROLE.ID));
        role.setRoleName(rs.getString(TABLES.ROLE.ROLE_NAME));
        role.setRoleDesc(rs.getString(TABLES.ROLE.ROLE_DESC));
        return role;
    }

}
