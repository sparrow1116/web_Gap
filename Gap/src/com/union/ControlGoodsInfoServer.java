package com.union;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ControlGoodsInfoServer extends HttpServlet{


	private void createNewShop(HttpServletRequest request) throws UnsupportedEncodingException {
		request.setCharacterEncoding("utf-8");
		
	/*	"shopName" : shop_name,
		"BossName": boss_name,
		"BossTel": boss_Tel,
		"password": password*/
		
		//create a sheet in DB for the new shop.
		String shopName = request.getParameter("shopName");
		
		ShopDataConnect conn = new ShopDataConnect();
		conn.createSheepforShop(shopName);
		
		//add the new merchant info in the sheet of DB
//		conn.
		
		
	}
	
	
	private void getUploadInfo(HttpServletRequest request,
			HttpServletResponse response, String string) throws UnsupportedEncodingException {
		response.setContentType("text/xml");
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String controlType = request.getParameter("type");
		
		switch(controlType){
			case "create":
				createNewShop(request);
				break;
			case "upload":
				break;
			case "edit":
				break;
			default:
				break;
		}

	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
			getUploadInfo(req,resp,"Get");
	}
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
			getUploadInfo(req,resp,"post");
	}

}
