/**
 * RecDeal.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年5月2日
 */
package com.ovt.alarm.dao.vo;

/**
 * RecDeal
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class RecDeal
{
    private long recId;
    private String dealType; 
    private String dealOpinion;
    public long getRecId()
    {
        return recId;
    }
    public void setRecId(long recId)
    {
        this.recId = recId;
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
    
    
}
