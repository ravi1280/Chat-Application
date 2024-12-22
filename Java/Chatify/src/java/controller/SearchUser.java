package controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "SearchUser", urlPatterns = {"/SearchUser"})
public class SearchUser extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
         responseObject.addProperty("success", false);

        String userMobile = request.getParameter("userMobile");
        String myid = request.getParameter("myid");

        System.out.println(myid);
        System.out.println(userMobile);

        Session session = HibernateUtil.getSessionFactory().openSession();
        User user = (User) session.get(User.class, Integer.parseInt(myid));

        Criteria criteria1 = session.createCriteria(User.class);
        criteria1.add(Restrictions.ne("id", user.getId()));
        criteria1.add(Restrictions.like("mobile", "%" + userMobile + "%", MatchMode.ANYWHERE));
        criteria1.addOrder(Order.asc("Fname"));

        List<User> SearchUserList = criteria1.list();
        JsonArray jsonSearchUser = new JsonArray();
        for (User searchUser : SearchUserList) {
            System.out.println(searchUser.getFname() + " " + searchUser.getLname());

            JsonObject userItem = new JsonObject();
            userItem.addProperty("other_user_id", searchUser.getId());
            userItem.addProperty("other_user_mobile", searchUser.getMobile());
            userItem.addProperty("other_user_country", searchUser.getCountry().getName());
            userItem.addProperty("other_user_name", searchUser.getFname() + " " + searchUser.getLname());
            userItem.addProperty("other_user_status", searchUser.getUserSatus().getId()); //1= online , 2=  offline

            //check avatar image 
            String serverPath = request.getServletContext().getRealPath("");
            String otherUserAvaterImagePath = serverPath + File.separator + "Avartarimages" + File.separator + searchUser.getMobile() + ".png";
            System.out.println(otherUserAvaterImagePath);
            File otherUserAvatarImageFile = new File(otherUserAvaterImagePath);

            if (otherUserAvatarImageFile.exists()) {
                // avatar image found  
                userItem.addProperty("avatar_image_Found", true);
            } else {
                // avetar image not found 
                userItem.addProperty("avatar_image_Found", false);
                userItem.addProperty("other_user_avatar_leters", searchUser.getFname().charAt(0) + "" + searchUser.getLname().charAt(0));
            }

            jsonSearchUser.add(userItem);

        }
        responseObject.addProperty("success", true);
        responseObject.addProperty("message", "success");

        responseObject.add("jsonUserArray", gson.toJsonTree(jsonSearchUser));

        session.beginTransaction().commit();
        session.close();
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));

    }

}
