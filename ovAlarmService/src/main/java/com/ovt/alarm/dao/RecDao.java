/**
 * RecDao.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.dao;

import java.util.List;

import com.ovt.alarm.dao.vo.Rec;
import com.ovt.alarm.dao.vo.RecAct;
import com.ovt.alarm.dao.vo.RecMedia;

/**
 * RecDao
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public interface RecDao
{
    List<Rec> getRecListByBox(long index, int count, String boxType, long roleId);

    List<Rec> getRecListByCondition(long index, int count, long startTime,
            long endTime, String state, String keyword);

    List<Rec> getRecListByCallerAccount(String callerAccount);

    List<RecMedia> getRecMediaList(long recId);

    List<RecAct> getRecActList(long recId);

    long saveRecAct(RecAct act);

    void updateRec(Rec rec);

    long countBoxRecords(String boxType, long roleId);

    long countConditionRecords(long startTime, long endTime, String state,
            String keyword);

    long countUnfinishedRecords(long roleId);

    long saveRec(Rec rec);

    void batchSaveRecMedia(long recId, List<RecMedia> medias);

    String getMaxTaskNum(long startTime, long endTime);

}
