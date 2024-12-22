package controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.ChatStatus;
import entity.User;
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

@WebServlet(name = "UserLoadChat", urlPatterns = {"/UserLoadChat"})
public class UserLoadChat extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Session session = HibernateUtil.getSessionFactory().openSession();

        Gson gson = new Gson();
        String logUser = request.getParameter("logUserId");
        String OtherUser = request.getParameter("OtherUserId");
        System.out.println(logUser);
        System.out.println(OtherUser);

        User log_user = (User) session.get(User.class, Integer.parseInt(logUser));
        User other_user = (User) session.get(User.class, Integer.parseInt(OtherUser));

        Criteria criteria1 = session.createCriteria(Chat.class);
        criteria1.add(
                Restrictions.or(
                        Restrictions.and(Restrictions.eq("from_user", log_user), Restrictions.eq("to_user", other_user)),
                        Restrictions.and(Restrictions.eq("to_user", log_user), Restrictions.eq("from_user", other_user))));

        criteria1.addOrder(Order.asc("date_time"));
        List<Chat> chatList = criteria1.list();

        ChatStatus chatStaus = (ChatStatus) session.get(ChatStatus.class, 1);

        JsonArray chatArray = new JsonArray();

        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd, hh:mm a");

        for (Chat chat : chatList) {
//            System.out.println(chat.getMessage());
            JsonObject chatObject = new JsonObject();
            chatObject.addProperty("message", chat.getMessage());
            chatObject.addProperty("dateTime", dateFormat.format(chat.getDate_time()));

//get chat only from othr user
            if (chat.getFrom_user().getId() == other_user.getId()) {
                //add side 
                chatObject.addProperty("side", "Left");

                //get Unseen Chat
                if (chat.getChat_status().getId() == 2) {

                    //update chat status ->  2
                    chat.setChat_status(chatStaus);
                    session.update(chat);
                }

            } else {
                //add side
                chatObject.addProperty("side", "Right");
                chatObject.addProperty("status", chat.getChat_status().getId());//1= seen , 2= unseen
            }
            // add chat object in to chat array
            chatArray.add(chatObject);

        }
        //update Db
        session.beginTransaction().commit();

        //send Response
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(chatArray));

    }

}
