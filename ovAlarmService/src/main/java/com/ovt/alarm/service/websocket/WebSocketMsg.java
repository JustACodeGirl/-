/**
 * WebSocketMsg.java
 * 
 * Copyright@2017 OVT Inc. All rights reserved. 
 * 
 * 2017年5月10日
 */
package com.ovt.alarm.service.websocket;

/**
 * WebSocketMsg
 * 
 * @Author hyson.yu
 * @Version 1.0
 * @See 
 * @Since [OVT OVALARM]/[API] 1.0
 */
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

/**
 * @ServerEndpoint 注解是一个类层次的注解，它的功能主要是将目前的类定义成一个websocket服务器端,
 *                 注解的值将被用于监听用户连接的终端访问URL地址,客户端可以通过这个URL来连接到WebSocket服务器端
 */
@ServerEndpoint(value = "/websocket/{userCode}")
public class WebSocketMsg
{
    // 静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static int onlineCount = 0;

    public static Map<String, Session> clients = new HashMap<String, Session>();

    /**
     * 连接建立成功调用的方法
     * 
     * @param session 可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    @OnOpen
    public void onOpen(@PathParam(value = "userCode") String userCode,
            Session session)
    {
        System.out.println("Socket open:" + userCode);
        clients.put(userCode, session); // 加入map中
        addOnlineCount(); // 在线数加1
        System.out.println("Hava a new user come!Online num is:" + getOnlineCount());
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(@PathParam(value = "userCode") String userCode)
    {
        System.out.println("Socket close:" + userCode);
        clients.remove(userCode); // 从map中删除
        subOnlineCount(); // 在线数减1
        System.out.println("Hava a new user out!Online num is:" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     * 
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session)
    {
        try
        {
            WebSocketMsg.sendMessage(session, message);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    /**
     * 发生错误时调用
     * 
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error)
    {
        System.out.println("Hava an error!");
        error.printStackTrace();
    }

    /**
     * 向某个客户端发送消息
     * 
     * @param session
     * @param message
     * @throws IOException
     */
    public static void sendMessage(Session session, String message)
            throws IOException
    {
        session.getBasicRemote().sendText(message);
    }

    /**
     * 向指定的某些用户发送消息
     * 
     * @param userCodeList 如果为空，则广播所有在线用户
     * @param message
     * @throws IOException
     */
    public static void sendMessageToOnlineUsers(List<String> userCodeList,
            String message) throws IOException
    {
        System.out.println("clients size:" + clients.size());

        if (userCodeList == null || userCodeList.size() == 0)
        {
            for (Map.Entry<String, Session> entry : clients.entrySet())
            {
                System.out.println("Send [" + entry.getKey() + "]:" + message);
                WebSocketMsg.sendMessage(entry.getValue(), message);
            }
        }
        else
        {
            for (String userCode : userCodeList)
            {
                if (clients.containsKey(userCode))
                {
                    System.out.println("Send [" + userCode + "]:" + message);
                    WebSocketMsg.sendMessage(clients.get(userCode), message);
                }
            }
        }
    }

    public static synchronized int getOnlineCount()
    {
        return onlineCount;
    }

    public static synchronized void addOnlineCount()
    {
        WebSocketMsg.onlineCount++;
    }

    public static synchronized void subOnlineCount()
    {
        WebSocketMsg.onlineCount--;
    }
}
