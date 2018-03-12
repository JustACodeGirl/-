package com.ovt.alarm.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ovt.alarm.api.response.OvAlarmResponse;
import com.ovt.alarm.common.model.JsonDocument;
import com.ovt.alarm.dao.vo.Role;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.service.RoleService;
import com.ovt.alarm.service.exception.ServiceException;

@Controller
@RequestMapping("/roles")
public class RoleController
{

    @Autowired
    private RoleService roleService;

    @RequestMapping(method = RequestMethod.POST, value = "/add")
    @ResponseBody
    public JsonDocument addRole(@RequestBody Role role) throws ServiceException
    {
        Role newRole = roleService.addRole(role);
        return new OvAlarmResponse(newRole);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/delete")
    @ResponseBody
    public JsonDocument deleteRole(@RequestParam long roleId)
            throws ServiceException
    {
        roleService.deleteRole(roleId);
        return OvAlarmResponse.SUCCESS;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/edit")
    @ResponseBody
    public JsonDocument editRole(@RequestBody Role role)
            throws ServiceException
    {
        roleService.editRole(role);
        return OvAlarmResponse.SUCCESS;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/query")
    @ResponseBody
    public JsonDocument listRole(@RequestParam(defaultValue = "0") long index,
            @RequestParam(defaultValue = "999999999") int count)
            throws ServiceException
    {
        CommonList<Role> roles = roleService.queryRole(index, count);
        return new OvAlarmResponse(roles);
    }

}
