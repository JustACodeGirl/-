/**
 * LRUMap.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 27, 2015
 */
package com.ovt.alarm.common.model;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Map implements LRU algorithem.
 * 
 * @Author hyson
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class LRUMap<K,V> extends LinkedHashMap<K,V>
{
    private static final long serialVersionUID = -476891692250335886L;
    
    private final int maxEntries;
    
    public LRUMap(int initialEntries, int maxEntries)
    {
        super(initialEntries, 0.8f, true);
        this.maxEntries = maxEntries;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K,V> eldest)
    {
        return size() > maxEntries;
    }

    public int getMaxEntries()
    {
        return maxEntries;
    }

}
