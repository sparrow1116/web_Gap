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

function getItem(event){
	
	var e = event || window.event;
	var item =  e.target || e.srcElement;
	return item.parentNode;
}


$(document).on("pageinit","#pageHome",function(){
	$(".goodPanel").tap(function(e){
		var item = getItem(e);
		$.mobile.changePage($("#buyGood"));		
	});
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
		$.mobile.changePage($("#uploadpage"));
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
        url: 'GetGoodsServer',
		type : 'post',
		dataType : 'json',
		data : {
			"shopName" : "一号店"
		},
		error : function() {
			console.log('Error occurs at server.');
		},

		success : function(data) {
			
			if (data.Result == 'OK') {
				alert("Log Success");
				location.href = '/report/reports.jsp'; 				
			} else if (data.Message) {
				alert(data.Message);
			} else {
				alert("Log Fails");
			}
		}
	});
	
});




