/**
 * UserAccessTokenDao.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 5, 2015
 */
package com.ovt.alarm.dao;

import java.sql.Timestamp;
import java.text.MessageFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ovt.alarm.common.utils.DataConvertUtils;
import com.ovt.alarm.dao.vo.UserToken;

/**
 * UserAccessTokenDao
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[DAO] 1.0
 */
@Repository
public class UserTokenDaoImpl implements UserTokenDao
{
    @Autowired
    private DaoHelper daoHelper;

    private static final String SQL_GET_USER = "SELECT user_id FROM t_user_token "
            + "WHERE user_token = ? LIMIT 1";

    private static final String SQL_INSERT_TOKEN = "INSERT INTO t_user_token(user_id, user_token, "
            + "expire_time, create_time) "
            + "VALUES (?, ?, ?, CURRENT_TIMESTAMP)";

    private static final String SQL_DELETE_TOKEN = "DELETE FROM t_user_token WHERE user_token = ?";

    private static final String SQL_DELETE_TOKEN_BY_USER = "DELETE FROM t_user_token WHERE user_id = ?";
    
    private static final String SQL_DELETE_EXPIRED_USER_TOKEN = "DELETE FROM t_user_token "
            + "WHERE expire_time < CURRENT_TIMESTAMP";
    
    private static final String SQL_UPDATE_EXPIRED_TIME = "UPDATE t_user_token "
            + "SET expire_time = ? WHERE user_token = ?";

    /*
     * (non-Javadoc)
     * 
     * @see com.ovt.dao.UserAccessTokenDao#getUserByToken(java.lang.String)
     */
    public long getUserByToken(final String accessToken)
    {

        // get from db
        String errMsg = MessageFormat.format(
                "Failed to get user by access token [{0}]", accessToken);
        Long userId = DataConvertUtils.toLong(daoHelper
                .queryForObject(SQL_GET_USER, Long.class, errMsg, accessToken));

        if(userId != null)
		{
			return userId.longValue();
		}
		
		return 0;
    }
    
    public void updateTokenExpireTime(final String accessToken, Timestamp expireTime)
    {
        // get from db
        String errMsg = MessageFormat.format(
                "Failed to update expire time of access token [{0}]", accessToken);
        this.daoHelper.update(SQL_UPDATE_EXPIRED_TIME, errMsg, expireTime, accessToken);
    }

    /*
     * (non-Javadoc)
     * 
     * @see com.ovt.dao.UserAccessTokenDao#save(java.lang.String,
     * java.lang.String)
     */
    public String save(final UserToken accessToken)
    {

        String errMsg = MessageFormat.format(
                "Failed to insert access token [{0}]!", accessToken.getToken());

        daoHelper.save(SQL_INSERT_TOKEN, errMsg, false, accessToken.getUserId(),
                accessToken.getToken(), accessToken.getExpireTime());

        return accessToken.getToken();
    }

    /*
     * (non-Javadoc)
     * 
     * @see com.ovt.dao.UserAccessTokenDao#delete(java.lang.String)
     */
    public void delete(final String accessToken)
    {
        String errMsg = MessageFormat
                .format("Failed to delete access token [{0}]", accessToken);
        daoHelper.update(SQL_DELETE_TOKEN, errMsg, accessToken);
    }

    /*
     * (non-Javadoc)
     * 
     * @see com.ovt.dao.UserAccessTokenDao#deleteTokensByUser(long)
     */
    public void deleteTokensByUser(final long userId)
    {
        String errMsg = MessageFormat
                .format("Failed to delete access token of user {0}!", userId);

        daoHelper.update(SQL_DELETE_TOKEN_BY_USER, errMsg, userId);
    }
    
    public void deleteExpiredUserToken()
    {
        String errMsg = MessageFormat
                .format("Failed to delete expired access token!", (Object[])null);

        daoHelper.update(SQL_DELETE_EXPIRED_USER_TOKEN, errMsg);
    }

}
