$(document).ready(function(){
    $(window).on("load",function(){
        var val={success:0,data:[
            {
                id:1,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                agree_num:'10',
                jion_num:'5',
                comment_num:'20'
            },
            {
                id:2,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                img:'../image/myhead.jpg',
                agree_num:'20',
                jion_num:'5',
                comment_num:'30'
            },
            {
                id:3,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                agree_num:'10',
                jion_num:'5',
                comment_num:'20'
            },
            {
                id:4,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                img:'../image/myhead.jpg',
                agree_num:'10',
                jion_num:'5',
                comment_num:'20'
            },
            {
                id:5,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                agree_num:'10',
                jion_num:'5',
                comment_num:'20'
            },
            {
                id:6,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                agree_num:'10',
                jion_num:'5',
                comment_num:'20'
            },
            {
                id:7,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                agree_num:'10',
                jion_num:'5',
                comment_num:'20'
            },
            {
                id:8,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                agree_num:'10',
                jion_num:'5',
                comment_num:'20'
            },
            {
                id:9,
                title:'title',
                time:'2016-05-30',
                place:'cqupt',
                agree_num:'10',
                jion_num:'5',
                comment_num:'20'
            }
        ]};
        if(val['success']==0){
            for(var i=0;i<val['data'].length;i++){
                addContent(val['data'][i]);
            }
        }
        imgLocation();
        $(".list").css('height',scrollSide(false)+'px');
    });
});
function addContent(data){
    var str='';
    var ul=document.getElementById('list');
    if(data.img){
       str='<div class="box" ><div class="content"><div class="c_img"><img src="../image/myhead.jpg" alt="" /><div class="float"><h3>'+data.title+'</h3><span class="jion_num">'+data.jion_num+'</span><span class="jion_p">人数:</span></div></div><p>时间：'+data.time+'</p><p>地点：'+data.place+'</p><span class="s_agree"></span><span class="agree_num">'+data.agree_num+'</span><span class="comment"></span><span class="comment_num">'+data.comment_num+'</span><span class="share"></span></div></div>'; 
       ul.innerHTML+=str;
    }else{
       str='<div class="box" id="'+data.id+'" ><div class="content"><h3>'+data.title+'</h3><span class="jion_num">'+data.jion_num+'</span><span class="jion_p">人数:</span><hr /><p>时间：'+data.time+'</p><p>地点：'+data.place+'</p><span class="s_agree"></span><span class="agree_num">'+data.agree_num+'</span><span class="comment"></span><span class="comment_num">'+data.agree_num+'</span><span class="share"></span></div></div>';
       ul.innerHTML+=str;
    }
}



 