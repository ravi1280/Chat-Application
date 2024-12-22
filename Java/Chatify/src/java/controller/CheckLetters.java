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
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "CheckLetters", urlPatterns = {"/CheckLetters"})
public class CheckLetters extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("letters", "");

        String mobile = request.getParameter("mobile");
        System.out.println(mobile);
        
        Session session = HibernateUtil.getSessionFactory().openSession();
        Criteria criteria1 = session.createCriteria(User.class);
        criteria1.add(Restrictions.eq("mobile", mobile));
        
        if (!criteria1.list().isEmpty()) {
            
           User user =(User) criteria1.uniqueResult();
            String letters = user.getFname().charAt(0) + "" + user.getLname().charAt(0);
        responseObject.addProperty("letters", letters);
          System.out.println(letters);
        }
             response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));

    }

}
