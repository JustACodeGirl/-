/**
 * JsonUtils.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 26, 2015
 */
package com.ovt.alarm.common.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ovt.alarm.common.exception.OVTErrorCode;
import com.ovt.alarm.common.exception.OVTException;
import com.ovt.alarm.common.log.Logger;
import com.ovt.alarm.common.log.LoggerFactory;

/**
 * JsonUtils
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class JsonUtils
{
    private static final ObjectMapper objectMapper = new ObjectMapper();
    
    static
    {
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    private static final Logger logger = LoggerFactory
            .getLogger(JsonUtils.class.getName());

    /**
     * Convert object to json.
     * 
     * @param object
     * @return
     * @throws OVTException
     */
    public static String toJson(Object object) throws OVTException
    {
        String json = "";

        if (object != null)
        {
            try
            {
                json = objectMapper.writeValueAsString(object);
            }
            catch (JsonProcessingException e)
            {
                final String errMsg = "Failed to convert object to json!";
                logger.error(errMsg, e);
                throw new OVTException(OVTErrorCode.JSON_CONVERT_ERROR, errMsg,
                        e);
            }
        }

        return json;
    }

    /**
     * Convert json to Object.
     * 
     * @param json
     * @param javaType
     * @return
     * @throws OVTException
     */
    public static <T> T fromJson(String json, Class<T> javaType)
            throws OVTException
    {
        T object = null;
        if (StringUtils.isNotBlank(json))
        {
            try
            {
                object = objectMapper.readValue(json, javaType);
            }
            catch (Exception e)
            {
                final String errMsg = "Failed to convert json to object!";
                logger.error(errMsg, e);
                throw new OVTException(OVTErrorCode.JSON_CONVERT_ERROR, errMsg,
                        e);
            }
        }

        return object;
    }
}
