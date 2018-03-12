/**
 * PostSaveHandler.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 29, 2015
 */
package com.ovt.alarm.dao.handler;

/**
 * PostSaveHandler
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public interface PostSaveHandler
{

    /**
     * handle with db auto generated id after save new entity into db.
     * 
     * @param entityId
     */
    void handle(Long entityId);
}
