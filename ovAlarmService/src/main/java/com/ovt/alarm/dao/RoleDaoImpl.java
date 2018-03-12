package com.ovt.alarm.dao;

import java.text.MessageFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ovt.alarm.dao.mapper.RoleMapper;
import com.ovt.alarm.dao.vo.Role;

@Repository
public class RoleDaoImpl implements RoleDao
{

    @Autowired
    private DaoHelper daoHelper;

    @Autowired
    private RoleMapper roleMapper;

    private static final String SQL_INSERT_ROLE = "INSERT INTO t_role(role_name, role_desc) VALUES(?,?)";

    private static final String SQL_DELETE_ROLE = "update t_role SET is_delete=1 WHERE id=?";

    private static final String SQL_UPDATE_ROLE = "UPDATE t_role SET role_name=?, role_desc=? WHERE id=? and is_delete = 0 ";

    private static final String SQL_GET_ROLE_LIST = "SELECT id,role_name,role_desc FROM t_role "
            + " where is_delete=0 LIMIT ?,?";

    private static final String SQL_COUNT_RECORDS = "SELECT count(id) FROM t_role where is_delete=0";

    private static final String SQL_GET_ROLE_BY_USER_ID = " select a.id,role_name,role_desc from t_role a "
            + " left join t_user_role b on a.id=b.role_id where is_delete=0 and user_id=? LIMIT 1";

    private static final String SQL_GET_ROLE_BY_ROLE_ID = " select id,role_name,role_desc from t_role "
            + " where id=? and is_delete=0 ";

    public Role save(Role role)
    {
        String errMsg = MessageFormat.format("Failed to insert role: {0}",
                role.getRoleName());
        Object[] param = new Object[2];
        param[0] = role.getRoleName();
        param[1] = role.getRoleDesc();

        long id = daoHelper.save(SQL_INSERT_ROLE, errMsg, true, param);
        role.setId(id);
        return role;
    }

    public void delete(long roleId)
    {
        String errMsg = MessageFormat.format(
                "Failed delete role info with roleId: {0}", roleId);

        daoHelper.update(SQL_DELETE_ROLE, errMsg, roleId);
    }

    public void update(Role role)
    {
        String errMsg = MessageFormat.format("Failed update info of role: {0}",
                role.getRoleName());
        Object[] param = new Object[3];
        param[0] = role.getRoleName();
        param[1] = role.getRoleDesc();
        param[2] = role.getId();
        this.daoHelper.update(SQL_UPDATE_ROLE, errMsg, param);
    }

    public List<Role> getList(long index, int count)
    {
        String errMsg = MessageFormat.format(
                "Failed to get role list with index: {0} and size: {1}", index,
                count);
        List<Role> roles = daoHelper.queryForList(SQL_GET_ROLE_LIST,
                roleMapper, errMsg, index, count);

        return roles;
    }

    public long countRecords()
    {
        String errMsg = "Failed to get records count of table t_role";
        Long count = daoHelper.queryForObject(SQL_COUNT_RECORDS, Long.class,
                errMsg);
        if (count != null)
        {
            return count.longValue();
        }
        return 0;
    }

    public Role getRoleByUserId(long userId)
    {
        String errMsg = MessageFormat.format(
                "Failed query role by userId {0}!", userId);
        Role role = daoHelper.queryForObject(SQL_GET_ROLE_BY_USER_ID,
                roleMapper, errMsg, userId);

        return role;
    }

    public Role getRoleByRoleId(long roleId)
    {
        String errMsg = MessageFormat.format(
                "Failed query role by roleId {0}!", roleId);
        Role role = daoHelper.queryForObject(SQL_GET_ROLE_BY_ROLE_ID,
                roleMapper, errMsg, roleId);

        return role;
    }
}
