/**
 * DBException.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 5, 2015
 */
package com.ovt.alarm.dao.exception;

/**
 * DBException
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class DBException extends DaoException
{

    private static final long serialVersionUID = -924791405006278562L;

    public DBException()
    {
        super();
    }

    public DBException(String errCode, String message)
    {
        super(errCode, message);
    }

    public DBException(String errCode, String message, Throwable cause)
    {
        super(errCode, message, cause);
    }

    public DBException(String errCode, Throwable cause)
    {
        super(errCode, cause);
    }

}
