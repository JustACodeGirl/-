/**
 * LocalCacheManager.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 27, 2015
 */
package com.ovt.alarm.dao.cache;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.ovt.alarm.common.constant.LoggerConstants;
import com.ovt.alarm.common.log.Logger;
import com.ovt.alarm.common.log.LoggerFactory;

/**
 * LocalCacheManager
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[DAO] 1.0
 */
@Service
public class LocalCacheManager
{

    private Map<String, Cache> cacheMap =
            new ConcurrentHashMap<String, Cache>();
    
    protected Logger logger = LoggerFactory.getLogger(LoggerConstants.LOCAL_CACHE_LOGGER);

    @SuppressWarnings("unchecked")
    public <T extends Cache> T getCache(String cacheName)
    {
        return (T) cacheMap.get(cacheName);
    }

    public void registerCache(String name, Cache cache)
    {
        cacheMap.put(name, cache);
    }

}
