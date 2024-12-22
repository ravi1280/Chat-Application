package controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.Country;
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
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "CountryUsers", urlPatterns = {"/CountryUsers"})
public class CountryUsers extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("success", false);
        responseObject.addProperty("message", "unable request process");

        String country = request.getParameter("country");
        String myid = request.getParameter("myid");
//        System.out.println(country);
//        System.out.println(myid);

        Session session = HibernateUtil.getSessionFactory().openSession();
        Criteria criteria2 = session.createCriteria(Country.class);
        criteria2.add(Restrictions.eq("name", country));
        Country country1 = (Country) criteria2.uniqueResult();

        System.out.println(country1.getName());
        System.out.println(country1.getId());

        Criteria criteria1 = session.createCriteria(User.class);
        criteria1.add(Restrictions.ne("id", Integer.parseInt(myid)));
        criteria1.add(Restrictions.eq("country.id", country1.getId()));
        List<User> userList1 = criteria1.list();

        JsonArray jsonUserArray = new JsonArray();
        for (User listUser : userList1) {
            System.out.println(listUser.getFname());

            JsonObject userItem = new JsonObject();
            userItem.addProperty("other_user_id", listUser.getId());
            userItem.addProperty("other_user_mobile", listUser.getMobile());
            userItem.addProperty("other_user_country", listUser.getCountry().getName());
            userItem.addProperty("other_user_JoinDate", listUser.getJoinDate().toString());
            userItem.addProperty("other_user_name", listUser.getFname() + " " + listUser.getLname());
            userItem.addProperty("other_user_status", listUser.getUserSatus().getId()); //1= online , 2=  offline

            //check avatar image 
            String serverPath = request.getServletContext().getRealPath("");
            String otherUserAvaterImagePath = serverPath + File.separator + "Avartarimages" + File.separator + listUser.getMobile() + ".png";
            System.out.println(otherUserAvaterImagePath);
            File otherUserAvatarImageFile = new File(otherUserAvaterImagePath);

            if (otherUserAvatarImageFile.exists()) {
                // avatar image found  
                userItem.addProperty("avatar_image_Found", true);
            } else {
                // avetar image not found 
                userItem.addProperty("avatar_image_Found", false);
                userItem.addProperty("other_user_avatar_leters", listUser.getFname().charAt(0) + "" + listUser.getLname().charAt(0));
            }

            jsonUserArray.add(userItem);
        }
        responseObject.addProperty("success", true);
        responseObject.addProperty("message", "success");

        responseObject.add("jsonUserArray2", gson.toJsonTree(jsonUserArray));

        session.beginTransaction().commit();
        session.close();
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));

    }

}
