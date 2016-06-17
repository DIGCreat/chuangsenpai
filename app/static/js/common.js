var Contact = {
	send: function(type, url, val, fn) {
		if (type == 'get') {
			$.get(url, val, fn);
		} else if (type == 'post') {
			$.post(url, val, function(data) {
				console.log(data);
			});
		}
	},
	checkLogin: function() {
	},
	getCookie: function() {

	}
}

function CheckMail(mail,pwd) {
 var mailreg  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 var pwdreg  = /^[a-zA-Z]\w{5,17}$/;
 if (mailreg.test(mail)) return true;
 else {
    return false;
 }
 if (pwdreg.test(pwd)) return true;
 else {
    return false;
 }
}
var Popup = (function() { //原生封装
	var open = function(config) {};
	open.prototype = {
		init: function(config) { //初始化
			this.config = config;
			return this;
		},
		_createFloater: function(html) { //创建弹出层
			var width = this.config.width + 'px';
			var height = this.config.height + 'px';
			var left = (document.body.clientWidth / 2 - this.config.width / 2) + 'px';
			var top = ($(window).height() / 2 - this.config.height / 2) + 'px';
			$(document.body).append('<div id="pupop"></div>');
			var newDiv = $('#pupop').css({
				"position": "absolute",
				"z-index": "9999",
				"background-color": "white",
				"display": "none",
				"width": width,
				'height': height,
				"left": left,
				'top': top
			}).html(html);
			this._floater = newDiv;
		},
		_createCover: function() { //创建遮罩层
			var newMask = document.createElement("div");
			var maskStyle = newMask.style;
			newMask.id = 'login_cover';
			maskStyle.cssText = 'position: fixed;z-index: 9000;width:100%;background-color:#000;left:0px;top:0px;display:none; filter:alpha(opacity=50);opacity:0.5;';
			maskStyle.height = document.body.clientHeight + "px";
			document.body.appendChild(newMask);
			this._cover = newMask;
		},
		show: function(html) {
			var self=this;
			if (!this._cover) {
				this._createCover();
			}
			if (!this._floater) {
				this._createFloater(html);
			}
			$(this._floater).css('display', 'block');
			this._cover.style.display = 'block';
			this._bind();
			$('#login_close').on('click', function() {
				$(self._floater).remove();
				document.body.removeChild(self._cover);
				self._floater = null;
				self._cover = null;
			});
		},
		_bind: function() {
			var self=this;
			$('#reg_page').on('click', function() {
				$('.login_form').html('<span class="login_logo" ></span><div class="login_line"><p>使用手机号或邮箱注册</p></div><input id="reg_name" type="text" placeholder="输入手机号或者邮箱" /><input id="reg_pwd" type="password" placeholder="密码" /><input id="reg_pwdA" type="password" placeholder="再次确认密码" /><p class="login_check"><input id="login_check" type="checkBox" />同意加入我们协议</p><button>注册</button><p class="login_foot"><span id="login_page" class="login_register right" >登录到创森派</span><span class="right" style="color:#676767;">已有帐号？</span></p>');
			    self._bind();
 			});
			$('#login_page').on('click', function() {
				$('.login_form').html('<span class="login_logo" ></span><div class="login_line"><p>使用第三方帐号登录</p></div><ul class="other"><li><a  href=""></a></li><li><a  href=""></a></li><li><a href=""></a></li></ul><div class="login_line"><p>使用手机号/邮箱登录</p></div><input id="login_name" type="text" placeholder="输入手机号或者邮箱" /><input id="login_pwd" type="password" placeholder="密码" /><button>登录</button><p class="login_foot"><span class="forget_pwd left" >忘记密码&gt;&gt;</span><span id="reg_page" class="login_register right" >点击注册</span><span class="right" style="color:#676767;">还没有帐号？</span></p>');
			    self._bind(); 
			});
		}
	}
	return open;
})();
//翻页
function page(opt) {
	if (!opt.id) {
		return false
	};
	var obj = document.getElementById(opt.id);
	var nowNum = opt.nowNum || 1;
	var allNum = opt.allNum || 5;
	var callBack = opt.callBack || function() {};
	if (nowNum >= 4 && allNum >= 6) {
		var oA = document.createElement('a');
		oA.href = '#1';
		oA.innerHTML = '首页';
		obj.appendChild(oA);
	}
	if (nowNum >= 2) {
		var oA = document.createElement('a');
		oA.href = '#' + (nowNum - 1);
		oA.innerHTML = '上一页';
		obj.appendChild(oA);
	}
	if (allNum <= 5) {
		for (var i = 1; i <= allNum; i++) {
			var oA = document.createElement('a');
			oA.href = '#' + i;
			if (nowNum == i) {
				oA.innerHTML = i;
			} else {
				oA.innerHTML = i;
			}
			obj.appendChild(oA);
		}
	} else {
		for (var i = 1; i <= 5; i++) {
			var oA = document.createElement('a');
			if (nowNum == 1 || nowNum == 2) {
				oA.href = '#' + i;
				if (nowNum == i) {
					oA.innerHTML = i;
				} else {
					oA.innerHTML = i;
				}
			} else if ((allNum - nowNum) == 0 || (allNum - nowNum) == 1) {
				oA.href = '#' + (allNum - 5 + i);
				if ((allNum - nowNum) == 0 && i == 5) {
					oA.innerHTML = (allNum - 5 + i);
				} else if ((allNum - nowNum) == 1 && i == 4) {
					oA.innerHTML = (allNum - 5 + i);
				} else {
					oA.innerHTML = allNum - 5 + i;
				}
			} else {
				oA.href = '#' + (nowNum - 3 + i);

				if (i == 3) {
					oA.innerHTML = (nowNum - 3 + i);
				} else {
					oA.innerHTML = nowNum - 3 + i;
				}
			}
			obj.appendChild(oA);
		}
	}
	if ((allNum - nowNum) >= 1) {
		var oA = document.createElement('a');
		oA.href = '#' + (nowNum + 1);
		oA.innerHTML = '下一页';
		obj.appendChild(oA);
	}
	if ((allNum - nowNum) >= 3 && allNum >= 6) {
		var oA = document.createElement('a');
		oA.href = '#' + allNum;
		oA.innerHTML = '尾页';
		obj.appendChild(oA);
	}
	callBack(nowNum, allNum);
	var aA = obj.getElementsByTagName('a');
	for (var i = 0; i < aA.length; i++) {
		aA[i].onclick = function() {
			var nowNum = parseInt(this.getAttribute('href').substring(1));
			obj.innerHTML = '';
			page({
				id: opt.id,
				nowNum: nowNum,
				allNum: allNum,
				callBack: callBack
			});
			return false;
		};
	}
}

function scrollSide(flag) {
	var box = $(".box");
	var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
	var documentHeight = $(document).width();
	var scollHeight = $(window).scrollTop();
	if (flag) {
		return (lastBoxHeight < (scollHeight + documentHeight)) ? scollHeight + documentHeight : lastBoxHeight;
	} else {
		return box.last().get(0).offsetTop + Math.floor(box.last().height() / 2) + box.last().height();
	}
}

function imgLocation() {
	var box = $(".box");
	var boxWidth = box.eq(0).width();
	var num = Math.floor($(window).width() / boxWidth);
	var boxArr = [];
	box.each(function(index, value) {
		var boxHeight = box.eq(index).height();
		if (index < num) {
			boxArr[index] = boxHeight;
		} else {
			var minBoxHeight = Math.min.apply(null, boxArr);
			var minBoxIndex = $.inArray(minBoxHeight, boxArr);
			$(value).css({
				"position": "absolute",
				"top": minBoxHeight,
				"left": box.eq(minBoxIndex).position().left
			});
			boxArr[minBoxIndex] += box.eq(index).height();
		}
	});
}
$(document).ready(function() {
	$('#getTop').on('click', function(e) {
		document.body.scrollTop = 0;
	});
	var t = null;
	$('#login').on('click', function() {
		var html = '<span id="login_close"></span><div class="login_form"><span class="login_logo" ></span><div class="login_line"><p>使用第三方帐号登录</p></div><ul class="other"><li><a  href=""></a></li><li><a  href=""></a></li><li><a href=""></a></li></ul><div class="login_line"><p>使用手机号/邮箱登录</p></div><input id="login_name" type="text" placeholder="输入手机号或者邮箱" /><input id="login_pwd" type="password" placeholder="密码" /><button>登录</button><p class="login_foot"><span class="forget_pwd left" >忘记密码&gt;&gt;</span><span id="reg_page" class="login_register right" >点击注册</span><span class="right" style="color:#676767;">还没有帐号？</span></p></div>';
		t = new Popup().init({
			id: 'pupop', //弹出层的id
			width: 500,
			height: 420,
		}).show(html);
	});
});