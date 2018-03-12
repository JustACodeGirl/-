/**
 * UserRoleDao.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月19日
 */
package com.ovt.alarm.dao;

/**
 * UserRoleDao
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public interface UserRoleDao
{
    public void deleteByRoleId(long roleId) ;
    
    public void deleteByUserId(long userId) ;
    
    public void addUserRole(long userId,long roleId) ;
    
}
