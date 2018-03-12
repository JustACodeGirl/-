package com.ovt.alarm.service;

import com.ovt.alarm.dao.vo.Role;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.service.exception.ServiceException;

public interface RoleService
{

    Role addRole(Role role) throws ServiceException;

    void deleteRole(long roleId) throws ServiceException;

    void editRole(Role role) throws ServiceException;

    CommonList<Role> queryRole(long index, int count) throws ServiceException;

    Role getRoleByUserId(long userId) throws ServiceException;

}
