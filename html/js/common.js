/**
 * 从上到下依次是渠道号|imei号|唯一识别号|版本号|版本名称|客户端类型（1.WAP|2.拍掏）
 */
var	CHANNEL = window.myAndroidJs!==undefined?window.myAndroidJs.getChannel() : "NET",
	IMEI = window.myAndroidJs!==undefined?window.myAndroidJs.getImei() : "866040010089414",
	ACTIVATENUMBER = window.myAndroidJs!==undefined?window.myAndroidJs.getActivateNumber() : "4A42DF8084DD5914",
	VERSIONCODE = window.myAndroidJs!==undefined?window.myAndroidJs.getVersionCode() : "50",
	VERSIONNAME = window.myAndroidJs!==undefined?window.myAndroidJs.getVersionName() : "2.2",
	CLIENTTYPE = "2",
	PVPARAMETER  = "channel="+CHANNEL+"&activateNumber="+ACTIVATENUMBER+"&imei="+IMEI+"&pvType="+CLIENTTYPE+"&versionName="+VERSIONNAME; 
var commonJs = {
	/**
	 * 获取接口地址
	 */
	getPath : function getPath(last) {
		/**
		 * 测试服务器链接http://192.168.1.188:8080/server_ppc592/
		 * 线上服务器链接http://api.paitao.com/server/
		 */
		var basePath = "http://192.168.1.188:8080/server_ppc592/";
		if(last == null){
			return basePath;
		}
		return basePath + last;
	},
	/**
	 * 获取页面传递的参数
	 */
	getParam : function getParam(key){
		var rt = "";
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
	},
	/**
	 * 日期显示转换
	 */
	num_padding : function num_padding(n){
		return n > 9 ? n : "0" + n; 
	},
	/**
	 * 将变量转为浮点型
	 */
	num_format : function num_format(n,m){
		m = m == null ? 2 : m;
		return parseFloat(n).toFixed(m); 
	},
	/**
	 * 将大于9的转为N
	 */
	num_N : function num_N(n){
		return n > 9 ? 'N' : n; 
	},
	/**
	 * 获取字符串的字节数
	 */
	getBytes : function getBytes(val){
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
	},
	/**
	 * 获取变量的字节数
	 */
	getByteLength : function getByteLength(val){
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
	},
	/**
	 * 验证元素是否存在
	 */
	hasElement : function hasElement(ele){
		return (ele.length > 0);
	},
	/**
	 * 外链、内链兼容
	 */
	getLinkUrl : function getLinkUrl(link_base,link_url){
		if(link_url == null || link_url == undefined || link_url.toLowerCase().indexOf("http://") > -1 ){
			return link_url;
		} else{
			return link_base + link_url;
		}
	},
	/**
	 * 清楚历史记录，防止返回时跳转到其它activity
	 */
	doClearHistory : function doClearHistory() {
		if(window.myAndroidJs!==undefined){
			window.myAndroidJs.clearHistory();
		}
	},
	/**
	 * 计算购物车里的商品数量
	 */
	show_shopping_cart_num : function show_shopping_cart_num(){
		var userId = localStorage.getItem("userId");
		if(userId == null || userId === undefined || userId == ""){
			return false;
		}
		var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.get_path("market?type=160&userId="+userId));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "160",
				"userId" : userId,
			},function(result){
				if(result.result == "1"){
					var count = parseInt(result.data.count);
					if(count > 9){
						$("#shopping_cart_num").html("N");
					}else{
						$("#shopping_cart_num").html(count);
					}
				}
			});
		}
		if(result!="")
		{
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
	},
	/**
	 * 跳转到购物车页面
	 */
	goto_shopping_cart : function goto_shopping_cart(){
		window.location.href="gwc.html";
	},
	/**
	 * 跳转到商品详情页
	 */
	goto_goods_detail : function goto_goods_detail(id){
		window.localStorage.setItem("new_goods_view.html","new_goods_view.html?id=" + id);
		window.location.href="new_goods_view.html";
	},
	/**
	 * 底部菜单样式变换
	 */
	footStyleChange : function footStyleChange(){
		var footIndexId = localStorage.getItem("footIndexId");
		if(footIndexId == null || footIndexId === undefined || footIndexId == ""){
			footIndexId = 1;
		}
		var nowImgSrc = $(".footmune img").eq(footIndexId-1).attr("src");
		nowImgSrc = nowImgSrc.substring(0,nowImgSrc.indexOf(".png"))+"_on.png";
		$(".footmune span").removeClass("footmuneon");
		$(".footmune span").eq(footIndexId-1).addClass("footmuneon");
		$(".footmune img").eq(footIndexId-1).attr("src",nowImgSrc);
	},
	/**
	 * 底部菜单的跳转
	 */
	gotoFootPage : function gotoFootPage(i,menuName){
		commonJs.footPvStatistics(i,menuName)//底部菜单点击PV统计
	},
	/**
	 * 底部菜单点击PV统计
	 */
	footPvStatistics : function footPvStatistics(i,menuName){
		var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=141&menuIndex="+i
	  			+"&menuName="+escape(menuName).replace(/%/g,"%25")+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "141",
				"menuIndex" : i,
				"menuName" : escape(menuName),
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				localStorage.setItem("footIndexId",i);//保存调转页序号，用于样式更换
				if(window.myAndroidJs!==undefined){
					window.myAndroidJs.goToMenuPage(i);
				} else{
					window.location.href=i+".html";
				}
			});
		}
		if(result!="")
		{
			localStorage.setItem("footIndexId",i);//保存调转页序号，用于样式更换
			if(window.myAndroidJs!==undefined){
				window.myAndroidJs.goToMenuPage(i);
			} else{
				window.location.href=i+".html";
			}
		}
	},
	/**
	 * banner广告点击pv统计
	 */
	advertPvStatistics : function advertPvStatistics(id,adver_place,sort,url){
		var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=194&id="+id+"&adver_place="+adver_place
	  			+"&sort="+sort+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "194",
				"id" : id,
				"adver_place" : adver_place,
				"sort" : sort,
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				window.location.href = url;
			});
		}
		if(result!="")
		{
			window.location.href = url;
		}
	},
	/**
	 * 点击分类pv统计
	 */
	classificationPvStatistics : function classificationPvStatistics(categoryId,category){
		var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=154&categoryId="+categoryId+"&category="+category
	  			+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "154",
				"categoryId" : categoryId,
				"category" : category,
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				window.localStorage.setItem("in.html","in.html?key=" + categoryId);
				window.location.href="in.html";
			});
		}
		if(result!="")
		{
			window.localStorage.setItem("in.html","in.html?key=" + categoryId);
			window.location.href="in.html";
		}
	},
	/**
	 * 商品PV统计 以下是readType值对应的统计行为
	 * qianggou : 抢购页点击商品进入详情页
	 * fenlei : 二级分类目录中点击商品进入详情页
	 * temai : 特卖专区中点击商品进入详情页
	 * huodong : 活动页中点击商品进入详情页
	 * cainixihuan : 点击商品详情页, 猜你喜欢中商品进入详情页
	 * qita : 其他方式进入详情页
	 * sousuo : 搜索页中点击商品进入详情页
	 */
	goodsClassificationPvStatistics : function goodsClassificationPvStatistics(id,userId,readType){
	 	var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=168&id="+id+"&userId="+userId+"&readType="+readType
	  			+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "168",
				"id" : id,
				"userId" : userId,
				"readType" : readType,
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				commonJs.goto_goods_detail(id);//跳转到商品详情页
			});
		}
		if(result!="")
		{
			commonJs.goto_goods_detail(id);//跳转到商品详情页
		}
	 },
	/**
	 * 详情页浏览行为pv统计 以下是category值对应的统计行为
	 * 1 : 在商品详情页点击"立即抢购"进入下单页
	 * 2 : 点击加入购物车
	 * 3 : 点击“去购物车结算”
	 * 4 : 在购物车内点击结算进入下单页
	 * 5 : 点击留言咨询
	 * 6 : 点击商品评论切页
	 * 7 : 点击猜你喜欢切页
	 * 8 : 点击商品简介切页
	 * 9 : 点击商品详情内广告
	 * 10: 点击转微信
	 * 11: 点击转微博
	 */
	detailsBrowsingPvStatistics : function detailsBrowsingPvStatistics(category,commodityId,_callback){
	 	var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=200&category="+category+"&commodityId="+commodityId
	  			+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "200",
				"category" : category,
				"commodityId" : commodityId,
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				_callback();
			});
		}
		if(result!="")
		{
			_callback();
		}
	 },
	/**
	 * 列表排序选择pv统计 以下是category对应的统计行为
	 * 1 ： 分类
	 * 2 ： 特卖
	 */
	orderItemPvStatistics : function orderItemPvStatistics(category,sortName,type){
		var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=196&category="+category+"&sortName="+escape(sortName).replace(/%/g,"%25")
	  			+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "196",
				"category" : category,
				"sortName" : escape(sortName),
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				if(category=="1"){
					loadData(1,type);
				} else if(category=="2"){
					special_group_list(1,type);
				}
			});
		}
		if(result!="")
		{
			if(category=="1"){
				loadData(1,type);
			} else if(category=="2"){
				special_group_list(1,type);
			}
		}
	},
	/**
	 * 点击特卖区"查看更多"pv统计
	 */
	specialSellPvStatistics : function specialSellPvStatistics(id,specialName){
		var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=199&specialName="+escape(specialName).replace(/%/g,"%25")
	  			+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "199",
				"specialName" : escape(specialName),
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				window.localStorage.setItem("special_more.html","special_more.html?id="+id);
				window.location.href="special_more.html";
			});
		}
		if(result!="")
		{
			window.localStorage.setItem("special_more.html","special_more.html?id="+id);
			window.location.href="special_more.html";
		}
	},
	/**
	 * 更多页面pv统计 以下是category值对应的统计行为
	 * 1 : 点击个人资料进入修改页面
	 * 2 : 点击我的订单进入订单页面
	 * 3 : 在订单页面中点击订单查看订单详情
	 * 4 : 订单管理中无内容时点击"马上去抢购"
	 * 5 : 点击退出账号
	 * 6 : 点击购物帮助
	 * 7 : 点击关于
	 * 8 : 应用推荐
	 * 9 : 留言信箱
	 */
	morePvStatistics : function morePvStatistics(category,n){
	 	var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=201&category="+category
	  			+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "201",
				"category" : category,
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				if(n == 1){//个人资料
					window.location.href="setting_info.html";
				} else if(n == 2){//退出登录
					logout();//退出登录
				} else if(n == 5){//我的订单
					window.location.href="order.html";
				} else if(n == 6){//留言信箱
					window.location.href="message_box.html";
				} else if(n == 7){//购物帮助
					window.location.href="help.html";
				} else if(n == 8){//关于拍掏
					window.location.href="about.html";
				} else if(n == 9){//应用推荐
					window.location.href="app_recommend.html";
				}
			});
		}
		if(result!="")
		{
			if(n == 1){//个人资料
				window.location.href="setting_info.html";
			} else if(n == 2){//退出登录
				logout();//退出登录
			} else if(n == 5){//我的订单
				window.location.href="order.html";
			} else if(n == 6){//留言信箱
				window.location.href="message_box.html";
			} else if(n == 7){//购物帮助
				window.location.href="help.html";
			} else if(n == 8){//关于拍掏
				window.location.href="about.html";
			} else if(n == 9){//应用推荐
				window.location.href="app_recommend.html";
			}
		}
	},
	/**
	 * 登录pv统计 以下是category值对应的统计行为
	 * 1 : 在登录页面点击注册
     * 2 : 注册成功
     * 3 : 登录成功
	 */
	loginPvStatistics : function loginPvStatistics(category,loginName){
	 	var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=193&category="+category
	  			+"&loginName="+escape(loginName).replace(/%/g,"%25")+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "193",
				"category" : category,
				"loginName" : escape(loginName),
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				if(category=="1"){
					window.location.href = "reg.html";
				} else{
					window.location.href = "5.html";
				}
			});
		}
		if(result!="")
		{
			if(category=="1"){
				window.location.href = "reg.html";
			} else{
				window.location.href = "5.html";
			}
		}
	},
	/**
	 * 关注行为统计pv统计 以下是category值对应的统计行为
	 * 1 : 点击关注新浪微博按钮
     * 2 : 点击关注微信按钮
     * 3 : 点击关注腾讯微博按钮
	 */
	snsPvStatistics : function snsPvStatistics(snsName,category){
	 	var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=202&category="+category
	  			+"&snsName="+escape(snsName).replace(/%/g,"%25")+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "202",
				"category" : category,
				"snsName" : escape(snsName),
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				if(category=="1"){
					window.location.href = "http://t.cn/zRMCIp4";
				} else if(category=="2"){
					window.location.href = "http://weixin.qq.com/qr/shpaitao";
				} else if(category=="3"){
					window.location.href = "http://t.qq.com/shpaitao";
				}
			});
		}
		if(result!="")
		{
			if(category=="1"){
				window.location.href = "http://t.cn/zRMCIp4";
			} else if(category=="2"){
				window.location.href = "http://weixin.qq.com/qr/shpaitao";
			} else if(category=="3"){
				window.location.href = "http://t.qq.com/shpaitao";
			}
		}
	},
	/**
	 * 搜索pv统计
	 */
	searchPvStatistics : function searchPvStatistics(keyword){
		var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=198&keyword="+escape(keyword).replace(/%/g,"%25")+
	  			"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "198",
				"keyword" : escape(keyword),
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				loadData(1,keyword);
			});
		}
		if(result!="")
		{
			loadData(1,keyword);
		}
	},
	/**
	 * 热门推荐pv统计
	 */
	 hotRecommendPvStatistics : function hotRecommendPvStatistics(link){
	 	var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=195&link="+escape(link).replace(/%/g,"%25")+
	  			"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "195",
				"link" : escape(link),
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				window.location.href = link;
			});
		}
		if(result!="")
		{
			window.location.href = link;
		}
	},
	/**
	 * 应用推荐pv统计 以下是category值对应的统计行为
	 * 1 : 摇一摇
     * 2 : 换一张
     * 3 : 下载行为
	 */
	appRecommendPvStatistics : function appRecommendPvStatistics(appName,category,url){
		var result="";
	  	try{
	  		result = window.myAndroidJs.doPostHttpRequest(commonJs.getPath("market?type=203&category="+category
	  			+"&appName="+escape(appName).replace(/%/g,"%25")+"&"+PVPARAMETER));
	  	}catch (e) {
	  		$.getJSON(commonJs.getPath("market?jsoncallback=?"),{
				"type" : "203",
				"category" : category,
				"appName" : escape(appName),
				"channel" : CHANNEL,
				"activateNumber" : ACTIVATENUMBER,
				"imei" : IMEI,
				"pvType" : CLIENTTYPE,
				"versionName" : VERSIONNAME,
			},function(result){
				if(category=="1"){
					getAppInfo();
				} else if(category=="2"){
					getAppInfo();
				} else if(category=="3"){
					window.location.href = url;
				}
			});
		}
		if(result!="")
		{
			if(category=="1"){
				getAppInfo();
			} else if(category=="2"){
				getAppInfo();
			} else if(category=="3"){
				window.location.href = url;
			}
		}
	}
} 