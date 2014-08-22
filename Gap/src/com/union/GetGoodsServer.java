package com.union;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GetGoodsServer extends HttpServlet{
	
	private void getGoodsInTheShop(HttpServletRequest request, 
            HttpServletResponse response, String method) throws UnsupportedEncodingException{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String customerName = request.getParameter("shopName");
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
