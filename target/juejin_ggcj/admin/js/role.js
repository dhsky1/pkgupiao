jQuery(function($){


});

function AjaxGetData(pageIndex, pageSize) {
	var params = getParams();
	$.ajax({
		type : "GET",
		url : listUrl,
		cache : false,
		data : params,
		dataType : "json",
		success : function(obj) {
			//主体内容
		
			//翻页组件
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("网络问题:" +XMLHttpRequest.status +"," +XMLHttpRequest.readyState+","+textStatus);
		}

	});
}