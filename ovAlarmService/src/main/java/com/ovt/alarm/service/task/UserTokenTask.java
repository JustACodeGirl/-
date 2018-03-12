/**
 * MemberProfileTask.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * Jan 7, 2016
 */
package com.ovt.alarm.service.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.ovt.alarm.common.log.Logger;
import com.ovt.alarm.common.log.LoggerFactory;
import com.ovt.alarm.dao.UserTokenDao;

/**
 * UserTokenTask
 * 
 * @Author Jinzhong.zheng
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class UserTokenTask
{
    @Autowired
    private UserTokenDao userTokenDao;
    
    private Logger logger = LoggerFactory.getLogger(UserTokenTask.class.getName());

    /**
     * 01:30 every day
     */
    @Scheduled(cron = "0 30 1 * * ?")
    public void cleanExpireUserToken()
    {
        logger.info("Check expire user token task start!");
        
        try
        {
        	userTokenDao.deleteExpiredUserToken();
        }
        catch (Exception e)
        {
            logger.error("Clean expired user token failed", e);
        }
        
        logger.info("Check expire user token task complete!");
    }
}
