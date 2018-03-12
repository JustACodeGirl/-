package com.ovt.alarm.dao;

import java.util.List;
import java.util.Map;

import com.ovt.alarm.dao.vo.AppProperty;

public interface AppPropertiesDao 
{
	public Map<String, AppProperty> getAppPropertiesMap();
	
	public List<AppProperty> getAppPropertiesList();
	
	public long add(AppProperty appProperty);
	
	public void delete(String key);
	
	public void update(AppProperty appProperty);
}
