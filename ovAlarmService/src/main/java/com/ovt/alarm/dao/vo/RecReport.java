/**
 * RecReport.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月27日
 */
package com.ovt.alarm.dao.vo;

import java.util.List;

/**
 * RecReport
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class RecReport
{
    private String callerAccount; 
    private String callerName;
    private String callerPhone;
    private String callerAddress;
    private String callerDesc;
    private List<RecMedia> medias;
    public String getCallerAccount()
    {
        return callerAccount;
    }
    public void setCallerAccount(String callerAccount)
    {
        this.callerAccount = callerAccount;
    }
    public String getCallerName()
    {
        return callerName;
    }
    public void setCallerName(String callerName)
    {
        this.callerName = callerName;
    }
    public String getCallerPhone()
    {
        return callerPhone;
    }
    public void setCallerPhone(String callerPhone)
    {
        this.callerPhone = callerPhone;
    }
    public String getCallerAddress()
    {
        return callerAddress;
    }
    public void setCallerAddress(String callerAddress)
    {
        this.callerAddress = callerAddress;
    }
    public String getCallerDesc()
    {
        return callerDesc;
    }
    public void setCallerDesc(String callerDesc)
    {
        this.callerDesc = callerDesc;
    }
    public List<RecMedia> getMedias()
    {
        return medias;
    }
    public void setMedias(List<RecMedia> medias)
    {
        this.medias = medias;
    }
    
    
}
