package com.bohan.admin.service;

import java.util.Map;

import com.bohan.admin.model.SysRole;
import com.bohan.pagetools.QueryResult;

public interface SysRoleService {

	QueryResult<SysRole> queryScrollData(Map<String, Object> queryParams,
			int firstResult, int maxresult);

}
