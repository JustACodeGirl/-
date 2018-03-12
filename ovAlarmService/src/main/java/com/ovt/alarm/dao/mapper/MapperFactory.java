/**
 * MapperFactory.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * May 11, 2015
 */
package com.ovt.alarm.dao.mapper;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;


/**
 * MapperFactory
 * 
 * @Author hyson
 * @Version 1.0
 * @See
 * @Since [OVT OVALARM]/[DAO] 1.0
 */
@Service
public class MapperFactory
{
    @Bean
    public UserMapper createUserMapper()
    {
        return new UserMapper();
    }
   
    @Bean
    public RoleMapper createRoleMapper()
    {
        return new RoleMapper();
    }
	
    @Bean
    public AppPropertyMapper createAppPropertyMapper()
    {
        return new AppPropertyMapper();
    }
    
    @Bean
    public RecMapper createRecMapper()
    {
        return new RecMapper();
    }
    
    @Bean
    public RecActMapper createRecActMapper()
    {
        return new RecActMapper();
    }
    
    @Bean
    public RecMediaMapper createRecMediaMapper()
    {
        return new RecMediaMapper();
    }
}
