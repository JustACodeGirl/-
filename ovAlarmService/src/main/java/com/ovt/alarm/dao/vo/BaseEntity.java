/**
 * BaseEntity.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 14, 2015
 */
package com.ovt.alarm.dao.vo;

/**
 * BaseEntity
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class BaseEntity
{

    protected long id;
    
    public BaseEntity()
    {
        super();
    }

    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
        {
            return true;
        }
        if (obj == null)
        {
            return false;
        }

        if (!(obj instanceof BaseEntity))
        {
            return false;
        }
        BaseEntity other = (BaseEntity) obj;
        if (id != other.id)
        {
            return false;
        }
        return true;
    }

}