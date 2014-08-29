//var page1= $("#page1");
//$("#page1_content").height(page1.height()-210);

//document.addEventListener('touchmove', touchHandlerDummy, false);
//function touchHandlerDummy(e)  {
//    e.preventDefault();
//    return false;
//}

var storage = null;
var tel = null;
var name = null;
var localRole = null;

var shopNameToGoodsInfoMap = new Map();
//var goodArrayInShop = [];
//var nameToId = {};

var curSelectGood = null;

function isMobil(ss){
	var re= /^(13[0-9]{9})|(15[89][0-9]{8})$/;
	if(re.test(ss)){
		return true;
	}
	return false;
	
}

function getLocalStorage(){
	if(typeof window.localStorage == "object"){
		return window.localStorage;
	}else if(typeof window.globalStorage == "object"){
		return window.globalStorage[location.host];
	}else{
		throw new Error("Local storage not available.");
	}
}

function changeUserBar(name,tel){
	if(name && tel){
		$("#userBar").empty();
		var barInfo = "<label class='theUser'>"+name+"</label>";
		$("#userBar").append(barInfo);
		$("#userListview").listview("refresh");
	}else{
		$("#userBar").empty();
		var barInfo = "<a href='#login' data-transition='pop'>匿名用户</a><span class='ui-li-aside'>请登录</span>";
		$("#userBar").append(barInfo);
		$("#userListview").listview("refresh");
	}
	
}


$(document).on("pageinit","#moreInfo",function(){
	$("#setUpShop").on('tap',function(){$.mobile.changePage($("#businessRigister"))});
	$("#unLogin").on('tap',function(){
		
		if(storage){
			storage.removeItem('tel');
			storage.removeItem('name');
		}
		
		changeUserBar();
		$.mobile.changePage($("#pageSelfInfo"));
	});
	
});

function getItemInRecommand(event){
	
	var e = event || window.event;
	var item =  e.target || e.srcElement;
	return item.parentNode;
}

function getLIDom(dom){
	if(dom.tagName == 'LI'){
		return dom;
	}
	return getLIDom(dom.parentNode);
}

$(document).on("pageinit","#pageHome",function(){
	$(".goodPanel").tap(function(e){
		var item = getItemInRecommand(e);
		
		var name = $($(item).children()[1]).text();
		curSelectGood = name;
		$.mobile.changePage($("#buyGood"));		
	});
	
	$(".findTheList").tap(function(event){
		var e = event || window.event;
		var item =  e.target || e.srcElement;
		var liDom = getLIDom(item);
		
		var name = $($($(liDom).children()[0]).children()[1]).text();
		curSelectGood = name;
		$.mobile.changePage($("#buyGood"));

	});
	
});
$("#buyGood").on("pagebeforeshow",function(e){
	if(!curSelectGood){
		return;
	}
	var goodInfo = shopNameToGoodsInfoMap.get(curSelectGood);
	
	$("#theGoodName").text(goodInfo.name);
	$("#theGoodPic").css("background-image","url("+goodInfo.url+")");
	$("#theGoodPrice").text("￥"+goodInfo.price+"元");
	
	$("#theGoodDisp").text(goodInfo.discription);
	console.log('>>>>'+goodInfo);
});

$(document).on("pageinit","#buyGood",function(){
	
	
});

$(document).on("pageinit","#login",function(){
	$("#userLogin").tap(function(){
		var name = $("#costomerName").val();
		var tel = $("#costomerTel").val();
		if(!name){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入联系人");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!tel){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入手机号码");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!isMobil(tel)){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入正确的手机号码");
			$.mobile.changePage($("#alert"));
			return;
		}
		changeUserBar(name,tel);
		if(storage){
			storage.setItem("tel",tel);
			storage.setItem("name",name);
			
		}
		
		$.mobile.changePage($("#pageSelfInfo"));
	});
});

$(document).on("pageinit","#businessRigister",function(){
	$("#boss_register").tap(function(){
		var readTreaty = $("#treaty")[0].checked;
		var shop_name = $("#tradeName").val();
		var boss_name = $("#bossName").val();
		var boss_Tel = $("#bossTel").val();
		var password = $("#bossPassWord").val();
		var rep_password = $("#repPassName").val();
		
		if(!readTreaty){
			$("#alertMsg").empty();
			$("#alertMsg").text("请勾选已阅读开店条款");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!shop_name){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入您店铺的名称");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!boss_name){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入店主的名称");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!boss_Tel){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入店主的手机号码");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!password){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入您的密码");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!rep_password){
			$("#alertMsg").empty();
			$("#alertMsg").text("请再次输入您的密码");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(rep_password != password){
			$("#alertMsg").empty();
			$("#alertMsg").text("您2次输入的密码不同");
			$.mobile.changePage($("#alert"));
			return;
		}
		
		if(storage){
//			storage.setItem("tel",tel);
//			storage.setItem("name",name);
//			storage.setItem("localRole",true);
//			storage.setItem("password",password);
//			storage.setItem("shopName",shop_name);
		}
		$.ajax({
	        url: ' http://localhost:8080/Gap/ControlGoodsInfoServer',
			type : 'post',
			dataType : 'json',
			data : {
				"type":"create",
				"shopName" : shop_name,
				"BossName": boss_name,
				"BossTel": boss_Tel,
				"password": password
			},
			error : function() {
				console.log('Error occurs at server.');
			},

			success : function(data) {
				console.log("upload data sucess");
				$.mobile.changePage($("#uploadpage"));
			}
		});
		
		
		
		
	});
});


// 店主上传商品界面
$(document).on("pageinit","#uploadpage",function(){
	
	var imgSrc = null;	
	
	$("#scanPic")[0].onchange = function(){		
		imgSrc = null;		
		var file = $("#scanPic")[0];	
		
		if (file.files && file.files[0]){
			var reader = new FileReader();
			reader.onload = function(evt){
				imgSrc = evt.target.result;
				$("#upLoadPic").css("background-image","url("+evt.target.result+")");
			}  
			reader.readAsDataURL(file.files[0]);
		}
	}
	
	$("#uploadGood").tap(function(){
		var goodName = $("#uploadGoodName").val();
		var goodPrice = $("#uploadGoodPrice").val();
		var goodDisp = $("#uploadGoodDisp").val();
		
		if(!imgSrc){
			$("#alertMsg").empty();
			$("#alertMsg").text("请更新您的浏览器再上传图片");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!goodName){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入商品名");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!goodPrice){
			$("#alertMsg").empty();
			$("#alertMsg").text("请输入商品价格");
			$.mobile.changePage($("#alert"));
			return;
		}
		if(!goodDisp){
			$("#alertMsg").empty();
			$("#alertMsg").text("请简单描述下商品");
			$.mobile.changePage($("#alert"));
			return;
		}
		
		$.ajax({
	        url: ' http://localhost:8080/Gap/GetGoodsServer',
			type : 'post',
			dataType : 'json',
			data : {
				"type":"create",
				"goodUrl" : imgSrc,
				"goodName": goodName,
				"goodPrice": goodPrice,
				"goodDisp": goodDisp
			},
			error : function() {
				console.log('Error occurs at server.');
			},

			success : function(data) {
				console.log("upload data sucess");
			}
		});
	});
});




$(document).ready(function(){
	storage = getLocalStorage();
	tel = storage.getItem("tel");
	name =storage.getItem("name");
	role = storage.getItem("role");	

	if(tel && name){
		changeUserBar(name,tel);
	}
	
	
	$.ajax({
        url: ' http://localhost:8080/Gap/GetGoodsServer',
		type : 'post',
		dataType : 'json',
		data : {
			"shopName" : "firstShop"
		},
		error : function() {
			console.log('Error occurs at server.');
		},

		success : function(data) {
//			goodArrayInShop = data;
			updataFrontPage(data);
		}
	});
	
});

function updataFrontPage(data) {
	if(!data || data.length <= 0){
		return;
	}
	for(var i = 0; i<data.length; i++){
		
		var name = data[i].name
//		nameToId.name = data[i].id;
		shopNameToGoodsInfoMap.put(name,data[i]);
		
		switch(data[i].recommend){
		case 1:
			$($("#good1").children()[0]).attr("src",data[i].url);
			$($("#good1").children()[1]).text(name);
			break;
		case 2:
			$($("#good2").children()[0]).attr("src",data[i].url);
			$($("#good2").children()[1]).text(name);
			break;
		case 3:
			$($("#good3").children()[0]).attr("src",data[i].url);
			$($("#good3").children()[1]).text(name);
			break;
		case 4:
			$($("#good4").children()[0]).attr("src",data[i].url);
			$($("#good4").children()[1]).text(name);
			break;
		case 5:
			$($("#good5").children()[0]).attr("src",data[i].url);
			$($("#good5").children()[1]).text(name);
			break;
		case 6:
			$($("#good6").children()[0]).attr("src",data[i].url);
			$($("#good6").children()[1]).text(name);
			break;
		case -1:
			var goodInfo ="<li id= '"+data[i].id+"'><a data-transition='pop'><img src='"+data[i].url+"'></img><span class='goodPanelInlist'>"+name+"</span></a></li>";
			$("#goodListCls1").append(goodInfo);
			$("#goodListCls1").listview("refresh");
			break;
		case -2:
			var goodInfo ="<li id= '"+data[i].id+"'><a data-transition='pop'><img src='"+data[i].url+"'></img><span class='goodPanelInlist'>"+name+"</span></a></li>";
			$("#goodListCls2").append(goodInfo);
			$("#goodListCls2").listview("refresh");
			break;
		case -3:
			var goodInfo ="<li id= '"+data[i].id+"'><a data-transition='pop'><img src='"+data[i].url+"'></img><span class='goodPanelInlist'>"+name+"</span></a></li>";
			$("#goodListCls3").append(goodInfo);
			$("#goodListCls3").listview("refresh");
			break;
		default:
			break;
		}
	}
}




