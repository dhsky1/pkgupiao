package com.bohan.util;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class PageUtil {

	/**
	 *  输出页面JSON
	 * @param response
	 * @param object
	 * @throws IOException
	 */
    public static void toJSON(HttpServletResponse response, Object object) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(JSON.toJSONString(object, SerializerFeature.PrettyFormat));

    }
}
