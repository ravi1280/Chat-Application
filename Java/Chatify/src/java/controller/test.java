//
//package controller;
//
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;
//import entity.User;
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.ArrayList;
//import java.util.HashSet;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import model.HibernateUtil;
//
//
//@WebServlet(name = "test", urlPatterns = {"/test"})
//public class test extends HttpServlet {
//@Override
//    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        Gson gson = new Gson();
//        Session session = HibernateUtil.getSessionFactory().openSession();
//
//        int userID = Integer.valueOf(req.getParameter("user"));
//
//        JsonObject jsonObject = new JsonObject();
//        User user = (User) session.get(User.class, userID);
//        Set<User> userList = new HashSet<>();
//        List<HomeChatDTO> chatList = new ArrayList<>();
//
//        userList.addAll(getDistinctUserList("to", "from", session, user));
//        userList.addAll(getDistinctUserList("from", "to", session, user));
//
//        for (User userItem : userList) {
//            Criteria chatCriteria = session.createCriteria(Chat.class);
//            chatCriteria.add(Restrictions.or(
//                    Restrictions.and(Restrictions.eq("from", userItem), Restrictions.eq("to", user)),
//                    Restrictions.and(Restrictions.eq("from", user), Restrictions.eq("to", userItem))
//            ));
//            chatCriteria.addOrder(Order.desc("dateTime"));
//            chatCriteria.setMaxResults(1);
//            Chat chat = (Chat) chatCriteria.uniqueResult();
//
//            SimpleDateFormat format = new SimpleDateFormat("H:mm a");
//            String messageTime = format.format(chat.getDateTime());
//
//            if (chat != null) {
//                HomeChatDTO responseDTO = new HomeChatDTO();
//                responseDTO.setId(chat.getId());
//                responseDTO.setFrom(chat.getFrom());
//                responseDTO.setTo(chat.getTo());
//                responseDTO.setMessage(chat.getMessage());
//                responseDTO.setDateTime(chat.getDateTime());
//                responseDTO.setTime(messageTime);
//                responseDTO.setStatus(chat.getStatus());
//
//                Criteria relationshipTable = session.createCriteria(RelationShip.class);
//                relationshipTable.add(Restrictions.and(
//                        Restrictions.eq("user", user),
//                        Restrictions.eq("relative", userItem)
//                ));
//                relationshipTable.setMaxResults(1);
//
//                if (!relationshipTable.list().isEmpty()) {
//                    RelationShip relationShip = (RelationShip) relationshipTable.uniqueResult();
//                    responseDTO.setHasRelationship(true);
//                    responseDTO.setRelativeName(relationShip.getName());
//                }
//
//                Criteria chatStatus = session.createCriteria(ChatStatus.class);
//                chatStatus.add(Restrictions.eq("status", "Seen"));
//                ChatStatus status = (ChatStatus) chatStatus.uniqueResult();
//
//                Criteria unseenChat = session.createCriteria(Chat.class);
//                unseenChat.add(Restrictions.and(Restrictions.eq("from", userItem), Restrictions.eq("to", user)));
//                unseenChat.add(Restrictions.ne("status", status));
//                List<Chat> unseenChatList = unseenChat.list();
//
//                for (Chat unseenChatItem : unseenChatList) {
//                    Criteria deliveredStatus = session.createCriteria(ChatStatus.class);
//                    deliveredStatus.add(Restrictions.eq("status", "Deliver"));
//                    ChatStatus delivered = (ChatStatus) deliveredStatus.uniqueResult();
//                    unseenChatItem.setStatus(delivered);
//                    session.save(unseenChatItem);
//                }
//
//                responseDTO.setUnseenCount(unseenChatList.size());
//
//                String applicationPath = req.getServletContext().getRealPath("//profile_pictures").replace("\\build\\web", "\\web");
//                String filePath = applicationPath + "//" + userItem.getMobile() + ".png";
//
//                File file = new File(filePath);
//
//                if (file.exists()) {
//                    responseDTO.setHasImage(true);
//                } else {
//                    String[] words = userItem.getName().trim().split("\\s+");
//
//                    String firstLetter = words[0].substring(0, 1);
//                    String secondLetter = words[1].substring(0, 1);
//
//                    responseDTO.setLetterName((firstLetter + secondLetter).toUpperCase());
//                }
//                chatList.add(responseDTO);
//                session.beginTransaction().commit();
//            }
//        }
//
//        chatList.sort((chat1, chat2) -> chat2.getDateTime.compareTo(chat1.getDateTime()));
//        jsonObject.add("usersList", gson.toJsonTree(chatList));
//
//        session.close();
//        resp.setContentType("application/json");
//        resp.getWriter().write(gson.toJson(jsonObject));
//    }
//
//    public List<User> getDistinctUserList(String col1, String col2, Session session, User user) {
//        Criteria chatList = session.createCriteria(Chat.class);
//        chatList.add(Restrictions.eq(col1, user));
//        chatList.setProjection(Projections.distinct(Projections.property(col2)));
//        List<User> list = (List<User>) chatList.list();
//        return list;
//    }
//
//}
