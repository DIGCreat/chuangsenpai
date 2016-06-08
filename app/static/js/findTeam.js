$(document).ready(function(){
	window.Data;
	$.getJSON($SCRIPT_ROOT + '/find/data', {flag: 'team'}, function(d) {
		console.log(d);
		window.Data=d.data;
	});
	var data = window.Data;
	console.log(data);
	for(var i=0;i<2;i++){
		addLi(data[i]);
	}
	if(data.length>2){
		page({
			id : 'setNum',
			nowNum : 1,
			allNum : Math.ceil(data.length/2),
			callBack : function(now,all){
				$('#setNum a[href=#'+now+']').css('background-color','#24d4b8');
				document.getElementById('info_ul').innerHTML='';
				for(var i=(now-1)*2;i<(now-1)*2+2;i++){
					if(data[i]){
						addLi(data[i]);
					}
				}
			}
		});
	}
	$('#getTop').on('click',function(e){
		document.body.scrollTop=0;
	});
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
	var str='<li id="'+data.id+'"><div class="show_btn"><div class="s_wrap"><button class="follow">关注</button><button class="invite">留言</button><button class="send_card">发送名片</button></div></div><div class="background"><img src="'+data.img+'" alt="user" /><p class="name">'+data.name+'</p><p class="career">'+data.lable+'</p></div><p class="introduce">'+data.descript+'</p></li>';
	ul.innerHTML+=str;
}
//翻页
function page(opt){
	if(!opt.id){return false};
	var obj = document.getElementById(opt.id);
	var nowNum = opt.nowNum || 1;
	var allNum = opt.allNum || 5;
	var callBack = opt.callBack || function(){};
	if( nowNum>=4 && allNum>=6 ){
		var oA = document.createElement('a');
		oA.href = '#1';
		oA.innerHTML = '首页';
		obj.appendChild(oA);
	}
	if(nowNum>=2){
		var oA = document.createElement('a');
		oA.href = '#' + (nowNum - 1);
		oA.innerHTML = '上一页';
		obj.appendChild(oA);
	}
	if(allNum<=5){
		for(var i=1;i<=allNum;i++){
			var oA = document.createElement('a');
			oA.href = '#' + i;
			if(nowNum == i){
				oA.innerHTML = i;
			}
			else{
				oA.innerHTML =i;
			}
			obj.appendChild(oA);
		}	
	}
	else{
		for(var i=1;i<=5;i++){
			var oA = document.createElement('a');
			if(nowNum == 1 || nowNum == 2){
				oA.href = '#' + i;
				if(nowNum == i){
					oA.innerHTML = i;
				}
				else{
					oA.innerHTML = i ;
				}
			}
			else if( (allNum - nowNum) == 0 || (allNum - nowNum) == 1 ){
				oA.href = '#' + (allNum - 5 + i);
				if((allNum - nowNum) == 0 && i==5){
					oA.innerHTML = (allNum - 5 + i);
				}
				else if((allNum - nowNum) == 1 && i==4){
					oA.innerHTML = (allNum - 5 + i);
				}
				else{
					oA.innerHTML =allNum - 5 + i;
				}
			}
			else{
				oA.href = '#' + (nowNum - 3 + i);
				
				if(i==3){
					oA.innerHTML = (nowNum - 3 + i);
				}
				else{
					oA.innerHTML = nowNum - 3 + i;
				}
			}
			obj.appendChild(oA);
		}
	}
	if( (allNum - nowNum) >= 1 ){
		var oA = document.createElement('a');
		oA.href = '#' + (nowNum + 1);
		oA.innerHTML = '下一页';
		obj.appendChild(oA);
	}
	if( (allNum - nowNum) >= 3 && allNum>=6 ){
		var oA = document.createElement('a');
		oA.href = '#' + allNum;
		oA.innerHTML = '尾页';
		obj.appendChild(oA);
	}
	callBack(nowNum,allNum);
	var aA = obj.getElementsByTagName('a');
	for(var i=0;i<aA.length;i++){
		aA[i].onclick = function(){
			var nowNum = parseInt(this.getAttribute('href').substring(1));
			obj.innerHTML = '';
			page({
				id : opt.id,
				nowNum : nowNum,
				allNum : allNum,
				callBack : callBack
			});
			return false;
		};
	}
}
