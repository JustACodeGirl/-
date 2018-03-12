/**
 * RecController.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年4月25日
 */
package com.ovt.alarm.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ovt.alarm.api.response.OvAlarmResponse;
import com.ovt.alarm.common.model.JsonDocument;
import com.ovt.alarm.common.utils.DateTimeUtils;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.dao.vo.Rec;
import com.ovt.alarm.dao.vo.RecAct;
import com.ovt.alarm.dao.vo.RecDeal;
import com.ovt.alarm.dao.vo.RecMedia;
import com.ovt.alarm.dao.vo.RecReport;
import com.ovt.alarm.service.RecService;
import com.ovt.alarm.service.exception.ServiceException;

/**
 * RecController
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
@Controller
@RequestMapping("/recs")
public class RecController
{

    @Autowired
    private RecService recService;

    @RequestMapping(method = RequestMethod.GET, value = "/box")
    @ResponseBody
    public JsonDocument getRecsByBox(
            @RequestParam(defaultValue = "0") long index,
            @RequestParam(defaultValue = "20") int count,
            @RequestParam String boxType) throws ServiceException
    {
        CommonList<Rec> recs = recService
                .getRecListByBox(index, count, boxType);
        return new OvAlarmResponse(recs);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/query")
    @ResponseBody
    public JsonDocument getRecsByCondition(@RequestParam long index,
            @RequestParam int count,
            @RequestParam(required = false, defaultValue = "0") long startTime,
            @RequestParam(required = false, defaultValue = "0") long endTime,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String keyword)
            throws ServiceException
    {
        endTime = (endTime == 0 ? DateTimeUtils.getCurrentTimestamp().getTime()
                : endTime);
        CommonList<Rec> recs = recService.getRecListByCondition(index, count,
                startTime, endTime, state, keyword);
        return new OvAlarmResponse(recs);

    }

    @RequestMapping(method = RequestMethod.GET, value = "/my")
    @ResponseBody
    public JsonDocument getRecsByCallerAccount(
            @RequestParam String callerAccount) throws ServiceException
    {
        CommonList<Rec> recs = recService
                .getRecListByCallerAccount(callerAccount);
        return new OvAlarmResponse(recs);

    }

    @RequestMapping(method = RequestMethod.GET, value = "/medias")
    @ResponseBody
    public JsonDocument getRecMedias(@RequestParam long recId)
            throws ServiceException
    {
        List<RecMedia> medias = recService.getRecMediaList(recId);
        return new OvAlarmResponse(medias);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/acts")
    @ResponseBody
    public JsonDocument getRecActs(@RequestParam long recId)
            throws ServiceException
    {
        List<RecAct> acts = recService.getRecActList(recId);
        return new OvAlarmResponse(acts);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/deal")
    @ResponseBody
    public JsonDocument dealRec(@RequestBody RecDeal deal)
            throws ServiceException
    {
        recService.dealRec(deal.getRecId(), deal.getDealType(),
                deal.getDealOpinion());
        return OvAlarmResponse.SUCCESS;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/report")
    @ResponseBody
    public JsonDocument reportRec(@RequestBody RecReport report)
            throws ServiceException
    {
        recService.reportRec(report);
        return OvAlarmResponse.SUCCESS;
    }

}
