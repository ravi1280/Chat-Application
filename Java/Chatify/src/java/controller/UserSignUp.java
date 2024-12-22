package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Country;
import entity.User;
import entity.UserStatus;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Validation;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@MultipartConfig
@WebServlet(name = "UserSignUp", urlPatterns = {"/UserSignUp"})
public class UserSignUp extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("success", false);

        String mobile = request.getParameter("mobile");
        String fname = request.getParameter("fname");
        String lname = request.getParameter("lname");
        String password = request.getParameter("password");
        String country = request.getParameter("country");

        System.out.println(mobile);
        System.out.println(fname);
        System.out.println(lname);
        System.out.println(password);
        System.out.println(country);

       if (country.equals("none")) {
            responseObject.addProperty("message", "Please Select Your Country !");
          
        } else if (mobile.isEmpty()) {
            responseObject.addProperty("message", "Please Fill The Mobile Number Field !");
           
        } else if (!Validation.isMobileNumberValid(mobile)) {
            responseObject.addProperty("message", "Invalid Mobile Number !");
            
        } else if (fname.isEmpty()) {
            responseObject.addProperty("message", "Please Fill  First Name Field !");
            
        } else if (lname.isEmpty()) {
          
            responseObject.addProperty("message", "Please Fill Last Name Field !");
        } else if (password.isEmpty()) {
         
            responseObject.addProperty("message", "Please Fill Password Field !");
        }  else if (!Validation.isPasswordValidate(password)) {
         
            responseObject.addProperty("message", "Invalid Password !");
        }else {
            //check alredy user register
        
            Session session = HibernateUtil.getSessionFactory().openSession();
            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("mobile", mobile));
          

            if (!criteria1.list().isEmpty()) {
                //already use this mobile number
                responseObject.addProperty("message", "Already Used! Please Use Another Number For Sign up Process!");
              
            } else {
                // mobile not euse for sing Up
              
                User user = new User();
                user.setFname(fname);
                user.setLname(lname);
                user.setMobile(mobile);
                user.setPassword(password);
                user.setJoinDate(new Date());
             
                //user status 2 = ofline 
                UserStatus user_status = (UserStatus) session.get(UserStatus.class, 2);
                user.setUserSatus(user_status);
                System.out.println(user_status);
              
                //set Country
                Criteria criteria2 = session.createCriteria(Country.class);
                criteria2.add(Restrictions.eq("name", country));
                Country country1 = (Country) criteria2.uniqueResult();
//                Country country1 = (Country) session.get(Country.class, country);
                user.setCountry(country1);
                System.out.println(country1);

//                System.out.println("1");
                session.save(user);
                session.beginTransaction().commit();
//                System.out.println("1");
                responseObject.addProperty("success", true);
                responseObject.addProperty("message", "Registraion Complete!");
                
              
              
            }
            session.close();

        }
          response.setContentType("application/json");
                response.getWriter().write(gson.toJson(responseObject));

    }

}
