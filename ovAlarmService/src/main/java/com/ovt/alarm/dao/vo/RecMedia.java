/**
 * RecMedia.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.dao.vo;

/**
 * RecMedia
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class RecMedia
{
    private long mediaId;
    private long recId;
    private String mediaType; 
    private String mediaPath;
    private String screenshotPath;
    private long recordTime;
    public long getMediaId()
    {
        return mediaId;
    }
    public void setMediaId(long mediaId)
    {
        this.mediaId = mediaId;
    }
    public long getRecId()
    {
        return recId;
    }
    public void setRecId(long recId)
    {
        this.recId = recId;
    }
    public String getMediaType()
    {
        return mediaType;
    }
    public void setMediaType(String mediaType)
    {
        this.mediaType = mediaType;
    }
    public String getMediaPath()
    {
        return mediaPath;
    }
    public void setMediaPath(String mediaPath)
    {
        this.mediaPath = mediaPath;
    }
    public String getScreenshotPath()
    {
        return screenshotPath;
    }
    public void setScreenshotPath(String screenshotPath)
    {
        this.screenshotPath = screenshotPath;
    }
    public long getRecordTime()
    {
        return recordTime;
    }
    public void setRecordTime(long recordTime)
    {
        this.recordTime = recordTime;
    }
    
    
}
