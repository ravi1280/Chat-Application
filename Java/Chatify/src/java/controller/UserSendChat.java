
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.ChatStatus;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Session;

@WebServlet(name = "UserSendChat", urlPatterns = {"/UserSendChat"})
public class UserSendChat extends HttpServlet {

        @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Session session = HibernateUtil.getSessionFactory().openSession();

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("success", false);
        
        String logUser = request.getParameter("logUserId");
        String OtherUser = request.getParameter("OtherUserId");
        String message = request.getParameter("message");
        
        System.out.println(logUser);
        System.out.println(OtherUser);
        System.out.println(message);

        User log_user = (User) session.get(User.class, Integer.parseInt(logUser));
        User other_user = (User) session.get(User.class, Integer.parseInt(OtherUser));
        System.out.println(other_user.getFname());
        
       Chat chat = new Chat();
       
      ChatStatus chat_status = (ChatStatus)session.get(ChatStatus.class, 2);
      chat.setChat_status(chat_status);
      
      chat.setDate_time(new Date());
      chat.setFrom_user(log_user);
      chat.setTo_user(other_user);
     chat.setMessage(message);
     
     session.save(chat);
        try {
            session.beginTransaction().commit();
            responseObject.addProperty("success", true  );
        } catch (Exception e) {
        }
        
        //send response
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }
    
}
