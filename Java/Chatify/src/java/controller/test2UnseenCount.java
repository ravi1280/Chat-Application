///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
// */
//package controller;
//
//import com.google.gson.Gson;
//import com.google.gson.JsonArray;
//import com.google.gson.JsonObject;
//import entity.Chat;
//import entity.User;
//import entity.User_Status;
//import java.io.File;
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.text.SimpleDateFormat;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import model.HibernateUtil;
//import org.hibernate.Criteria;
//import org.hibernate.Hibernate;
//import org.hibernate.Session;
//import org.hibernate.criterion.Order;
//import org.hibernate.criterion.Projection;
//import org.hibernate.criterion.Projections;
//import org.hibernate.criterion.Restrictions;
//import java.time.LocalDate;
//import java.time.ZonedDateTime;
//import java.time.format.DateTimeFormatter;
//import java.text.SimpleDateFormat;
//
///**
// *
// * @author SnowFlake
// */
//@WebServlet(name = "LodeHomeData", urlPatterns = {"/LodeHomeData"})
//public class LodeHomeData extends HttpServlet {
//
//    @Override
//    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//
//        String userId = request.getParameter("id");
//
//        Gson gson = new Gson();
//
//        JsonObject responseObj = new JsonObject();
//        responseObj.addProperty("Success", false);
//        responseObj.addProperty("message", "Request Unable !");
//
//        Session session = HibernateUtil.getSessionFactory().openSession();
//
//        User user = (User) session.get(User.class, Integer.parseInt(userId));
//
//        User_Status userStatus = (User_Status) session.get(User_Status.class, 1);
//        user.setUser_status_id(userStatus);
//
//        session.update(user);
//
//        Set<User> userList = new HashSet<>();
//        userList.addAll(getDistinctUserList("to_user_id", "from_user_id", session, user));
//        userList.addAll(getDistinctUserList("from_user_id", "to_user_id", session, user));
//
//        JsonArray jsonChatArray = new JsonArray();
//
//        for (User userItem : userList) {
//            Criteria chatList = session.createCriteria(Chat.class);
//            chatList.add(Restrictions.or(
//                    Restrictions.and(Restrictions.eq("from_user_id", userItem), Restrictions.eq("to_user_id", user)),
//                    Restrictions.and(Restrictions.eq("from_user_id", user), Restrictions.eq("to_user_id", userItem))));
//
//            chatList.addOrder(Order.desc(
//                    "date_time"));
//            chatList.setMaxResults(1);
//
//            JsonObject ChatItem = new JsonObject();
//            ChatItem.addProperty("Other_user_id", userItem.getId());
//            ChatItem.addProperty("Other_user_Mobile", userItem.getMobile());
//            ChatItem.addProperty("Other_user_name", userItem.getF_name() + " " + userItem.getL_name());
//            ChatItem.addProperty("Other_user_ststus", userItem.getUser_status_id().getId());
//
//            //check avetar image 
//            String serverPath = request.getServletContext().getRealPath("");
//            String otherUserAvaterImagePath = serverPath + File.separator + "AvatarImage" + File.separator + userItem.getMobile() + ".png";
////            System.out.println(otherUserAvaterImagePath);
//            File otherUserAvatarImageFile = new File(otherUserAvaterImagePath);
//
//            if (otherUserAvatarImageFile.exists()) {
//                // avatar image found  
//                ChatItem.addProperty("avatar_image_Found", true);
//            } else {
//                // avetar image not found 
//                ChatItem.addProperty("avatar_image_Found", false);
//                ChatItem.addProperty("other_user_avatar_leters", userItem.getF_name().charAt(0) + "" + userItem.getL_name().charAt(0));
//            }
//
//            List<Chat> dbChatList = chatList.list();
//            System.out.println(dbChatList.get(0).getMassage());
//            // Assuming dbChatList.get(0).getDate_time() returns a Date object
//            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
//            SimpleDateFormat datetimeFormat = new SimpleDateFormat(" hh:mm  a");
//
//            // Get current date and time in Sri Lanka
//            ZonedDateTime sriLankaTime = ZonedDateTime.now(java.time.ZoneId.of("Asia/Colombo"));
//
//            // Format the date to match "dd-MM-yyyy"
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
//            String formattedDate = sriLankaTime.format(formatter);
//
//            // Assuming dbChatList.get(0).getDate_time() returns a Date object
//            String dbFormattedDate = dateFormat.format(dbChatList.get(0).getDate_time());
//
//            System.out.println("DB Formatted Date: " + dbFormattedDate);
//            System.out.println("Current Formatted Date: " + formattedDate);
//
//            // Compare the formatted dates using equals()
//            if (dbFormattedDate.equals(formattedDate)) {
//                ChatItem.addProperty("dateTime", datetimeFormat.format(dbChatList.get(0).getDate_time()));
//            } else {
//                ChatItem.addProperty("dateTime", dbFormattedDate);
//
//            }
//            ChatItem.addProperty("message", dbChatList.get(0).getMassage());
//            ChatItem.addProperty("chat_status_id", dbChatList.get(0).getChat_status_id().getId());   // 1= seen , 2= unseen 
//
//            Criteria chatList2 = session.createCriteria(Chat.class);
//            chatList2.add(Restrictions.eq("to_user_id", user));
//            chatList2.add(Restrictions.eq("from_user_id", userItem));
//            chatList2.add(Restrictions.ne("chat_status_id.id", 1)); // Not equal to 1
//
//            chatList2.setProjection(Projections.rowCount());
//            Long count = (Long) chatList2.uniqueResult();
//
//            ChatItem.addProperty("unSeenMasaageCount", count);
//
//            jsonChatArray.add(ChatItem);
//
//        }
//
//        responseObj.addProperty("Success", true);
//        responseObj.addProperty("message", "success");
//        responseObj.add("jsonChatArray", gson.toJsonTree(jsonChatArray));
//
//        session.beginTransaction().commit();
//        session.close();
//        response.setContentType("application/json");
//        response.getWriter().write(gson.toJson(responseObj));
//
//    }
//
//    public List<User> getDistinctUserList(String col1, String col2, Session session, User user) {
//        Criteria chatList = session.createCriteria(Chat.class);
//        chatList.add(Restrictions.eq(col1, user));
//        chatList.setProjection(Projections.distinct(Projections.property(col2)));
//        List<User> list = (List<User>) chatList.list();
//        return list;
//    }
//
//}