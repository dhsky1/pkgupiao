package com.bohan.jedis;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/** 
 * @author 作者姓名 
 * @version 创建时间：2015-4-13 下午12:15:35 
 * 类说明 
 */
public class JedisConnectionManager {

	private static JedisPool pool;
	
	public JedisConnectionManager(){
		
		JedisProperties prop = JedisProperties.getInstance();
		String REDIS_IP = prop.getValue("redis.host");
		int REDIS_PORT = prop.getIntValue("redis.host.port");
		String REDIA_PASS = prop.getValue("redis.host.pass");
		
		JedisPoolConfig jpc = new JedisPoolConfig();
		jpc.setTestOnBorrow(true);
		jpc.setMaxActive(200);
		jpc.setMaxWait(100L);
		/** 判断有无密码来生成连接池 */
		if(REDIA_PASS == null || REDIA_PASS.length() <= 0)
			JedisConnectionManager.pool = new JedisPool(jpc, REDIS_IP, REDIS_PORT, 2000);
		else
			JedisConnectionManager.pool = new JedisPool(jpc, REDIS_IP, REDIS_PORT, 2000, REDIA_PASS);
	}
	
	public static Jedis getConnection(){
		Jedis jedis = pool.getResource();
		return jedis;
	}
	
	public static void closeConnection(Jedis jedis){
		pool.returnResource(jedis);
	}
	
	public static void destroy(){
		pool.destroy();
	}
	

}

 