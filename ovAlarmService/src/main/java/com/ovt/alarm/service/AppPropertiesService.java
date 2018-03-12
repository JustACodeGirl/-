package com.ovt.alarm.service;

import java.util.Map;

import com.ovt.alarm.dao.vo.AppProperty;
import com.ovt.alarm.dao.vo.CommonList;
import com.ovt.alarm.service.exception.ServiceException;

public interface AppPropertiesService
{
	public int getCookieAccessTokenAge();
	
	public Map<String,AppProperty> getAppPropertiesMap();
	
	public AppProperty addAppProperty(AppProperty appProperty) throws ServiceException;
	
	public void deleteAppProperty(String key) throws ServiceException;
	
	public AppProperty updateAppProperty(AppProperty appProperty) throws ServiceException;
	
	public CommonList<AppProperty> listAppProperty() throws ServiceException;
	
	public AppProperty getAppProperty(String key) throws ServiceException;
	
	
}
