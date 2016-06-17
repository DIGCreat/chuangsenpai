$(document).ready(function(){
		// Contact.send('get',url,{
//  				type: 'find_person'
//  			},function(val){
	
// });
	var val={success:0,data:[
		{
			id:1,
			name:'1',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:2,
			name:'2',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:3,
			name:'3',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:4,
			name:'4',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:5,
			name:'5',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:6,
			name:'6',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:7,
			name:'7',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:8,
			name:'8',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:9,
			name:'9',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:10,
			name:'10',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		},
		{
			id:11,
			name:'11',
			lable:'basai',
			img:'../image/myhead.jpg',
			des:'heloo'
		}
	]};
	if (val['success'] == 0) {
		var data=val['data'];
		for (var i = 0; i < 2; i++) {
			addLi(data[i]);
		}
		if (data.length > 2) {
			page({
				id: 'setNum',
				nowNum: 1,
				allNum: Math.ceil(data.length / 2),
				callBack: function(now, all) {
					$('#setNum a[href=#' + now + ']').css('background-color', '#24d4b8');
					document.getElementById('info_ul').innerHTML = '';
					for (var i = (now - 1) * 2; i < (now - 1) * 2 + 2; i++) {
						if (data[i]) {
							addLi(data[i]);
						}
					}
				}
			});
		}
	}
	$('.btn_search').on('click',function(){
		// ajax
	});
	// 设置hover事件
	$('.info_ul li').hover(function(){
         $(this).find('.show_btn').css('visibility','visible');
	},function(){
		 $('.show_btn').css('visibility','hidden');
	});
	$('.show_btn').hover(function(){
         $(this).css('visibility','visible');
	});
});
function addLi(data) {
	var ul=document.getElementById('info_ul');
	var str='<li id="'+data.id+'"><div class="show_btn"><div class="s_wrap"><button class="follow">关注</button><button class="invite">留言</button><button class="send_card">发送名片</button></div></div><div class="background"><img src="'+data.img+'" alt="user" /><p class="name">'+data.name+'</p><p class="career">'+data.lable+'</p></div><p class="introduce">'+data.des+'</p></li>';
	ul.innerHTML+=str;
}
