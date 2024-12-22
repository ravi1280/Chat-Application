package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Validation;
import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "UserSignIn", urlPatterns = {"/UserSignIn"})
public class UserSignIn extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("success", false);
        JsonObject requestObject = gson.fromJson(request.getReader(), JsonObject.class);
        
        String mobile = requestObject.get("mobile").getAsString();
        String password = requestObject.get("password").getAsString();
        System.out.println(mobile);
        System.out.println(password);
        
        if (mobile.isEmpty()) {
            responseObject.addProperty("message", "Please fill the mobile number Field");
        } else if (!Validation.isMobileNumberValid(mobile)) {
            responseObject.addProperty("message", "Invalid Mobile Number ");
        } else if (password.isEmpty()) {
            responseObject.addProperty("message", "Please fill password field");
        } else {
            // valid Details
            Session session = HibernateUtil.getSessionFactory().openSession();
            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("mobile", mobile));
            criteria1.add(Restrictions.eq("password", password));
            
            if (!criteria1.list().isEmpty()) {
                //have  valid user
                User user = (User) criteria1.uniqueResult();

                //set response 
                responseObject.addProperty("success", true);
                responseObject.addProperty("message", "Sign  In Success !");
                responseObject.add("user", gson.toJsonTree(user));
                
            } else {
                responseObject.addProperty("message", "Invalid User , Try Again !");
            }
            session.close();
            
        }
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
        
    }
    
}
