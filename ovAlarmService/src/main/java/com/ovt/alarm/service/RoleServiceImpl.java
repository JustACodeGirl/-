package com.ovt.alarm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ovt.alarm.dao.RecDao;
import com.ovt.alarm.dao.RoleDao;
import com.ovt.alarm.dao.UserDao;
import com.ovt.alarm.dao.UserRoleDao;
import com.ovt.alarm.dao.vo.Role;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.service.exception.ServiceErrorCode;
import com.ovt.alarm.service.exception.ServiceException;

@Service
public class RoleServiceImpl implements RoleService
{
    @Autowired
    private RoleDao roleDao;

    @Autowired
    private UserRoleDao userRoleDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RecDao recDao;

    public Role addRole(Role role) throws ServiceException
    {
        Role newRole = roleDao.save(role);
        return newRole;
    }

    public void deleteRole(long roleId) throws ServiceException
    {
        if (recDao.countUnfinishedRecords(roleId) > 0)//有处理中案件
        {
            throw new ServiceException(
                    ServiceErrorCode.ROLE_HAS_UNFINISHED_RECS,
                    "Role has unfinished recs");
        }
        roleDao.delete(roleId);
        userRoleDao.deleteByRoleId(roleId);
    }

    public void editRole(Role role) throws ServiceException
    {
        roleDao.update(role);
    }

    public CommonList<Role> queryRole(long index, int count)
            throws ServiceException
    {
        CommonList<Role> commonList = new CommonList<Role>();
        List<Role> roles = roleDao.getList(index, count);
        if (roles == null)
        {
            return commonList;
        }
        commonList.setList(roles);
        commonList.setResultSize(roles.size());
        commonList.setTotalSize(roleDao.countRecords());
        return commonList;
    }

    public Role getRoleByUserId(long userId) throws ServiceException
    {
        return roleDao.getRoleByUserId(userId);
    }

}
