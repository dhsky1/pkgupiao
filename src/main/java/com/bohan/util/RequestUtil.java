package com.bohan.util;

import javax.servlet.http.HttpServletRequest;

public class RequestUtil {
	/** 从request中取出字符串数组参数值，如果没有取到返回个数为0的long数组 **/
	public static Long[] getLongParameters(HttpServletRequest request, String name, long defaultNum) {
		String paramValues[] = request.getParameterValues(name);
		if (paramValues == null || paramValues.length == 0)
			return new Long[0];
		Long values[] = new Long[paramValues.length];
		for (int i = 0; i < paramValues.length; i++)
			try {
				values[i] = Long.parseLong(paramValues[i].trim());
			} catch (Exception e) {
				values[i] = defaultNum;
			}

		return values;
	}
	
	/**从request中取出Long参数值，如果没有取到返回0*/
	public static Long getLong(HttpServletRequest request, String str) {
		String tempStr = request.getParameter(str);
		Long rtn = 0L;
		if (tempStr == null || "".equals(tempStr)) {
			tempStr = "0";
		}
		try {
			rtn = Long.parseLong(tempStr);
		} catch (Exception e) {
			e.printStackTrace();
			rtn = 0L;
			e.printStackTrace();
		}
		return rtn;
	}
	
	public static int getInt(HttpServletRequest request, String str) {
		String tempStr = request.getParameter(str);
		int tempInt = 0;
		if (tempStr == null || "".equals(tempStr)) {
			tempStr = "0";
		}
		try {
			tempInt = Integer.parseInt(tempStr);
		} catch (Exception e) {
			e.printStackTrace();
			tempInt = 0;
			e.printStackTrace();
		}
		return tempInt;
	}

	public static int getInt(HttpServletRequest request, String str, int defaultInt) {
		String tempStr = request.getParameter(str);
		int tempInt = 0;
		if (tempStr == null || "".equals(tempStr)) {
			tempInt = defaultInt;
			return tempInt;
		}
		try {
			tempInt = Integer.parseInt(tempStr);
		} catch (Exception e) {
			e.printStackTrace();
			tempInt = 0;
			e.printStackTrace();
		}
		return tempInt;
	}
	
	public static float getFloat(HttpServletRequest request, String str) {
		String tempStr = request.getParameter(str);
		float tempFloat = 0;
		if (tempStr == null || "".equals(tempStr)) {
			tempStr = "0.00";
		}
		try {
			tempFloat = Float.parseFloat(tempStr);
		} catch (Exception e) {
			e.printStackTrace();
			tempFloat = 0;
			e.printStackTrace();
		}
		return tempFloat;
	}
}