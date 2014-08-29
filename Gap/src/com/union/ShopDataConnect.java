package com.union;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import net.sf.json.JSON;

import com.union.GoodsBean;

public class ShopDataConnect {
	 private String URL="jdbc:mysql://localhost/goodsinshops";
     private String USER="root";
     private String PWD="Jiu12345";
      
      
     private Connection conn = null;
     private Statement st = null;
     private PreparedStatement pt = null;
     
     private void connectToDataBase() {
 		try{
 			Class.forName("com.mysql.jdbc.Driver").newInstance();
 			conn = DriverManager.getConnection(URL,USER, PWD);
 			st = conn.createStatement();
// 			pt = conn.prepareStatement("insert into customerinfo values(?,?,?,?,?)");
 			
 		}catch(Exception ex){
 			System.out.println("Error : " + ex.toString());
 		}
 	}
     
     
     public void createSheepforShop(String shopName){
    	 try {
    		 this.connectToDataBase();
    		 st.executeUpdate( "create table "+shopName +
			         "(id int, " +
			         "name varchar(50), " +
			         "price varchar(20)," +
			         "discription varchar(1000)," +
			         "available int," +
			         "recommend int," +
			         "url varchar(1000)");
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			this.close();
		}
    	
     }
     
     public void insertInfoToDB(String DBName,JSON obj){
    	 if(DBName == "userinfo"){
    		 try {
				pt = conn.prepareStatement("insert into customerinfo values(?,?,?,?,?,?,?,?,?)");
				for(int i = 0; i<obj.size();i++){
//					obj.
				}
				
			} catch (SQLException e) {
				e.printStackTrace();
			}
    	 }else{
    		 
    	 }
     }
     
     public ArrayList<GoodsBean> getGoodsInfoFromShop(String shopName){
    	 
    	 	ArrayList<GoodsBean> goodList = new ArrayList();
    	 
    	 	this.connectToDataBase();
    	 	String sql = "select * from " + shopName;
    	 	ResultSet rs=null;
			try {
				rs = st .executeQuery(sql);
			        
	    	 	while(rs.next()){
	    	 		GoodsBean goodInfo = new GoodsBean();
	    	 		goodInfo.setId(rs.getInt("id"));
	    	 		goodInfo.setName(rs.getString("name"));
	    	 		goodInfo.setPrice(rs.getString("price"));
	    	 		goodInfo.setUrl(rs.getString("url"));
	    	 		goodInfo.setDiscription(rs.getString("discription"));
	    	 		goodInfo.setAvailable(rs.getInt("available"));
	    	 		goodInfo.setRecommend(rs.getInt("recommend"));
	    	 		
	    	 		goodList.add(goodInfo);
	           }
	    	 	return goodList;
			} catch (SQLException e) {
				e.printStackTrace();
			}finally{
				this.close();
			}
			return goodList;
     }
     
     private void close(){
    	 try{
 			if(st != null){
 				st.close();
 			}
 			
 			if(pt != null){
 				pt.close();
 			}
 			
 			if(conn != null){
 				conn.close();
 			}
 		}catch(Exception e){
 			e.printStackTrace();
 		}
     }

}
