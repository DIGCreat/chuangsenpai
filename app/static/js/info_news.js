$(document).ready(function(){
    $(window).on("load",function(){
        var data=[
            {
                id:1,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，2009年底他当选了欧洲足球先生和世界足球先生',
                agree_num:'10',
                comment_num:'20'
            },
            {
                id:2,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，他当选了欧洲足球先生和世界足球先生',
                img:"{{ url_for('static', filename='./image/myhead.jpg') }}",
                agree_num:'20',
                comment_num:'30'
            },
            {
                id:3,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，他当选了欧洲足球先生和世界足球先生',
                agree_num:'10',
                comment_num:'20'
            },
            {
                id:4,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根金牌。2009年底，他当选了欧洲足球先生和世界足球先生',
                img:"{{ url_for('static', filename='./image/myhead.jpg') }}",
                agree_num:'10',
                comment_num:'20'
            },
            {
                id:5,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，他当选了欧洲足球先生和世界足球先生梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，他当选了欧洲足球先生和世界足球先生',
                agree_num:'10',
                comment_num:'20'
            },
            {
                id:6,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，他当选了欧洲足球先生和世界足球先生',
                agree_num:'10',
                comment_num:'20'
            },
            {
                id:7,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，他当选了欧洲足球先生和世界足球先生',
                agree_num:'10',
                comment_num:'20'
            },
            {
                id:8,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，他当选了欧洲足球先生和世界足球先生',
                agree_num:'10',
                comment_num:'20'
            },
            {
                id:9,
                title:'title',
                content:'梅西加入巴塞罗那俱乐部。2005年，阿根廷青年队夺取世青赛冠军，梅西赢得了金球奖和金靴奖双项大奖。2007年4月18日，梅西在国王杯半决赛对赫塔菲时复制了马拉多纳在世界杯上的连过五人进球。2008年北京奥运会上，梅西随阿根廷国奥队夺取了金牌。2009年底，他当选了欧洲足球先生和世界足球先生',
                agree_num:'10',
                comment_num:'20'
            }
        ];
        for(var i=0;i<data.length;i++){
            addContent(data[i]);
        }
        imgLocation();
        $(".list").css('height',scrollSide(false)+'px');
    });
});
function addContent(data){
    var str='';
    var ul=document.getElementById('list');
    if(data.img){
       str='<div class="box" id="'+data.id+'"><div class="content"><div class="c_img"><img src="'+data.img+'" alt="" /><div class="float"><h3>'+data.title+'</h3></div></div><p>'+data.content+'</p><span class="s_agree"></span><span class="agree_num">'+data.agree_num+'</span><span class="comment"></span><span class="comment_num">'+data.comment_num+'</span><span class="share"></span></div></div>'; 
       ul.innerHTML+=str;
    }else{
       str='<div class="box" id="'+data.id+'" ><div class="content"><h3>'+data.title+'</h3><hr /><p>'+data.content+'</p><span class="s_agree"></span><span class="agree_num">'+data.agree_num+'</span><span class="comment"></span><span class="comment_num">'+data.comment_num+'</span><span class="share"></span></div></div>';
       ul.innerHTML+=str;
    }
}
function scrollSide(flag){
    var box=$(".box");
    var lastBoxHeight=box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
    var documentHeight=$(document).width();
    var scollHeight=$(window).scrollTop();
    if(flag){
         return (lastBoxHeight<(scollHeight+documentHeight))?scollHeight+documentHeight:lastBoxHeight;
    }else{
        return box.last().get(0).offsetTop+Math.floor(box.last().height()/2)+box.last().height();
    }
}
function imgLocation(){
    var box=$(".box");
    var boxWidth=box.eq(0).width();
    var num=Math.floor($(window).width()/boxWidth);
    var boxArr=[];
    box.each(function(index,value){
        var boxHeight=box.eq(index).height();
        if(index<num){
            boxArr[index]=boxHeight;
        }else{
            var minBoxHeight=Math.min.apply(null,boxArr);
            var minBoxIndex= $.inArray(minBoxHeight,boxArr);
            $(value).css({
                "position":"absolute",
                "top":minBoxHeight,
                "left":box.eq(minBoxIndex).position().left
            });
            boxArr[minBoxIndex]+=box.eq(index).height();
        }
    });
}
