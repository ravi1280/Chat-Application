package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@MultipartConfig
@WebServlet(name = "UpdateProfile", urlPatterns = {"/UpdateProfile"})
public class UpdateProfile extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseJsonObject = new JsonObject();
        Session session = HibernateUtil.getSessionFactory().openSession();
        responseJsonObject.addProperty("success", false);
        String fname = request.getParameter("fname");
        String lname = request.getParameter("lname");
        String mobile = request.getParameter("mobile");
        Part avatarImage = request.getPart("avatarImage");

        System.out.println(fname);
        System.out.println(lname);
        System.out.println(mobile);

        if (fname.isEmpty()) {
            responseJsonObject.addProperty("message", "First name Field is Empty");

        } else if (lname.isEmpty()) {
            responseJsonObject.addProperty("message", "Last name Field is Empty");
        } else {
            
            Criteria criteria1=  session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("mobile",mobile));
            User user =(User)criteria1.uniqueResult();
          
            user.setLname(lname);
            user.setFname(fname);

          

            if (avatarImage != null) {

                String serverPath = request.getServletContext().getRealPath("");
                String avatarImagePath = serverPath + File.separator + "Avartarimages" + File.separator + mobile + ".png";
                System.out.println(avatarImagePath);
                File file = new File(avatarImagePath);
                Files.copy(avatarImage.getInputStream(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);

            }
            
              session.update(user);
            session.beginTransaction().commit();

            responseJsonObject.addProperty("success", true);
            responseJsonObject.addProperty("message", "Profile Update Success!");

        }
        session.close();
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseJsonObject));

    }

}
