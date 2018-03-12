/**
 * UsersController.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * 2016年6月30日
 */
package com.ovt.alarm.api.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ovt.alarm.api.response.OvAlarmResponse;
import com.ovt.alarm.common.model.JsonDocument;
import com.ovt.alarm.common.utils.CookieUtil;
import com.ovt.alarm.common.utils.HttpUtils;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.dao.vo.User;
import com.ovt.alarm.service.AppPropertiesService;
import com.ovt.alarm.service.UserService;
import com.ovt.alarm.service.context.SessionContext;
import com.ovt.alarm.service.exception.ServiceException;

/**
 * UsersController provides restful APIs of user
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */

@Controller
@RequestMapping("/users")
public class UserController
{
    @Autowired
    private UserService userService;

    @Autowired
    private AppPropertiesService appProperties;

    private static final JsonDocument SUCCESS = OvAlarmResponse.SUCCESS;

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    @ResponseBody
    public JsonDocument login(HttpServletResponse response,
            @RequestParam String userCode, @RequestParam String password)
            throws ServiceException
    {
        String accessToken = userService.userLogin(userCode, password);
        CookieUtil.addCookie(response, CookieUtil.KEY_ACCESS_TOKEN,
                accessToken, appProperties.getCookieAccessTokenAge());
        User currentUser = SessionContext.getCurrentUser();
        currentUser.setPassword("");
        return new OvAlarmResponse(currentUser);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/logout")
    @ResponseBody
    public JsonDocument logout(HttpServletRequest request,
            HttpServletResponse response) throws ServiceException
    {
        String accessToken = HttpUtils.getParamValue(request,
                CookieUtil.KEY_ACCESS_TOKEN);
        userService.logout(accessToken);

        CookieUtil.addCookie(response, CookieUtil.KEY_ACCESS_TOKEN,
                accessToken, 0);

        return SUCCESS;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/add")
    @ResponseBody
    public JsonDocument addUser(@RequestBody User user)
            throws ServiceException
    {
        User newUser = userService.addUser(user);
        newUser.setPassword("");
        return new OvAlarmResponse(newUser);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/info")
    @ResponseBody
    public JsonDocument getCurrentUser() throws ServiceException
    {
        User currentUser = SessionContext.getCurrentUser();
        currentUser.setPassword("");
        return new OvAlarmResponse(currentUser);
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/edit")
    @ResponseBody
    public JsonDocument editAdmin(@RequestBody User user,
            @RequestParam(required = false, defaultValue = "") String newPassword)
            throws ServiceException
    {
        userService.editUser(user, newPassword);
        user.setPassword("");
        return new OvAlarmResponse(user);
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/delete")
    @ResponseBody
    public JsonDocument deleteUser(@RequestParam long userId)
            throws ServiceException
    {
        userService.deleteUser(userId);
        return SUCCESS;
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/query")
    @ResponseBody
    public JsonDocument getUserList(@RequestParam(defaultValue = "0") long index,
            @RequestParam(defaultValue = "20") int count,
            @RequestParam(defaultValue = "0") long roleId) throws ServiceException
    {
        CommonList<User> users = userService.getUserList(index, count, roleId);
        return new OvAlarmResponse(users);
    }


}
