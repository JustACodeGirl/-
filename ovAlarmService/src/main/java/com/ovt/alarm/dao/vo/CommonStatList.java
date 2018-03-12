/**
 * CommonStatList.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * 2016年8月15日
 */
package com.ovt.alarm.dao.vo;


/**
 * CommonStatList
 * @param <T>
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class CommonStatList<T> extends CommonList<T>
{
    private long sumCount = 0;

    public long getSumCount()
    {
        return sumCount;
    }

    public void setSumCount(long sumCount)
    {
        this.sumCount = sumCount;
    }
    
}
