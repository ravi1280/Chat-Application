package controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.User;
import entity.UserStatus;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "UserHomeLoad", urlPatterns = {"/UserHomeLoad"})
public class UserHomeLoad extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject responseJsonObject = new JsonObject();
        responseJsonObject.addProperty("success", false);
        responseJsonObject.addProperty("message", "Request Unable !");

        //get id from request
        String id = request.getParameter("id");

        // create Session
        Session session = HibernateUtil.getSessionFactory().openSession();

        //get User Object 
        User user = (User) session.get(User.class, Integer.parseInt(id));

        //Update User online(online =1)
        UserStatus userStatus = (UserStatus) session.get(UserStatus.class, 1);
        user.setUserSatus(userStatus);
        session.update(user);

        //get OtherUsers
        Set<User> userList = new HashSet<>();

        userList.addAll(getDistinctUserList("to_user", "from_user", session, user));
        userList.addAll(getDistinctUserList("from_user", "to_user", session, user));

        ArrayList<JsonObject> jsonChatArray = new ArrayList<>();
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd hh:mm a");

        //get Other User One by One in Loop
        for (User userItem : userList) {

            Criteria chatCriteria = session.createCriteria(Chat.class);
            chatCriteria.add(Restrictions.or(
                    Restrictions.and(Restrictions.eq("from_user", userItem), Restrictions.eq("to_user", user)),
                    Restrictions.and(Restrictions.eq("from_user", user), Restrictions.eq("to_user", userItem))
            ));

            chatCriteria.addOrder(Order.desc("date_time"));
            chatCriteria.setMaxResults(1);

            //OthetUser Chat details load
            System.out.println(userItem.getLname());

            SimpleDateFormat dateFormat1 = new SimpleDateFormat("MM/DD/YY HH:MM:SS");

            JsonObject chatItem = new JsonObject();
            chatItem.addProperty("other_user_id", userItem.getId());
            chatItem.addProperty("other_user_mobile", userItem.getMobile());
            chatItem.addProperty("other_user_country", userItem.getCountry().getName());
            chatItem.addProperty("other_user_JoinDate", userItem.getJoinDate().toString());
//            chatItem.addProperty("other_user_JoinDate", userItem.getJoinDate());
            chatItem.addProperty("other_user_name", userItem.getFname() + " " + userItem.getLname());
            chatItem.addProperty("other_user_status", userItem.getUserSatus().getId()); //1= online , 2=  offline

            //check avetar image 
            String serverPath = request.getServletContext().getRealPath("");
            String otherUserAvaterImagePath = serverPath + File.separator + "Avartarimages" + File.separator + userItem.getMobile() + ".png";
            System.out.println(otherUserAvaterImagePath);
            File otherUserAvatarImageFile = new File(otherUserAvaterImagePath);

            if (otherUserAvatarImageFile.exists()) {
                // avatar image found  
                chatItem.addProperty("avatar_image_Found", true);
            } else {
                // avetar image not found 
                chatItem.addProperty("avatar_image_Found", false);
                chatItem.addProperty("other_user_avatar_leters", userItem.getFname().charAt(0) + "" + userItem.getLname().charAt(0));
            }

            List<Chat> dbChatList = chatCriteria.list();
            System.out.println(dbChatList.get(0).getMessage());
//            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd hh:mm  a");

            chatItem.addProperty("message", dbChatList.get(0).getMessage());
            chatItem.addProperty("dateTime", dateFormat.format(dbChatList.get(0).getDate_time()));
//            chatItem.addProperty("chat_status_id", dbChatList.get(0).getChat_status().getId());   // 1= seen , 2= unseen 

            Criteria chatList2 = session.createCriteria(Chat.class);
            chatList2.add(Restrictions.eq("to_user", user));
            chatList2.add(Restrictions.eq("from_user", userItem));
            chatList2.add(Restrictions.ne("chat_status.id", 1)); // Not equal to 1

            chatList2.setProjection(Projections.rowCount());
            Long count = (Long) chatList2.uniqueResult();

            chatItem.addProperty("unSeenMasaageCount", count);

            jsonChatArray.add(chatItem);

        }

Collections.sort(jsonChatArray, (chat1, chat2) -> {
            try {
                                Date date2 = dateFormat.parse(chat2.get("dateTime").getAsString());
                Date date1 = dateFormat.parse(chat1.get("dateTime").getAsString());
                return date2.compareTo(date1);  // Sorting in descending order
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return 0;
        });
        //send Users 
        responseJsonObject.addProperty("success", true);
        responseJsonObject.addProperty("message", "success");
        responseJsonObject.add("jsonChatArray", gson.toJsonTree(jsonChatArray));

        session.beginTransaction().commit();
        session.close();

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseJsonObject));

    }

    public List<User> getDistinctUserList(String col1, String col2, Session session, User user) {
        Criteria chatList = session.createCriteria(Chat.class);
        chatList.add(Restrictions.eq(col1, user));
        chatList.setProjection(Projections.distinct(Projections.property(col2)));
        List<User> list = (List<User>) chatList.list();
        return list;
    }

}
