package com.ovt.alarm.dao;

import java.util.List;

import com.ovt.alarm.dao.vo.Role;

public interface RoleDao
{

    public Role save(Role role);

    public void delete(long roleId);

    public void update(Role role);

    public List<Role> getList(long index, int count);

    public long countRecords();

    public Role getRoleByUserId(long userId);
    
    public Role getRoleByRoleId(long roleId);
}
