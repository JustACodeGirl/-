/**
 * RecService.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.service;

import java.util.List;

import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.dao.vo.Rec;
import com.ovt.alarm.dao.vo.RecAct;
import com.ovt.alarm.dao.vo.RecMedia;
import com.ovt.alarm.dao.vo.RecReport;
import com.ovt.alarm.service.exception.ServiceException;

/**
 * RecService
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public interface RecService
{
    CommonList<Rec> getRecListByBox(long index, int count, String boxType)
            throws ServiceException;

    CommonList<Rec> getRecListByCondition(long index, int count,
            long startTime, long endTime, String state, String keyword)
            throws ServiceException;

    CommonList<Rec> getRecListByCallerAccount(String callerAccount)
            throws ServiceException;

    List<RecMedia> getRecMediaList(long recId) throws ServiceException;

    List<RecAct> getRecActList(long recId) throws ServiceException;

    void dealRec(long recId, String dealType, String dealOpinion)
            throws ServiceException;

    void reportRec(RecReport report) throws ServiceException;

}
