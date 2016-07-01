jQuery(function($){


});

function getParams(){
 	console.log(pageIndex);
 	var params = {
 			roleid:1,
 			type:0,
 			pageIndex:pageIndex,
 			pageSize:pageSize
  	};
  	return params;
}

function createPaging(totalCount){
	
	$('#callBackPager').extendPagination({
        totalCount: totalCount,
        showCount: 10,
        limit: pageSize,
        callback: function (curr, limit, totalCount) {
        	AjaxGetData(curr,limit);
        }
    });
}

function createBody(obj){
	var html = [];
	html.push(' <table class="table table-hover piece" style="margin-left: 0;">');
    html.push(' <caption>悬停表格(' + obj.totalrecord + ')</caption>');
    html.push(' <thead><tr><th>ID</th><th>名称</th><th>描述</th></tr></thead><tbody>');
    for (var i = 0; i <obj.records.length; i++) {
    	var role = obj.records[i];
        html.push('<tr><td>' + role.id + '</td>');
        html.push('<td>' + role.roleName  + '</td>');
        html.push('<td>' + role.remark  + '</td>');
        html.push('</tr>');
    }
    html.push('</tbody></table>');
    var mainObj = $('#mainContent');
    mainObj.empty();
    mainObj.html(html.join(''));
}

function gotoNewPage(){
	window.location.href='/admin/roleadd.html';
}