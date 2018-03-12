/**
 * GlobalExceptionController.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * Jun 17, 2015
 */
package com.ovt.alarm.api.advisor;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ovt.alarm.api.response.OvAlarmResponse;
import com.ovt.alarm.common.constant.LoggerConstants;
import com.ovt.alarm.common.log.Logger;
import com.ovt.alarm.common.log.LoggerFactory;
import com.ovt.alarm.common.model.JsonDocument;
import com.ovt.alarm.service.exception.ServiceErrorCode;
import com.ovt.alarm.service.exception.ServiceException;

/**
 * GlobalExceptionController
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
@ControllerAdvice
public class GlobalControllerExceptionAdvisor
{
    private static final Logger LOGGER = LoggerFactory
            .getLogger(LoggerConstants.SYSTEM_LOGGER);

    @ExceptionHandler
    @ResponseBody
    public JsonDocument handleServiceException(ServiceException serviceException)
    {
        LOGGER.error("Controller catches service exception!", serviceException);
        return new OvAlarmResponse(serviceException.getErrorCode());
    }

    @ExceptionHandler
    @ResponseBody
    public JsonDocument handleRuntimeException(RuntimeException runtimeException)
    {
        LOGGER.error("Controller catches runtime exception!", runtimeException);
        return new OvAlarmResponse(ServiceErrorCode.SYSTEM_UNEXPECTED);
    }
}
