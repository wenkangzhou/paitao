jQuery.get_path = function(last){
	var base_path = 'http://api.paitao.com/server/';
	if(last == null){
		return base_path;
	}
	return base_path + last;
}
jQuery.get_param = function (key){ 
	var rt = '';
	var url = window.location.href;
	url = url.substring(url.indexOf("html/")+5,url.length);
	var arr = window.localStorage.getItem(url).split("?");
　　if(arr.length < 2){ 
　　	return rt; 
　　} 
　　var params = arr[1].split("&"); 
　　for(var i = 0; i < params.length; i++ ){ 
	　　var arg = params[i].split("="); 
	　　if(arg.length < 2) continue; 
		if(arg[0] == key){
			rt = arg[1];
			break;
		}
　　} 
	return rt;
}
jQuery.num_padding = function (n){ 
	return n > 9 ? n : '0' + n; 
}
jQuery.num_format = function (n,m){ 
	m = m == null ? 2 : m;
	return parseFloat(n).toFixed(m); 
}
jQuery.get_bytes = function (val) {
	var rst, regex,
	input = val,
	count = 0;
	if (rst = input) {
		rst = input.length;
		for (regex = /[\u4e00-\u9fa5]/; rst--; ) {
			count += regex.test(input.charAt(rst)) ? 2 : 1;
		}
	}
	return count;
}
jQuery.num_N = function (n){ 
	return n > 9 ? 'N' : n; 
}
jQuery.get_link_url = function (link_base,link_url){
	if(link_url == null || link_url == undefined || link_url.toLowerCase().indexOf('http://') > -1 ){
		return link_url;
	} else{
		return link_base + link_url;
	}
};
jQuery.goto_goods_detail = function (id){ 
	window.localStorage.setItem("new_goods_view.html","new_goods_view.html?id=" + id);
	window.location.href="new_goods_view.html";
}
jQuery.doPostByClient = function(url){
	return window.myAndroidJs.doPostHttpRequest(url);
}
jQuery.doClearHistory = function(){
	if(window.myAndroidJs!==undefined)
		window.myAndroidJs.clearHistory();
}
jQuery.loadLoginStatus = function(){
	var u_id = window.localStorage.getItem("_user_id");
	if(u_id != null && 'undefined' !== typeof u_id && u_id.length > 0){
		$("#login_had").show();
		$("#login_none").hide();
	}else{
		$("#login_had").hide();
		$("#login_none").show();
	}
}
jQuery.show_shopping_cart_num = function(basePath){
	var u_id = window.localStorage.getItem('_user_id');
	if(u_id == null || u_id == undefined || u_id == ''){
		return ;
	}
	
	var result="";
  	try{
  		result = window.myAndroidJs.doPostHttpRequest($.get_path("market?type=160&userId="+u_id));
  	}catch (e) {
	}
	if(result!="")
	{
		//result = eval('('+ result +')');
		result = JSON.parse(result);
		if(result.result == "1"){
			var count = parseInt(result.data.count);
			if(count > 9){
				$("#shopping_cart_num").html("N");
			}else{
				$("#shopping_cart_num").html(count);
			}
		}
	}
}
jQuery.goto_shopping_cart =function(){
	window.location.href="gwc.html";
	return false;
}

var _channel;
var _imei;
try{
	_channel = window.myAndroidJs.getChannel();
	_imei = window.myAndroidJs.getActivateNumber();
}catch (e) {
}