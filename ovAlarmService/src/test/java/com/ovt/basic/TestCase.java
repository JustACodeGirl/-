/**
 * TestCase.java
 * 
 * Copyright@2016 OVT Inc. All rights reserved. 
 * 
 * 2016年1月5日
 */
package com.ovt.basic;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.ovt.alarm.common.exception.OVTException;
import com.ovt.alarm.common.model.JsonDocument;
import com.ovt.alarm.common.utils.JsonUtils;
import com.ovt.alarm.dao.vo.RecDeal;
import com.ovt.alarm.dao.vo.RecMedia;
import com.ovt.alarm.dao.vo.RecReport;
import com.ovt.alarm.dao.vo.Role;
import com.ovt.alarm.dao.vo.User;

/**
 * TestCase
 * 
 * @Author jinzhong.zheng
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
public class TestCase
{

    /**
     * @param args
     */
    private static RestTemplate restTemplate = new RestTemplate();
    public static String BASE_URL = "http://localhost:18080/ovAlarmService/api";
    
    public static void main(String[] args) throws OVTException, IOException
    {
        //userLogin();
        //userLogout();
        //userAdd();
        //userInfo();
        //userEdit();
        //userDelete();
        //userQuery();
        //roleAdd();
        //roleDelete();
        //roleEdit();
        recReport();
        //recBox();
        //recQuery();
        //recDeal();
    }
    
    private static void userLogin()
    {
        String url = BASE_URL + "/users/login?userCode=hyson&password=123456p";
        JsonDocument response = restTemplate.postForObject(url, null, JsonDocument.class);
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void userLogout()
    {
        String url = BASE_URL + "/users/logout?access_token=052ca1dd517a1a277755971f54e5ccd8";
        JsonDocument response = restTemplate.postForObject(url, null, JsonDocument.class);
        
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void userAdd()
    {
        String url = BASE_URL + "/users/add?access_token=30b3a3d854d98f21a480e00ed040cd31";
        User user = new User();
        user.setUserCode("deqin");
        user.setUserName("朱德沁");
        user.setPassword("123456");
        user.setPhone("18999999999");
        JsonDocument response = restTemplate.postForObject(url, user, JsonDocument.class);
        
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void userInfo()
    {
        String url = BASE_URL + "/users/info?access_token=01decdd50e95fb68496b9aa5fcb57673";
                
        JsonDocument response = restTemplate.getForObject(url, JsonDocument.class);
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void userEdit()
    {
        String url = BASE_URL + "/users/edit?access_token=d065d55e2063da7ccaee28f05143d5ef";
        User user = new User();
        user.setUserCode("hyson");
        user.setUserName("小帅哥");
        //user.setPassword("111222");
        user.setPhone("13233334444");
        user.setRoleId(1);
        JsonDocument response = restTemplate.postForObject(url, user, JsonDocument.class);
        
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void userDelete()
    {
        String url = BASE_URL + "/users/delete?userId=2&access_token=196cdc5dca69a0efe97b74a0f8db81e8";
        JsonDocument response = restTemplate.postForObject(url, null, JsonDocument.class);
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void userQuery()
    {
        String url = BASE_URL + "/users/query?access_token=3d02f29578c850b768698f9774f5643f";
                
        JsonDocument response = restTemplate.getForObject(url, JsonDocument.class);
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void roleAdd()
    {
        String url = BASE_URL + "/roles/add?access_token=30b3a3d854d98f21a480e00ed040cd31";
        Role role = new Role();
        role.setRoleName("和平派出所");
        role.setRoleDesc("管辖和平街小区、福地小区");
        JsonDocument response = restTemplate.postForObject(url, role, JsonDocument.class);
        
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void roleDelete()
    {
        String url = BASE_URL + "/roles/delete?roleId=1&access_token=196cdc5dca69a0efe97b74a0f8db81e8";
        JsonDocument response = restTemplate.postForObject(url, null, JsonDocument.class);
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void roleEdit()
    {
        String url = BASE_URL + "/roles/edit?access_token=542c49489f0a0fd48ebd38af438439cb";
        Role role = new Role();
        role.setId(1);
        role.setRoleName("梅苑派出所22");
        role.setRoleDesc("管辖梅苑小区22");
        JsonDocument response = restTemplate.postForObject(url, role, JsonDocument.class);
        
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void recReport()
    {
        String url = BASE_URL + "/recs/report";
        RecReport report = new RecReport();
        report.setCallerAccount("18888888888");
        report.setCallerName("hyson");
        report.setCallerPhone("18888888888");
        report.setCallerAddress("光谷大道A88栋");
        report.setCallerDesc("");
       
        List<RecMedia> medias = new ArrayList<RecMedia>();
//        RecMedia media1 = new RecMedia();
//        media1.setMediaType("IMAGE");
//        media1.setMediaPath("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=253254892,1702344970&fm=23&gp=0.jpg");
//        media1.setRecordTime(1493348756000L);
//        medias.add(media1);
        
        RecMedia media2 = new RecMedia();
        media2.setMediaType("VIDEO");
        media2.setMediaPath("http://116.211.106.187:8080/getm3u8?evtid=151767&devid=10131&curtime=1494576229&signid=BCD4ywS651JWmCdP");
        media2.setScreenshotPath("http://116.211.106.187:8080/getVideoThumb?videoID=151767&thumbTime=549756338186");
        media2.setRecordTime(1493348756000L);
        medias.add(media2);
        
        report.setMedias(medias);
        
        JsonDocument response = restTemplate.postForObject(url, report, JsonDocument.class);
        
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void recBox()
    {
        String url = BASE_URL + "/recs/box?access_token=30b3a3d854d98f21a480e00ed040cd31&index=0&count=10&boxType=TODO";
                
        JsonDocument response = restTemplate.getForObject(url, JsonDocument.class);
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void recQuery()
    {
        String url = BASE_URL + "/recs/query?access_token=30b3a3d854d98f21a480e00ed040cd31&index=0&count=10&keyword=慧慧";
                
        JsonDocument response = restTemplate.getForObject(url, JsonDocument.class);
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
    private static void recDeal() 
    {
        String url = BASE_URL + "/recs/deal?access_token=d065d55e2063da7ccaee28f05143d5ef";
        RecDeal deal = new RecDeal();
        deal.setRecId(2);
        deal.setDealType("办结");
        deal.setDealOpinion("已经抓到小偷");
        JsonDocument response = restTemplate.postForObject(url, deal, JsonDocument.class);
        System.out.println(response.getServiceCode());
        System.out.println(response.getStateCode());
        System.out.println(response.getData());
    }
    
}
