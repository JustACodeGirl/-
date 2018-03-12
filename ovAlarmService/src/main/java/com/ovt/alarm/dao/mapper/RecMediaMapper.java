/**
 * RecMediaMapper.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.ovt.alarm.common.constant.DBConstants.TABLES;
import com.ovt.alarm.dao.vo.RecMedia;

/**
 * RecMediaMapper
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class RecMediaMapper implements RowMapper<RecMedia>
{
    public RecMedia mapRow(ResultSet rs, int rowNum) throws SQLException
    {
        RecMedia media = new RecMedia();
        media.setMediaId(rs.getLong(TABLES.REC_MEDIA.MEDIA_ID));
        media.setRecId(rs.getLong(TABLES.REC_MEDIA.REC_ID));
        media.setMediaType(rs.getString(TABLES.REC_MEDIA.MEDIA_TYPE));
        media.setMediaPath(rs.getString(TABLES.REC_MEDIA.MEDIA_PATH));
        media.setScreenshotPath(rs.getString(TABLES.REC_MEDIA.SCREENSHOT_PATH));
        media.setRecordTime(rs.getLong(TABLES.REC_MEDIA.RECORD_TIME));
        return media;
    }

}
