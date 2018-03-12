/**
 * ServiceException.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 7, 2015
 */
package com.ovt.alarm.service.exception;

import com.ovt.alarm.common.exception.OVTException;

/**
 * ServiceException
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT Cloud Platform]/[Service] 1.0
 */
public class ServiceException extends OVTException
{
    private static final long serialVersionUID = -8991620565895380650L;

    public ServiceException()
    {
        super();
    }

    public ServiceException(String errCode, String message)
    {
        super(errCode, message);
    }

    public ServiceException(String errCode, Throwable cause)
    {
        super(errCode, cause);
    }

    public ServiceException(String errCode, String message, Throwable cause)
    {
        super(errCode, message, cause);
    }

}
