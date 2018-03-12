package com.ovt.alarm.dao;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ovt.alarm.common.utils.CollectionUtils;
import com.ovt.alarm.dao.mapper.AppPropertyMapper;
import com.ovt.alarm.dao.vo.AppProperty;

@Repository
public class AppPropertiesDaoImpl implements AppPropertiesDao {

	@Autowired
	private DaoHelper daoHelper;
	
	@Autowired
	private AppPropertyMapper appPropertyMapper;
	
	private static final String SQL_GET_APP_PROPERTIES = "SELECT id, prop_name, prop_value, `desc`, "
            + " update_time FROM app_properties";
	
	private static final String SQL_INSERT_APP_PROPERTY = 
			"INSERT INTO app_properties(prop_name, prop_value, `desc`) VALUES(?,?,?,?)";
	
	private static final String SQL_DELETE_APP_PROPERTY = "DELETE FROM app_properties WHERE prop_name=?";
	
	private static final String SQL_UPDATE_APP_PROPERTY = "UPDATE app_properties SET prop_name=?, "
			+ "prop_value=?, `desc`=?, update_time=CURRENT_TIMESTAMP WHERE id=?";
	
	@Override
	public Map<String, AppProperty> getAppPropertiesMap() 
	{
		Map<String, AppProperty> appPropertiesMap = new HashMap<String, AppProperty>();

        List<AppProperty> appProperties = this.getAppPropertiesList();
        if (CollectionUtils.isNotEmpty(appProperties))
        {
            for (AppProperty appProperty : appProperties)
            {
                appPropertiesMap.put(appProperty.getPropName(), appProperty);
            }
        }

        return appPropertiesMap;
	}

	@Override
	public List<AppProperty> getAppPropertiesList() 
	{
		String errMsg = "Failed to get app properties from database";

        List<AppProperty> appProperties = daoHelper.queryForList(SQL_GET_APP_PROPERTIES,
                appPropertyMapper, errMsg);
        
        return appProperties;
	}

	@Override
	public long add(AppProperty appProperty) 
	{
		String errMsg = MessageFormat.format(
				"Failed to insert app propertied for key: [{0}]", appProperty.getPropName());
		
		Object[] param = new Object[3];
		param[0] = appProperty.getPropName();
		param[1] = appProperty.getPropValue();
		param[2] = appProperty.getDesc();
		
		long id = daoHelper.save(SQL_INSERT_APP_PROPERTY, errMsg, true, param);
		
		return id;
	}

	@Override
	public void delete(String key) 
	{
		String errMsg = MessageFormat.format(
				"Failed to delete app propertied with key: [{0}]", key);
		
		daoHelper.update(SQL_DELETE_APP_PROPERTY, errMsg, key);
	}

	@Override
	public void update(AppProperty appProperty) 
	{
		String errMsg = MessageFormat.format(
				"Failed to update app propertied for key: [{0}]", appProperty.getPropName());
		
		Object[] param = new Object[4];
		param[0] = appProperty.getPropName();
		param[1] = appProperty.getPropValue();
		param[2] = appProperty.getDesc();
		param[3] = appProperty.getId();
		
		daoHelper.update(SQL_UPDATE_APP_PROPERTY, errMsg, param);
		
	}

}
