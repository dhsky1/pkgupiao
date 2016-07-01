var loginstate = false;

var returnIndex, logout_return; !
function() {
    var a, b, c, d, e;
    document.domain = "ggcj.com";
    a = function(a) {
        var c, d, b = document.cookie.split(";");
        for (c = 0; c < b.length; c++) if (d = b[c].substr(0, b[c].indexOf("=")), d = d.replace(/^\s+|\s+$/g, ""), d == a) return b[c].substr(b[c].indexOf("=") + 1)
    };
    b = function(a, b) {
        document.cookie = a + "=;path=/;domain=" + b + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
    };
    c = a("login.authToken") || "";
    d = c.split("|");
    e = {
        id: d[1] || -1,
        nickName: unescape(d[2] || "游客"),
        isPerfect: d[3] || 0,
        logout: function() {
            var a = window.location.host.split(".");
            domain = "." + a[a.length - 2] + "." + a[a.length - 1],
            b("authToken.login", domain),
            b("login.authToken", domain),
            b("guagua.authToken.login", domain),
            b("login.client", domain)
        }
    };
    window._user = e;
} (),
StringBuffer.prototype.append = function(a) {
    this.__strings__.push(a)
},
StringBuffer.prototype.toString = function() {
    return this.__strings__.join("")
},
returnIndex = function() {
    window.location.href = window.location.href
},
logout_return = function() {};


var pub_uid= window._user.id;
function ShowPre(o){
	var that= this;
	this.box = $("#"+o["box"]);
	this.btnP = $("#"+o.Pre);
	this.btnN= $("#"+o.Next);
	this.v = o.v||1;
	this.c = 0;
	var li_node = "li";
	this.loop = o.loop||false;

	//循环生成dom
	if(this.loop){
		this.li =  this.box.find(li_node);
		this.box.append(this.li.eq(0).clone(true));
	};
	this.li = this.box.find(li_node);
	this.l = this.li.length;

	//滑动条件不成立
	if(this.l<=this.v){
		this.btnP.hide();
		this.btnN.hide();
	};
	this.deInit = true;
	this.w = this.li.outerWidth(true);
	this.box.width(this.w*this.l);
	this.maxL = this.l - this.v;

	//要多图滚动 重新计算变量
	this.s = o.s||1;
	if(this.s>1){
		this.w = this.v*this.w;
		this.maxL = Math.floor(this.l/this.v);
		this.box.width(this.w*(this.maxL+1));
		//计算需要添加数量
		var addNum = (this.maxL+1)*this.v-this.l;
		var addHtml = "";
		for(var adN = 0;adN < addNum;adN++){
			addHtml += "<li class='addBox'><div class='photo'></div><div class='text'></div></li>";
		};
		this.box.append(addHtml);
	};
	
	//生成状态图标
	this.numIco = null;
	if(o.numIco){
		this.numIco  = $("#"+o.numIco);
		var numHtml = "";
		numL = this.loop?(this.l-1):this.l;
		for(var i = 0;i<numL;i++){
				numHtml+="<a href='javascript:void(0);'>"+i+"</a>";
		};
		this.numIco.html(numHtml);
		this.numIcoLi = this.numIco.find("a");
		this.numIcoLi.bind("click",function(){
			if(that.c==$(this).html())return false;
			that.c=$(this).html();
			that.move();
		});
	};
	this.bigBox = null;
	this.loadNumBox = null;
	if(o.loadNumBox){
		this.loadNumBox = $("#"+o.loadNumBox);
	};

	//当前序号设置
	this.allNumBox = null;
	if(o.loadNumBox){
		this.allNumBox = $("#"+o.allNumBox);
		if(o.bBox){
			var cAll = this.l<10?("0"+this.l):this.l;
		}else{
			var cAll = this.maxL<10?("0"+(this.maxL+1)):(this.maxL+1);
		};
		this.allNumBox.html(cAll);
	};

	//大图按钮点击操作
	if(o.bBox){
		this.bigBox = $("#"+o.bBox);
		this.li.each(function(n){
			$(this).attr("num",n);
			var cn = (n+1<10) ? ("0"+(n+1)):n+1;
			$(this).find(".text").html(cn);
		});
		this.loadNum = 0;
		this.li.bind("click",function(){
			if(that.loadNum==$(this).attr("num"))return false;
			var test = null;
			if(that.loadNum>$(this).attr("num")){
				test = "pre";
			};
			that.loadNum = $(this).attr("num");

			that.loadImg(test);
		});
		that.loadImg();
		if(o.bNext){
			that.bNext = $("#"+o.bNext);
			that.bNext.bind("click",function(){
				that.loadNum<that.l-1 ?that.loadNum++:that.loadNum=0;
				that.loadImg();
			});
		};
		if(o.bPre){
			that.bPre = $("#"+o.bPre);
			that.bPre.bind("click",function(){
				that.loadNum> 0? that.loadNum--:that.loadNum=that.l-1 ;
				that.loadImg("pre");
			});
		};
	};

	//滑动点击操作(循环or不循环)
	if(this.loop){
		this.btnP.bind("click",function(){
			if(that.c<=0){
				that.c = that.l-1;
				that.box.css({left:-that.c*that.w});		
			};
			that.c --;
			that.move(1);
		});
		this.btnN.bind("click",function(){
			if(that.c>=(that.l-1)){
				that.box.css({left:0});		
				that.c = 0;
			};
			that.c++;
			that.move(1);
		});
	}else{
		this.btnP.bind("click",function(){
			that.c> 0? that.c--:that.c=that.maxL ;
			that.move(1);
		});
		this.btnN.bind("click",function(){
			that.c<that.maxL ?that.c++:that.c=0;
			that.move(1);
		});
	};
	that.timer = null;
	if(o.auto){
		that.box.bind("mouseover",function(){
			clearInterval(that.timer);
		});
		that.box.bind("mouseleave",function(){
			that.autoPlay();
		});
		that.autoPlay();
		
	};
	this.move();
}

ShowPre.prototype = {
	move:function(test){ //滑动方法
		var that = this;
		var pos = this.c*this.w;
		//document.title = (test&&that.timer);
		if(test&&that.timer){
			clearInterval(that.timer);
		};
		//当前序号图标
		if(that.numIco){ 
			that.numIcoLi.removeClass("on");
			var numC = that.c;
			if(that.loop&&(that.c==(this.l-1))){
				numC= 0;	
			};
			that.numIcoLi.eq(numC).addClass("on");
		};

		this.box.stop();
		this.box.animate({left:-pos},function(){
			if(test&&that.auto){
				that.autoPlay();
			};
			if(that.loop&&that.c==that.maxL){
				that.c = 0;
				that.box.css({left:0})
			};
		});
		if(that.bigBox)return false;
		//设置大图加载序号
		if(that.loadNumBox){
			var loadC = parseInt(that.c)+1;
				loadC = loadC<10?"0"+loadC:loadC;
				that.loadNumBox.html(loadC);
		};

	},
	loadImg:function(test){ //加载大图方法
		var that = this;
		var _src = this.li.eq(that.loadNum).attr("bsrc"),bigTh3=null,bigTh4=null,bigText=null;
		if(that.li.eq(that.loadNum).attr("data-h")){
			//$("#bigT h3").html(that.li.eq(that.loadNum).attr("data-h"));
			var bigTh3 = $("#bigT h3");
			$("#bigT").hide();
			bigTh3.html("");
		};
		if(that.li.eq(that.loadNum).attr("data-m")){
			//$("#bigT h4").html(that.li.eq(that.loadNum).attr("data-m"));
			var bigTh4 = $("#bigT h4");
			$("#bigT").hide();
				bigTh4.html("");
		};
		if(that.li.eq(that.loadNum).attr("data-text")){
			//$("#bigText").html(that.li.eq(that.loadNum).attr("data-text"));
			var bigText = $("#bigText");
				bigText.html("").hide();
		};
		var img = new Image();
			$(img).hide();
			//loading dom操作(分首次加载和后面加载，根据点击操作设置运动方向)
			if(that.deInit){
				var le = 0;
				that.deInit = false;
				that.bigBox.html("<div class='loading'></div><div class='loading'></div>");
			}else{
				if(test!="pre"){
					var le = -1230;
					that.bigBox.append("<div class='loading'></div>");
				}else{
					var le = 1230;
					that.bigBox.find(".loading").before("<div class='loading'></div>");
					that.bigBox.css({"margin-left":-1230});
					le = 0;
				};				
			};
			that.bigBox.animate({"margin-left":le},function(){
				$(img).bind("load",function(){
					//判断出现方向
					if(test!="pre"){
						var n = 1,oldN = 0;
					}else{
						var n = 0,oldN = 1;
					};
					that.bigBox.find(".loading").eq(n).html(img);
					that.bigBox.find(".loading").eq(oldN).remove();
					that.bigBox.css({"margin-left":0});
					$(this).fadeIn(200,function(){
						if(bigTh3){
							$("#bigT").fadeIn()
							bigTh3.html(that.li.eq(that.loadNum).attr("data-h"));
						};
						if(bigTh4){
							$("#bigT").fadeIn()
							bigTh4.html(that.li.eq(that.loadNum).attr("data-m"));
						};
						if(bigText){
							bigText.html(that.li.eq(that.loadNum).attr("data-text")).fadeIn();
						};
					});
				});
				img.src = _src;
			});
			//添加当前加载序号
			that.li.removeClass("on");
			that.li.eq(that.loadNum).addClass("on");
			if(that.loadNumBox){
				var loadC = parseInt(that.loadNum)+1;
					loadC = loadC<10?"0"+loadC:loadC;
					that.loadNumBox.html(loadC);
			};
			
			
	},
	autoPlay:function(){ //自动播放方法
		var that =this;

		that.timer = setInterval(function(){
			that.c<that.maxL?that.c++:that.c=0;
			that.move();
		},4000);
	}
}


/**
 * 下面是从股票池迁移过来的方法
 */
function loadLoginCookie(a, b) {
    var c = "http://www.guagua.cn/callback.html",
    d = "http://www0.guagua.cn/pcvs/s1?ljurl=" + c + "&uid=" + a + "&mcheck=" + b;
    document.getElementById("login_frame").src = d
}
function getQueryParam(a) {
    var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"),
    c = window.location.search.substr(1).match(b);
    return null != c ? unescape(c[2]) : null
}
function loginPasswordTipMain(a, b) {
    var c, d;
    null == a || void 0 == a || 0 == a || (1 == a || 2 == a) && (c = loginCreateTipArea(b), d = loginDisplayTipInfo(a), 1 == c[0] && "error" != d[0] && (document.getElementById(c[1]).innerHTML = d[0], document.getElementById(c[2]).href = d[1]))
}
function loginCreateTipArea(a) {
    var e, f, g, h, i, b = new Array([!1], ["loginTipArea"], ["loginTipA"]),
    c = '<img src="http://www.guagua.cn/guagua/templet/common/images/tipImg1.gif" style="vertical-align:text-bottom;margin:0 0 0 3px;" id="loginImgTip"/><em id="' + b[1] + '" style="display:none;"></em>',
    d = document.getElementById(a);
    if (void 0 != d) {
        if (void 0 == document.getElementById(b[2]) && void 0 != d) for (e = d.childNodes, f = 0; f < e.length; f++) if (g = e[f], null != g.firstChild && "修改密码" == g.firstChild.nodeValue) {
            h = document.createElement("a"),
            g.appendChild(h),
            d.insertBefore(h, e[f + 1]),
            h.id = b[2],
            h.className = "tips",
            h.innerHTML = c,
            i = document.getElementById("loginImgTip"),
            b[0] = !0,
            i.onmouseover = function() {
                document.getElementById(b[1]).style.display = "block"
            },
            i.onmouseout = function() {
                document.getElementById(b[1]).style.display = "none"
            };
            break
        }
    } else loginDebug("头部topbar的div不存在，请检查头部导航栏的div的id是否为login_div。");
    return b
}
function loginDisplayTipInfo(a) {
    var b = new Array(2);
    return 1 == a ? (b[0] = "您的帐号信息未完善", b[1] = "http://user.ggcj.com?name=mima_xiugaimima") : 2 == a ? (b[0] = "您的帐号安全系数较低", b[1] = "http://user.ggcj.com/?name=mimaanquanzhongxin") : (b[0] = "error", b[1] = ""),
    b
}
function dyniframesize(a) {
    document.domain = "ggcj.com";
    var b = null;
    document.getElementById(a) && (b = document.getElementById(a)),
    b && !window.opera && (b.style.display = "block", b.contentDocument && b.contentDocument.body && b.contentDocument.body.offsetHeight ? (b.height = b.contentDocument.body.offsetHeight, b.width = b.contentDocument.body.scrollWidth) : b.Document && b.Document.body && b.Document.body.scrollHeight && (b.height = b.Document.body.scrollHeight, b.width = b.Document.body.scrollWidth))
}
function getMainHost() {
    var a = document.domain,
    b = a.split("."),
    c = b.length;
    return c >= 2 ? b[c - 2] + "." + b[c - 1] : "ggcj.com"
}
function StringBuffer() {
    this.__strings__ = []
}
function createMask() {
    var a = document.createElement("div");
    a.id = "mDiv";
    a.style.position = "absolute";
    a.style.zIndex = "101";
    var _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    var _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    a.style.width = _scrollWidth + "px";
    a.style.height = _scrollHeight + "px";
    a.style.top = "0px";
    a.style.left = "0px";
    a.style.background = "#33393C";
    a.style.filter = "alpha(opacity=40)";
    a.style.opacity = "0.40";
    a.style.display = "none";
    document.body.appendChild(a);
}

function qq_login() {
	var url = window.location.href;
			window.open('http://passport.ggcj.com/redirect/qqLogin.do?sUrl='+ window.location.href);
}

function common_login(tit) {
    createMask();
    document.domain = "ggcj.com";
    document.getElementById("loginIFrame").src = "http://passport.ggcj.com/passport/other_login.html?sUrl=" + window.location.href + "&tit=" + tit;
    if(document.getElementById("mDiv")!=null){
    	document.getElementById("mDiv").style.display = "block";
    }
    if(document.getElementById("loginDiv")!=null){
    	document.getElementById("loginDiv").style.display = "block";
    }
}

function showRegDiv() {
    createMask();
    document.domain = "ggcj.com";
    document.getElementById("registeIFrame").src = "http://passport.ggcj.com/passport/other_regist.html?sUrl=" + window.location.href + "&btnValue=123";
    if(document.getElementById("mDiv")!=null){
    	document.getElementById("mDiv").style.display = "block";
    }
    if(document.getElementById("registeDiv")!=null){
    	document.getElementById("registeDiv").style.display = "block";
    }
}
function closeDiv(a) {
    if(document.getElementById("mDiv")!=null){
    	document.getElementById("mDiv").style.display = "none";
    }
    if(document.getElementById(a)!=null){
    	document.getElementById(a).style.display = "none";
    }  
}
function public_login_register_close_callback_function() {
	if(document.getElementById("mDiv")!=null){
		document.getElementById("mDiv").style.display = "none";
	}
	if(document.getElementById("loginDiv")!=null){
		document.getElementById("loginDiv").style.display = "none";
	}
	if(document.getElementById("registeDiv")!=null){
		document.getElementById("registeDiv").style.display = "none";
	}
}
function common_logout(ref) {
    var domain, anyone, uid = window._user.id,
    nickname = window._user.nickName;
    window._user.logout();
    domain = getMainHost();
    logout_return();    
    if(ref=='1'){
    	window.location.href="/vote/index.html";
    	return;
    }
    window.location.href="/market/page/index.html";
}


/**utils*/
function HashMap() {
	var a = 0,
	b = new Object;
	this.put = function(c, d) {
		this.containsKey(c) || a++,
		b[c] = d
	},
	this.get = function(a) {
		return this.containsKey(a) ? b[a] : null
	},
	this.getByValue = function(a) {
		for (var c in b) if (b[c] == a) return c;
		return null
	},
	this.remove = function(c) {
		this.containsKey(c) && delete b[c] && a--
	},
	this.containsKey = function(a) {
		return a in b
	},
	this.containsValue = function(a) {
		for (var c in b) if (b[c] == a) return ! 0;
		return ! 1
	},
	this.values = function() {
		var c, a = new Array;
		for (c in b) a.push(b[c]);
		return a
	},
	this.keys = function() {
		var c, a = new Array;
		for (c in b) a.push(c);
		return a
	},
	this.size = function() {
		return a
	},
	this.clear = function() {
		a = 0,
		b = new Object
	}
}

function formatFloat(src, pos){ 
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos); 
} 

	document.domain="ggcj.com";

 	if (window._user.id != -1) {		
 		closeDiv("loginDiv");	
 		var nickName_sort_header = "";
 		if (window._user.nickName.length > 6){		
 			nickName_sort_header = window._user.nickName.substr(0, 6)+"...";
 		}else{
 			nickName_sort_header = window._user.nickName;
 		}
 		document.getElementById("log_R_out_header").style.display = "none";
 		document.getElementById("log_R_in_header").style.display = "block";
 		$("#user_name_header").text(nickName_sort_header+"("+window._user.id+")");
 		document.getElementById("user_name_header").title=window._user.nickName+"("+window._user.id+")";
 	} else {
 		document.getElementById("log_R_out_header").style.display = "block";
 		document.getElementById("log_R_in_header").style.display = "none";
 		$("#user_name_header").text("");	
 	}
 	
function getCookie(name){
	var result = null;
	//对cookie信息进行相应的处理，方便搜索
	var myCookie = ""+document.cookie+";";
	var searchName = ""+name+"=";
	var startOfCookie = myCookie.indexOf(searchName);
	var endOfCookie;
	if(startOfCookie != -1){
		startOfCookie += searchName.length;
		endOfCookie = myCookie.indexOf(";",startOfCookie);
		result = (myCookie.substring(startOfCookie,endOfCookie));
	}
	return result;
} 	