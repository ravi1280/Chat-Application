package controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "AllUsers", urlPatterns = {"/AllUsers"})
public class AllUsers extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject resJsonObject = new JsonObject();
        resJsonObject.addProperty("success", false);
        resJsonObject.addProperty("message", "Unable to Process  your request");

        try {

//        Session session = HibernateUtil.getSessionFactory().openSession();
            Session session = HibernateUtil.getSessionFactory().openSession();
            // get User i  in client side
            String userId = request.getParameter("id");

            //get User Obejct
            User user = (User) session.get(User.class, Integer.parseInt(userId));



            //get Oher Users 
            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.ne("id", user.getId()));
            criteria1.addOrder(Order.asc("Fname"));
            List<User> otherusers = criteria1.list();

            JsonArray jsonChatArray = new JsonArray();
            for (User otherUser : otherusers) {


                JsonObject userItem = new JsonObject();
                userItem.addProperty("other_user_id", otherUser.getId());
                userItem.addProperty("other_user_mobile", otherUser.getMobile());
                userItem.addProperty("other_user_country", otherUser.getCountry().getName());
                userItem.addProperty("other_user_JoinDate", otherUser.getJoinDate().toString());
                userItem.addProperty("other_user_name", otherUser.getFname() + " " + otherUser.getLname());
                userItem.addProperty("other_user_status", otherUser.getUserSatus().getId()); //1= online , 2=  offline

                //check avatar image 
                String serverPath = request.getServletContext().getRealPath("");
                String otherUserAvaterImagePath = serverPath + File.separator + "Avartarimages" + File.separator + otherUser.getMobile() + ".png";
                System.out.println(otherUserAvaterImagePath);
                File otherUserAvatarImageFile = new File(otherUserAvaterImagePath);

                if (otherUserAvatarImageFile.exists()) {
                    // avatar image found  
                    userItem.addProperty("avatar_image_Found", true);
                } else {
                    // avetar image not found 
                    userItem.addProperty("avatar_image_Found", false);
                    userItem.addProperty("other_user_avatar_leters", otherUser.getFname().charAt(0) + "" + otherUser.getLname().charAt(0));
                }

                jsonChatArray.add(userItem);

            }

            //send Users 
            resJsonObject.addProperty("success", true);
            resJsonObject.addProperty("message", "success");

            resJsonObject.add("jsonUserArray", gson.toJsonTree(jsonChatArray));

            session.beginTransaction().commit();
            session.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(resJsonObject));

    }

}
