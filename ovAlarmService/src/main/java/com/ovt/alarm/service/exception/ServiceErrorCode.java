/**
 * PlatformErrorCode.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 5, 2015
 */
package com.ovt.alarm.service.exception;

/**
 * PlatformErrorCode
 * 
 * @Author hyson
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class ServiceErrorCode
{
    //role
    public static final String ROLE_HAS_UNFINISHED_RECS = "RoleHasUnfinishedRecs";//用户有未完成的案件
    public static final String ROLE_NOT_EXIST = "RoleIsNotExist";//岗位不存在
    
    //user
    public static final String USER_CODE_OR_NAME_NULL = "UserCodeOrNameIsNull";//用户编码或用户名为空
    public static final String USER_CODE_EXIST = "UserCodeHasExisted";//用户编码已存在
    public static final String OLD_PASSWORD_WRONG = "OldPasswordIsWrong";//原始密码错误
    public static final String PASSWORD_NULL = "PasswordCanNotBeNull";//密码不能为空
    public static final String NOT_LOGIN = "NotLogin";//未登录
    public static final String INVALID_ACCESS_TOKEN = "InvalidAccessToken";//登录无效
    public static final String WRONG_PASSWORD_USERCODE = "UserCodeOrPasswordWrong";//用户编码或密码错误
    public static final String USER_NOT_EXIST = "UserIsNotExist";//用户不存在
    public static final String USER_HAS_NOT_SETTED_ROLE = "UserHasNotSettedRole";//用户尚未设置岗位
    
    //system
    public static final String SYSTEM_UNEXPECTED = "SystemUnexpected";//系统未知错误
    
    //app properties
    public static final String PROPERTY_NAME_EXIST = "PropertyNameExist";
    
    //rec
    public static final String OPERATION_IS_ILLEGAL = "OperationIsIllegal";//操作不允许
    public static final String CALLER_ACCOUNT_NULL = "CallerAccountCanNotBeNull";//报警账号不能为空
    
}
