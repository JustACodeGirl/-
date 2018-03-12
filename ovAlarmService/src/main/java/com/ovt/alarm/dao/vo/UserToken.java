/**
 * AccessToken.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 6, 2015
 */
package com.ovt.alarm.dao.vo;

import java.sql.Timestamp;


/**
 * AccessToken
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class UserToken extends BaseEntity
{

    private long userId;
    
    private String token;
    
    private Timestamp expireTime;
    
    private Timestamp createTime;
    
    public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public long getUserId()
    {
        return userId;
    }

    public void setUserId(long userId)
    {
        this.userId = userId;
    }

    public String getToken()
    {
        return token;
    }

    public void setToken(String token)
    {
        this.token = token;
    }

    public Timestamp getExpireTime()
    {
        return expireTime;
    }

    public void setExpireTime(Timestamp expireTime)
    {
        this.expireTime = expireTime;
    }

    @Override
    public String toString()
    {
        StringBuilder builder = new StringBuilder();
        builder.append("AccessToken [userId=").append(userId)
                .append(", token=").append(token).append(", clientType=")
                .append(", expireTime=").append(expireTime)
                .append(", id=").append(id).append(", createTime=")
                .append(createTime).append("]");
        return builder.toString();
    }

    
}
