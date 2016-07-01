package com.bohan.admin.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bohan.admin.dao.SysRoleMapper;
import com.bohan.admin.model.SysRole;
import com.bohan.admin.model.SysRoleCriteria;
import com.bohan.admin.service.SysRoleService;
import com.bohan.pagetools.QueryResult;
import com.github.pagehelper.PageHelper;


@Service
public class SysRoleServiceImpl implements SysRoleService {
	
	@Resource
	private SysRoleMapper  sysRoleMapper;

	@Override
	public QueryResult<SysRole> queryScrollData(
			Map<String, Object> queryParams, int firstindex, int maxresult) {
		QueryResult<SysRole> qr = new QueryResult<SysRole>();
		SysRoleCriteria example = new SysRoleCriteria();
		
		try{
		int totalRecored = sysRoleMapper.countByExample(example );
		if(totalRecored == 0){
			return qr;
		}
		PageHelper.startPage(firstindex, maxresult, true);
		List<SysRole> lstRecords = sysRoleMapper.selectByExample(example);
		qr.setTotalrecord(totalRecored);
		qr.setResultlist(lstRecords);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return qr;
	}

}
