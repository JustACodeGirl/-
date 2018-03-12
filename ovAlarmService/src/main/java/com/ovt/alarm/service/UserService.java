/**
 * UserService.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 5, 2015
 */
package com.ovt.alarm.service;

import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.dao.vo.User;
import com.ovt.alarm.service.exception.ServiceException;

/**
 * 
 * @author jinzhong.zheng
 *
 */

public interface UserService
{
    String userLogin(String userCode, String password) throws ServiceException;

    void logout(String accessToken) throws ServiceException;

    User addUser(User user) throws ServiceException;

    User editUser(User user, String newPassword) throws ServiceException;

    void deleteUser(long id) throws ServiceException;

    CommonList<User> getUserList(long index, int count, long roleId)
            throws ServiceException;

    User getUserByAccessToken(String accessToken) throws ServiceException;

    void cleanExpiredUserToken() throws ServiceException;

}
