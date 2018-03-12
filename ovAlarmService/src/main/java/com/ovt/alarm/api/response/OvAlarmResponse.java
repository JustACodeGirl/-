package com.ovt.alarm.api.response;

import com.ovt.alarm.common.model.JsonDocument;

public class OvAlarmResponse extends JsonDocument
{
    public static final JsonDocument SUCCESS = new OvAlarmResponse();

    private static final String SERVICE_OVALARM = "OvAlarm";

    public OvAlarmResponse()
    {
        super(SERVICE_OVALARM, JsonDocument.STATE_SUCCESS);
    }

    public OvAlarmResponse(Object data)
    {
        super(SERVICE_OVALARM, data);
    }

    public OvAlarmResponse(String errCode)
    {
        super(SERVICE_OVALARM, errCode);
    }

}
