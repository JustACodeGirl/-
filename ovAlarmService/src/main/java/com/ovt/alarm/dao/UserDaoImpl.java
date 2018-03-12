/**
 * UserDaoImpl.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * 2016年6月30日
 */
package com.ovt.alarm.dao;

import java.text.MessageFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ovt.alarm.common.utils.EncryptionUtils;
import com.ovt.alarm.dao.mapper.UserMapper;
import com.ovt.alarm.dao.vo.User;

/**
 * UserDaoImpl
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[DAO] 1.0
 */

@Repository
public class UserDaoImpl implements UserDao
{
    @Autowired
    private DaoHelper daoHelper;

    @Autowired
    private UserMapper userMapper;
    
    private static final String SQL_GET_USER_BY_CODE = 
            " select id,user_code,user_name,password,phone,0 as role_id,'' as role_name from t_user" +
            " where is_delete=0 and user_code=? LIMIT 1";
    
    private static final String SQL_INSERT_USER = "INSERT INTO t_user(user_code,user_name, password,phone) VALUES(?, ?, ?, ?)";

    private static final String SQL_UPDATE_USER = "UPDATE t_user "
            + " SET user_code=?,user_name=?,password=?,phone=? WHERE id=?";
    
    private static final String SQL_DELETE_USER = "UPDATE t_user SET is_delete=1 WHERE id = ?";
    
    private static final String SQL_GET_LIST = 
            " select a.id, a.user_code,a.user_name, '' as password,a.phone,c.id as role_id,c.role_name " +
            " from (t_user a left join t_user_role b on a.id=b.user_id) " +
            " left join t_role c on b.role_id=c.id and c.is_delete=0 " +
            " where a.is_delete=0 and (role_id=@roleId) LIMIT ?,? ";
    
    private static final String SQL_COUNT_RECORDS = 
            " select count(*) " +
            " from (t_user a left join t_user_role b on a.id=b.user_id) " +
            " left join t_role c on b.role_id=c.id and c.is_delete=0 " +
            " where a.is_delete=0 and (role_id=@roleId) ";
    
    private static final String SQL_GET_USER_BY_ID = 
            " select id,user_code,user_name,password,phone,0 as role_id,'' as role_name from t_user" +
            " where is_delete=0 and id=? LIMIT 1";
    
    public User getUserByCode(String userCode)
    {
        String errMsg = MessageFormat.format("Failed query user by code {0}!",
                userCode);
        User user = daoHelper.queryForObject(SQL_GET_USER_BY_CODE, userMapper,
                errMsg, userCode);

        return user;
    }

    public long save(User user)
    {
        String errMsg = MessageFormat.format(
                "Failed create user with name {0}!", user.getUserName());
        Object[] param = new Object[4];
        param[0] = user.getUserCode();
        param[1] = user.getUserName();
        param[2] = EncryptionUtils.encrypt(user.getPassword());
        param[3] = user.getPhone();

        long id = daoHelper.save(SQL_INSERT_USER, errMsg, true, param);
        return id;
    }
    
    public void update(User user) 
    {   
        String errMsg = MessageFormat.format("Failed update user with name {0}!",
                user.getUserName());
        Object[] param = new Object[5];
        param[0] = user.getUserCode();
        param[1] = user.getUserName();
        param[2] = user.getPassword();
        param[3] = user.getPhone();
        param[4] = user.getId();
        this.daoHelper.update(SQL_UPDATE_USER, errMsg, param);
    }
    
    public void delete(long userId)
    {
        String errMsg = MessageFormat.format("Failed to delete user by id {0}!",
                userId);

        daoHelper.update(SQL_DELETE_USER, errMsg, userId);
    }
    
    public List<User> getList(long index, int count, long roleId)
    {
        String errMsg = "Failed to query users list!";

        String sql = SQL_GET_LIST.replaceAll("@roleId", String.valueOf(roleId));
        if (roleId <= 0)
        {
            sql = SQL_GET_LIST.replaceAll("@roleId", "0 or 1=1");
        }

        List<User> users = daoHelper.queryForList(sql, userMapper, errMsg,
                index, count);

        return users;
    }
    
    public long countRecords(long roleId)
    {
        String errMsg = "Failed to get records count of table t_user";
        String sql = SQL_COUNT_RECORDS.replaceAll("@roleId",
                String.valueOf(roleId));
        if (roleId <= 0)
        {
            sql = SQL_COUNT_RECORDS.replaceAll("@roleId", "0 or 1=1");
        }

        Long count = daoHelper.queryForObject(sql, Long.class, errMsg);
        if (count != null)
        {
            return count.longValue();
        }

        return 0;
    }
    
    public User getUserById(long userId)
    {
        String errMsg = MessageFormat.format("Failed query user by id {0}!",
                userId);
        User user = daoHelper.queryForObject(SQL_GET_USER_BY_ID, userMapper,
                errMsg, userId);

        return user;
    }
    
}