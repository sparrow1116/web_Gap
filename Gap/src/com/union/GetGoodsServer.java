package com.union;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

public class GetGoodsServer extends HttpServlet{
	
	private void getGoodsInTheShop(HttpServletRequest request, 
            HttpServletResponse response, String method) throws UnsupportedEncodingException{
		
		response.setContentType("text/xml");
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String customerName = request.getParameter("shopName");
		
		ShopDataConnect shopDataC = new ShopDataConnect();
		ArrayList<GoodsBean> goodsInfoList = shopDataC.getGoodsInfoFromShop(customerName);
		
		 JSONArray jsArr = JSONArray.fromObject(goodsInfoList);
		
		 PrintWriter out= null;
		try {
			out = response.getWriter();
			out.println(jsArr.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			out.close();
		}		
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		getGoodsInTheShop(req, resp,"Get");
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		getGoodsInTheShop(req, resp,"post");
	}

}
