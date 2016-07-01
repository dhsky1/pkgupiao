/**
 * 角色类
 * @author duanhui
 */
package com.bohan.admin.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bohan.admin.model.SysRole;
import com.bohan.admin.service.SysRoleService;
import com.bohan.pagetools.PageView;
import com.bohan.util.PageUtil;
import com.bohan.util.RequestUtil;


@Controller
@RequestMapping("/admin/role")
public class SysRoleController {

	@Resource
	SysRoleService sysRoleService;
	
	@ResponseBody
	@RequestMapping(value="/list")
	public void list(HttpServletRequest request, HttpServletResponse response, @RequestParam long roleid,  @RequestParam int  type) throws IOException{
		int pageIndex = RequestUtil.getInt(request, "pageIndex");
		if(pageIndex == 0) {
			pageIndex = 1;
		}
		int pageSize = RequestUtil.getInt(request, "pageSize");
		if(pageSize == 0) {
			pageSize = 10;
		}			
		PageView<SysRole> pageView = new PageView <SysRole>(pageSize,pageIndex);
		
		Map<String, Object> queryParams = new HashMap<String, Object>();
		pageView.setQueryResult(sysRoleService.queryScrollData(queryParams, pageView.getCurrentpage(), pageView.getMaxresult()));
		
		PageUtil.toJSON(response, pageView);
	}
}
