/**
 * UserDao.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * 2016年6月30日
 */
package com.ovt.alarm.dao;

import java.util.List;

import com.ovt.alarm.dao.vo.User;

/**
 * UserDao
 * 
 * @Author hyson
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[DAO] 1.0
 */
public interface UserDao
{
    User getUserByCode(String userCode);
    
    long save(User user);
    
    void update(User user);

    void delete(long userId);
    
    List<User> getList(long index, int count,long roleId);
    
    long countRecords(long roleId);
    
    User getUserById(long userId);
    
    
    
}
