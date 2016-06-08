 var animateBlock = {
     isVisiable: function(el, wh, st, delta) {
         delta = delta || 160;
         //console.log($(el).offset().top,wh,st,delta)
         return $(el).offset().top < wh + st - delta;
     },
     animations: {
         character: function(wh, st) {
             var $el = $("#characters");
             if (animateBlock.isVisiable($el, wh, st)) {
                 // $el.find(".char-icon1").animate({
                 //     top: 50,
                 //     opacity: 1
                 // }, 333);
                 // $el.find(".char-icon2").delay(200).animate({
                 //     top: 50,
                 //     opacity: 1
                 // }, 533);
                 // $el.find(".char-icon3").delay(400).animate({
                 //     top: 50,
                 //     opacity: 1
                 // }, 733);

                 delete animateBlock.animations.character;
             }
         },
         part1: function(wh, st) {
             var $el = $("#part1");
             if (animateBlock.isVisiable($el, wh, st)) {
                 //console.log("trigger intro1 animate");
                 // $el.find(".intro1-video").animate({
                 //     "bottom": 0,
                 //     opacity: 1
                 // }, 500);
                 delete animateBlock.animations.intro1;
             }
         },
         part2: function(wh, st) {
             var $el = $("#part2");
             // if (animateBlock.isVisiable($el, wh, st)) {
             //     //console.log("trigger intro2 animate");
             //     $el.find(".intro2-computer1").animate({
             //         "top": -30,
             //         opacity: 1
             //     }, 500);
             //     delete animateBlock.animations.intro2;
             // }
         },
         part3: function(wh, st) {
             var $el = $("#part3");
             if (animateBlock.isVisiable($el, wh, st)) {
                 //console.log("trigger intro3 animate");
                 $el.find(".intro3-calendar").animate({
                     "top": -31,
                     opacity: 1
                 }, 333);
                 delete animateBlock.animations.intro3;
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