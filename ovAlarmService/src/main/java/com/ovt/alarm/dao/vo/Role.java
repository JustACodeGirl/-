package com.ovt.alarm.dao.vo;

public class Role extends BaseEntity 
{
	private String roleName;
	private String roleDesc;
    public String getRoleName()
    {
        return roleName;
    }
    public void setRoleName(String roleName)
    {
        this.roleName = roleName;
    }
    public String getRoleDesc()
    {
        return roleDesc;
    }
    public void setRoleDesc(String roleDesc)
    {
        this.roleDesc = roleDesc;
    }
	
	


}
