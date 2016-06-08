var bannerPop = (function() {
	function zBase() {}
	zBase.prototype = {
		constructor: zBase,
		$id: function(id) {
			return document.getElementById(id);
		},
		init: function(config) {
			this.width = config.width;
			this.delay=config.delay;
			this.i = 0;
			var clone = $(".banner .img li").first().clone();
			$(".banner .img").append(clone);
			this.size = config.bannerImg.children('li').length;
			for (var j = 0; j < this.size - 1; j++) {
				this.$id('banner_num').innerHTML += '<li></li>';
			}
			$(".banner .num li").first().addClass("on");
			this.play();
		},
		play: function() {
			var self = this;
			$(".banner .num li").hover(function() {
				var index = $(this).index();
				self.i = index;
				$(".banner .img").off().animate({
					left: -self.width * self.i
				}, 500);
				$(this).addClass("on").siblings().removeClass("on");
			})
			var t = setInterval(function() {
				self.i++;
				self.move();
			}, self.delay);
			$(".banner").hover(function() {
				clearInterval(t);
			}, function() {
				t = setInterval(function() {
					self.i++;
					self.move();
				}, self.delay);
			});
			$("#banner_rig").click(function() {
				self.i++;
				self.move();
			})
			$("#banner_lef").click(function() {
				self.i--;
				self.move();
			})
		},
		move: function() {
			var style = this.$id('banner_img').style;
			var self = this;
			if (self.i == -1) {
				style.left = -(this.size - 1) * this.width;
				self.i = this.size - 2;
			}
			if (self.i == this.size) {
				style.left = 0;
				self.i = 1;
			}
			$(".banner .img").stop().animate({
				left: -self.width * self.i
			}, 1000, 'swing');
			if (self.i == this.size - 1) {
				$(".banner .num li").eq(0).addClass("on").siblings().removeClass("on");
			} else {
				$(".banner .num li").eq(self.i).addClass("on").siblings().removeClass("on");
			}
		}
	}
	return zBase;
})();
$(document).ready(function() {
	$('#banner').css('width',+$(document.body).width()+'px');
    $('#banner_img li').css('width',$('#banner').width()+'px');
    var p = new bannerPop().init({
	    bannerImg: $('#banner_img'),
	    width: $('.banner').width(),
	    delay:5000
    });
});
