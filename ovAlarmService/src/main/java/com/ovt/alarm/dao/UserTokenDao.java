/**
 * UserAccessTokenDao.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 5, 2015
 */
package com.ovt.alarm.dao;

import java.sql.Timestamp;

import com.ovt.alarm.dao.vo.UserToken;


/**
 * UserAccessTokenDao
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[DAO] 1.0
 */
public interface UserTokenDao
{

    /**
     * Get user by access token.
     * 
     * @param accessToken
     * @return
     */
    long getUserByToken(String accessToken);
    
    /**
     * create new accessToken.
     * 
     * @param accessToken
     * @return
     */
    String save(UserToken accessToken);

    /**
     * delete accessToken.
     * 
     * @param accessToken
     */
    void delete(String accessToken);

    /**
     * delete all access tokens of user.
     * 
     * @param userId
     */
    void deleteTokensByUser(long userId);
    
    public void deleteExpiredUserToken();
    
    public void updateTokenExpireTime(final String accessToken, Timestamp expireTime);
    
}
