/**
 * UserRoleDaoImpl.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月19日
 */
package com.ovt.alarm.dao;

import java.text.MessageFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


/**
 * UserRoleDaoImpl
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
@Repository
public class UserRoleDaoImpl implements UserRoleDao
{

    @Autowired
    private DaoHelper daoHelper;


    private final String SQL_DELETE_USER_ROLE_BY_ROLE_ID = "delete from t_user_role WHERE role_id=?";

    private final String SQL_DELETE_USER_ROLE_BY_USER_ID = "delete from t_user_role WHERE user_id=?";

    private final String SQL_INSERT_USER_ROLE = "INSERT INTO t_user_role(user_id, role_id) VALUES(?,?)";

    public void deleteByRoleId(long roleId)
    {
        String errMsg = MessageFormat.format(
                "Failed delete user role info with roleId: {0}", roleId);

        daoHelper.update(SQL_DELETE_USER_ROLE_BY_ROLE_ID, errMsg, roleId);

    }

    public void deleteByUserId(long userId)
    {
        String errMsg = MessageFormat.format(
                "Failed delete user role info with userId: {0}", userId);

        daoHelper.update(SQL_DELETE_USER_ROLE_BY_USER_ID, errMsg, userId);

    }

    public void addUserRole(long userId, long roleId)
    {
        String errMsg = MessageFormat.format(
                "Failed create user role with userId {0},roleId {1}!", userId,
                roleId);
        Object[] param = new Object[2];
        param[0] = userId;
        param[1] = roleId;
        daoHelper.save(SQL_INSERT_USER_ROLE, errMsg, true, param);
    }

}
