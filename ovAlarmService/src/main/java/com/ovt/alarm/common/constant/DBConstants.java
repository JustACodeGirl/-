/**
 * DBConstants.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 5, 2015
 */
package com.ovt.alarm.common.constant;

/**
 * DBConstants
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class DBConstants
{

    public static final class TABLES
    {

        public static class BASE_ENTITY
        {
            public static final String ID = "id";
        }

        public static final class APP_PROPERTY extends BASE_ENTITY
        {
            public static final String PROP_NAME = "prop_name";
            public static final String PROP_VALUE = "prop_value";
            public static final String DESC = "desc";
            public static final String UPDATE_TIME = "update_time";
        }

        public static final class USER extends BASE_ENTITY
        {
            public static final String USER_CODE = "user_code";
            public static final String USER_NAME = "user_name";
            public static final String PASSWORD = "password";
            public static final String PHONE = "phone";
        }

        public static final class ROLE extends BASE_ENTITY
        {
            public static final String ROLE_NAME = "role_name";
            public static final String ROLE_DESC = "role_desc";
        }

        public static final class USER_TOKEN extends BASE_ENTITY
        {
            public static final String USER_ID = "user_id";
            public static final String USER_TOKEN = "user_token";
            public static final String EXPIRE_TIME = "expire_time";
            public static final String CREATE_TIME = "create_time";
        }
        
        public static final class REC
        {
            public static final String REC_ID = "rec_id";
            public static final String TASK_NUM = "task_num";
            public static final String CALLER_ACCOUNT= "caller_account";
            public static final String CALLER_NAME = "caller_name";
            public static final String CALLER_PHONE = "caller_phone";
            public static final String CALLER_ADDRESS = "caller_address";
            public static final String CALLER_DESC = "caller_desc";
            public static final String STATE = "state";
            public static final String CREATE_TIME = "create_time";
        }
        
        public static final class REC_ACT
        {
            public static final String ACT_ID = "act_id";
            public static final String REC_ID = "rec_id";
            public static final String USER_ID = "user_id";
            public static final String USER_NAME= "user_name";
            public static final String USER_CODE = "user_code";
            public static final String ROLE_ID = "role_id";
            public static final String ROLE_NAME = "role_name";
            public static final String DEAL_TYPE = "deal_type";
            public static final String DEAL_OPINION = "deal_opinion";
            public static final String CREATE_TIME = "create_time";
        }
        
        public static final class REC_MEDIA
        {
            public static final String MEDIA_ID = "media_id";
            public static final String REC_ID = "rec_id";
            public static final String MEDIA_TYPE = "media_type";
            public static final String MEDIA_PATH= "media_path";
            public static final String SCREENSHOT_PATH = "screenshot_path";
            public static final String RECORD_TIME = "record_time";
        }
        

    }

}
