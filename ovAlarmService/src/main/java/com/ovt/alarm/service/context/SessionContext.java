/**
 * SessionContext.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * 2016年6月30日
 */
package com.ovt.alarm.service.context;

import com.ovt.alarm.dao.vo.User;

/**
 * SessionContext
 * 
 * @Author hyson
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class SessionContext
{
    private static ThreadLocal<User> currentUser = new ThreadLocal<User>();
    
    /**
     * @param user the currentUser to set.
     */
    public static void setCurrentUser(User user)
    {
        currentUser.set(user);
    }
    
    /**
     * @return the currentUser.
     */
    public static User getCurrentUser()
    {
        return currentUser.get();
    }
    
    /**
     * remove current user to avoid memory leak.
     */
    public static void destroy()
    {
        currentUser.remove();
    }
}
