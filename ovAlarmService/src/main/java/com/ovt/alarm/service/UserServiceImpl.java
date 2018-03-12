/**
 * UserServiceImpl.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 5, 2015
 */
package com.ovt.alarm.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ovt.alarm.common.utils.DateTimeUtils;
import com.ovt.alarm.common.utils.EncryptionUtils;
import com.ovt.alarm.common.utils.StringUtils;
import com.ovt.alarm.dao.RecDao;
import com.ovt.alarm.dao.RoleDao;
import com.ovt.alarm.dao.UserDao;
import com.ovt.alarm.dao.UserRoleDao;
import com.ovt.alarm.dao.UserTokenDao;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.dao.vo.Role;
import com.ovt.alarm.dao.vo.User;
import com.ovt.alarm.dao.vo.UserToken;
import com.ovt.alarm.service.context.SessionContext;
import com.ovt.alarm.service.exception.ServiceErrorCode;
import com.ovt.alarm.service.exception.ServiceException;

/**
 * UserServiceImpl
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[API] 1.0
 */
@Service
public class UserServiceImpl implements UserService
{

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private UserRoleDao userRoleDao;

    @Autowired
    private UserTokenDao userTokenDao;

    @Autowired
    private RecDao recDao;

    @Autowired
    private AppPropertiesService appProperties;

    private boolean isUserCodeExist(String userCode)
    {
        User user = this.userDao.getUserByCode(userCode);
        if (user != null && user.getId() != 0)
        {
            return true;
        }
        return false;
    }

    public String userLogin(String userCode, String password)
            throws ServiceException
    {
        User user = null;

        user = userDao.getUserByCode(userCode);
        if (user == null)
        {
            throw new ServiceException(ServiceErrorCode.USER_NOT_EXIST,
                    "User is not exist");
        }
        if (!StringUtils.equals(EncryptionUtils.encrypt(password),
                user.getPassword()))
        {
            throw new ServiceException(
                    ServiceErrorCode.WRONG_PASSWORD_USERCODE,
                    "User code or password is wrong");
        }
        Role role = roleDao.getRoleByUserId(user.getId());
        if (role != null)
        {
            user.setRoleId(role.getId());
            user.setRoleName(role.getRoleName());
        }
        else
        {
            user.setRoleId(0);
            user.setRoleName("");
        }
        SessionContext.setCurrentUser(user);

        String accessToken = generateUserToken(user.getId());

        return accessToken;
    }

    public void logout(String accessToken) throws ServiceException
    {
        if (!StringUtils.isBlank(accessToken))
        {
            userTokenDao.delete(accessToken);
        }
    }

    public User addUser(User user) throws ServiceException
    {
        if (StringUtils.isBlank(user.getUserCode())
                || StringUtils.isBlank(user.getUserName()))
        {
            throw new ServiceException(ServiceErrorCode.USER_CODE_OR_NAME_NULL,
                    "User code or name is null");
        }
        if (this.isUserCodeExist(user.getUserCode()))
        {
            throw new ServiceException(ServiceErrorCode.USER_CODE_EXIST,
                    "User code has existed");
        }
        long id = userDao.save(user);
        user.setId(id);
        return user;
    }

    public User editUser(User user, String newPassword) throws ServiceException
    {
        User currentUser = SessionContext.getCurrentUser();
        if (StringUtils.isBlank(user.getUserCode())
                || StringUtils.isBlank(user.getUserName()))
        {
            throw new ServiceException(ServiceErrorCode.USER_CODE_OR_NAME_NULL,
                    "User code or name is null");
        }
        if (!(user.getUserCode().equals(currentUser.getUserCode()))
                && this.isUserCodeExist(user.getUserCode()))
        {
            throw new ServiceException(ServiceErrorCode.USER_CODE_EXIST,
                    "User code has existed");
        }

        if (StringUtils.isNotBlank(user.getPassword()))
        {
            if (!currentUser.getPassword().equals(
                    EncryptionUtils.encrypt(user.getPassword())))
            {
                throw new ServiceException(ServiceErrorCode.OLD_PASSWORD_WRONG,
                        "The old password is wrong");
            }
            if (StringUtils.isBlank(newPassword))
            {
                throw new ServiceException(ServiceErrorCode.PASSWORD_NULL,
                        "The new password can not be null");
            }
            user.setPassword(EncryptionUtils.encrypt(newPassword));
        }
        else
        {
            user.setPassword(currentUser.getPassword());
        }

        user.setId(currentUser.getId());
        
        // change user role
        if (currentUser.getRoleId() != user.getRoleId())
        {
            if (user.getRoleId() > 0)
            {
                Role role = roleDao.getRoleByRoleId(user.getRoleId());
                if (role == null)
                {
                    throw new ServiceException(ServiceErrorCode.ROLE_NOT_EXIST,
                            "Role is not exist");
                }
                user.setRoleName(role.getRoleName());
            }
            if (recDao.countUnfinishedRecords(currentUser.getRoleId()) > 0)// 有处理中案件
            {
                throw new ServiceException(
                        ServiceErrorCode.ROLE_HAS_UNFINISHED_RECS,
                        "Role has unfinished recs");
            }
            userRoleDao.deleteByUserId(currentUser.getId());
            if (user.getRoleId() > 0)
            {
                userRoleDao.addUserRole(currentUser.getId(), user.getRoleId());
            }
        }else{
            user.setRoleName(currentUser.getRoleName()); 
        }
        
        // change user info
        userDao.update(user);
        return user;
    }

    public void deleteUser(long userId) throws ServiceException
    {
        Role role = roleDao.getRoleByUserId(userId);
        if (role != null && recDao.countUnfinishedRecords(role.getId()) > 0)// 有处理中案件
        {
            throw new ServiceException(
                    ServiceErrorCode.ROLE_HAS_UNFINISHED_RECS,
                    "Role has unfinished recs");
        }
        userDao.delete(userId);
        userRoleDao.deleteByUserId(userId);
    }

    public CommonList<User> getUserList(long index, int count, long roleId)
            throws ServiceException
    {

        CommonList<User> commonList = new CommonList<User>();
        List<User> userList = userDao.getList(index, count, roleId);
        if (userList == null)
        {
            return commonList;
        }
        commonList.setList(userList);
        commonList.setResultSize(userList.size());
        commonList.setTotalSize(userDao.countRecords(roleId));
        return commonList;

    }

    public User getUserByAccessToken(String accessToken)
            throws ServiceException
    {
        if (StringUtils.isBlank(accessToken))
        {
            return null;
        }
        long userId = userTokenDao.getUserByToken(accessToken);
        if (userId == 0)
        {
            throw new ServiceException(ServiceErrorCode.INVALID_ACCESS_TOKEN,
                    "Invalid access token!!");
        }
        User user = userDao.getUserById(userId);
        Role role = roleDao.getRoleByUserId(user.getId());
        if (role != null)
        {
            user.setRoleId(role.getId());
            user.setRoleName(role.getRoleName());
        }
        else
        {
            user.setRoleId(0);
            user.setRoleName("");
        }
        return user;
    }

    private String generateUserToken(long userId)
    {
        UserToken userToken = new UserToken();
        userToken.setUserId(userId);
        userToken.setToken(EncryptionUtils.generateUUID());
        userToken.setExpireTime(new Timestamp(DateTimeUtils.addSeconds(
                new java.util.Date(), appProperties.getCookieAccessTokenAge())
                .getTime()));

        userTokenDao.save(userToken);
        return userToken.getToken();
    }

    public void cleanExpiredUserToken() throws ServiceException
    {
        userTokenDao.deleteExpiredUserToken();
    }

}
