/**
 * Rec.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.dao.vo;

/**
 * Rec
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class Rec
{
    private long recId;
    private String taskNum;
    private String callerAccount; 
    private String callerName;
    private String callerPhone;
    private String callerAddress;
    private String callerDesc;
    private String state;
    private long nextRoleId;
    private String nextRoleName;
    private long createTime;
    public long getRecId()
    {
        return recId;
    }
    public void setRecId(long recId)
    {
        this.recId = recId;
    }
    public String getTaskNum()
    {
        return taskNum;
    }
    public void setTaskNum(String taskNum)
    {
        this.taskNum = taskNum;
    }
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
    public String getState()
    {
        return state;
    }
    public void setState(String state)
    {
        this.state = state;
    }
    public long getNextRoleId()
    {
        return nextRoleId;
    }
    public void setNextRoleId(long nextRoleId)
    {
        this.nextRoleId = nextRoleId;
    }
    public String getNextRoleName()
    {
        return nextRoleName;
    }
    public void setNextRoleName(String nextRoleName)
    {
        this.nextRoleName = nextRoleName;
    }
    public long getCreateTime()
    {
        return createTime;
    }
    public void setCreateTime(long createTime)
    {
        this.createTime = createTime;
    }
    
    
}
