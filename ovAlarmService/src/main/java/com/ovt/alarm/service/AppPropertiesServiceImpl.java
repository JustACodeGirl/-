package com.ovt.alarm.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ovt.alarm.common.exception.OVTRuntimeException;
import com.ovt.alarm.common.log.Logger;
import com.ovt.alarm.common.log.LoggerFactory;
import com.ovt.alarm.common.utils.CollectionUtils;
import com.ovt.alarm.common.utils.DataConvertUtils;
import com.ovt.alarm.dao.AppPropertiesDao;
import com.ovt.alarm.dao.vo.AppProperty;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.service.exception.ServiceErrorCode;
import com.ovt.alarm.service.exception.ServiceException;

@Service
public class AppPropertiesServiceImpl implements AppPropertiesService
{

    private Map<String, AppProperty> appPropertiesMap = new HashMap<String, AppProperty>();

    private Logger logger = LoggerFactory.getLogger(AppPropertiesService.class
            .getName());

    private final String COOKIE_ACCESS_AGE_STRING = "cookie.access_token.age";

    @Autowired
    private AppPropertiesDao appPropertiesDao;

    @PostConstruct
    private void init()
    {
        try
        {
            appPropertiesMap = appPropertiesDao.getAppPropertiesMap();
        }
        catch (OVTRuntimeException e)
        {
            logger.error("Failed to get app properties.", e);
        }
    }

    private boolean isKeyExist(String key)
    {
        if (appPropertiesMap.containsKey(key))
        {
            return true;
        }
        return false;
    }

    @Override
    public int getCookieAccessTokenAge()
    {
        AppProperty property = getAppPropertiesMap().get(
                COOKIE_ACCESS_AGE_STRING);
        return property == null ? 0 : DataConvertUtils.toInt(property
                .getPropValue());
    }

    @Override
    public Map<String, AppProperty> getAppPropertiesMap()
    {
        if (CollectionUtils.isEmpty(appPropertiesMap))
        {
            init();
        }
        return appPropertiesMap;
    }

    @Override
    public AppProperty addAppProperty(AppProperty appProperty)
            throws ServiceException
    {
        if (isKeyExist(appProperty.getPropName()))
        {
            throw new ServiceException(ServiceErrorCode.PROPERTY_NAME_EXIST,
                    "Property name has existed");
        }
        long id = appPropertiesDao.add(appProperty);
        appProperty.setId(id);
        appProperty.setUpdateTime(new Timestamp(new Date().getTime()));
        appPropertiesMap.put(appProperty.getPropName(), appProperty);
        return appProperty;
    }

    @Override
    public void deleteAppProperty(String key) throws ServiceException
    {
        appPropertiesDao.delete(key);
        appPropertiesMap.remove(key);
    }

    @Override
    public AppProperty updateAppProperty(AppProperty appProperty)
            throws ServiceException
    {
        appPropertiesDao.update(appProperty);
        appProperty.setUpdateTime(new Timestamp(new Date().getTime()));
        appPropertiesMap.put(appProperty.getPropName(), appProperty);

        return appProperty;
    }

    @Override
    public CommonList<AppProperty> listAppProperty() throws ServiceException
    {
        List<AppProperty> properties = new ArrayList<AppProperty>();
        CommonList<AppProperty> commonList = new CommonList<AppProperty>();
        properties.addAll(appPropertiesMap.values());

        commonList.setList(properties);
        commonList.setResultSize(properties.size());
        commonList.setTotalSize(properties.size());

        return commonList;
    }

    @Override
    public AppProperty getAppProperty(String key) throws ServiceException
    {
        return appPropertiesMap.get(key);
    }

}
