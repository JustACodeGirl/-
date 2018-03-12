/**
 * RecAct.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.dao.vo;

/**
 * RecAct
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class RecAct
{
    private long actId;
    private long recId;
    private long userId; 
    private String userCode; 
    private String userName; 
    private long roleId;
    private String roleName;
    private String dealType;
    private String dealOpinion;
    private long createTime;
    public long getActId()
    {
        return actId;
    }
    public void setActId(long actId)
    {
        this.actId = actId;
    }
    public long getRecId()
    {
        return recId;
    }
    public void setRecId(long recId)
    {
        this.recId = recId;
    }
    public long getUserId()
    {
        return userId;
    }
    public void setUserId(long userId)
    {
        this.userId = userId;
    }
    public String getUserCode()
    {
        return userCode;
    }
    public void setUserCode(String userCode)
    {
        this.userCode = userCode;
    }
    public String getUserName()
    {
        return userName;
    }
    public void setUserName(String userName)
    {
        this.userName = userName;
    }
    public long getRoleId()
    {
        return roleId;
    }
    public void setRoleId(long roleId)
    {
        this.roleId = roleId;
    }
    public String getRoleName()
    {
        return roleName;
    }
    public void setRoleName(String roleName)
    {
        this.roleName = roleName;
    }
    public String getDealType()
    {
        return dealType;
    }
    public void setDealType(String dealType)
    {
        this.dealType = dealType;
    }
    public String getDealOpinion()
    {
        return dealOpinion;
    }
    public void setDealOpinion(String dealOpinion)
    {
        this.dealOpinion = dealOpinion;
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
