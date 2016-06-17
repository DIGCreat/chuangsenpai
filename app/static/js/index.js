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
				$('#banner_img li').css('width',$('#banner').width()+'px');
			}, function() {
				$('#banner_img li').css('width',$('#banner').width()+'px');
				t = setInterval(function() {
					self.i++;
					self.move();
				}, self.delay);
			});
			window.resize=function(){
                $('#banner_img li').css('width',$('#banner').width()+'px');
                this.width=$('#banner').width();
            }
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
var animateBlock = {
     isVisiable: function(el, wh, st, delta) {
         delta = delta || 660;
         return document.getElementById(el).offsetTop < wh + st - delta;
     },
     animations: {
         part1: function(wh, st) {
             var $el = $("#part1");
             if (animateBlock.isVisiable("part1", wh, st)) {
                $el.find('#part1_hand').animate({
                    'opacity':1
                    },333
                );
                $el.find('#part1_find').delay(300).animate({
                    'opacity':1
                    },333
                );
                $el.find('#part1_big').delay(777).animate({
                    'opacity':1
                    },333
                );
                 delete animateBlock.animations.part1;
             }
         },
         part2: function(wh, st) {
             var $el = $("#part2");
             if (animateBlock.isVisiable("part2", wh, st)) {
                $el.find('#part2_start1').animate({
                    'opacity':1
                    },333
                );
                $el.find('#part2_start2').delay(300).animate({
                    'width':'56px'
                    },333
                );
                $el.find('#part2_start3').delay(777).animate({
                    'width':'40px'
                    },333
                );
                $el.find('#part2_find').delay(999).animate({
                    'left':'50%'
                    },333
                );
                $el.find('#part2_person').delay(1200).animate({
                    'left':'40%'
                    },333, function(){
                        $el.find('#part2_person').stop().animate({
                          'left':'30%'
                        },999);
                    }
                );
                 delete animateBlock.animations.part2;
             }
         },
         part3: function(wh, st) {
             var $el = $("#part3");
             if (animateBlock.isVisiable("part3", wh, st)) {
                 $el.find('#part3_clock').animate({
                    'opacity':1
                    },333
                );
                $el.find('#part3_page').delay(300).animate({
                    'top':'0px'
                    },333
                );
                 $el.find('#part3_new').delay(480).animate({
                    'top':'-110px',
                    'width':'225px',
                    'height':'210px'
                    },333
                );
                  $el.find('#part3_good').delay(600).animate({
                    'top':'-190px',
                    'width':'115px',
                    'height':'310px'
                    },333
                );
                   $el.find('#part3_bisai').delay(750).animate({
                    'top':'-190px',
                    'width':'104px',
                    'height':'348px'
                    },333
                );
                $el.find('#part3_zhaoxin').delay(900).animate({
                    'top':'-120px',
                    'width':'230px',
                    'height':'267px'
                    },333
                );
                 delete animateBlock.animations.part3;
             }
         },
        part4: function(wh, st) {
             var $el = $("#part4");
             if (animateBlock.isVisiable("part4", wh, st)) {
                $el.find('#part4_qcode').animate({
                    'left':'50%'
                    },333
                );
                $el.find('#part4_ad').delay(300).animate({
                    'left':'270px'
                    },333,function(){
                        $el.find('#part4_ad').delay(500).stop().animate({
                         'left':'240px'},633);
                    }
                );
                $el.find('#part4_ios').delay(500).animate({
                   'left':'70px'
                    },333,function(){
                        $el.find('#part4_ios').stop().animate({
                         'left':'0px'},333);
                    }
                );
                $el.find('#part4_phone').delay(700).animate({
                   'bottom':'5px'
                    },333,'swing',function(){
                        $el.find('#part4_phone').delay(200).stop().animate({
                        'bottom':'25px'},888);
                    }
                );
                 $el.find('.part4_img').delay(1299).animate({
                   'opacity':1
                    },333
                );
                 delete animateBlock.animations.part4;
             }
         }
     }
 }

 $(window).on("scroll", function() {
     var animations,
         name,
         winHeight = $(window).height(),
         scrollTop = $(window).scrollTop();
    animations = animateBlock.animations;
    for (name in animations) {
        animations[name](winHeight, scrollTop);
     }
 });
if ($(window).height() > 500) {
     $(window).trigger("scroll");
}
// Contact.send('get',url,{
//  				id: 1814906,
//  				appid: 'b1b15e88fa797225412429c1c50c122a'
//  			},d);
