package step.learning.servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.name.Named;
import step.learning.services.db.DbProvider;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.regex.Pattern;

@Singleton
public class DbServlet extends HttpServlet {
    private final DbProvider dbProvider;
    private final String dbPrefix;

    @Inject
    public DbServlet(DbProvider dbProvider, @Named("db-prefix") String dbPrefix) {
        this.dbProvider = dbProvider;
        this.dbPrefix = dbPrefix;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String connectionStatus;
        try {
            dbProvider.getConnection();
            connectionStatus = "Connection OK";
        } catch (RuntimeException ex) {
            connectionStatus = "Connection error: " + ex.getMessage();
        }
        req.setAttribute("connectionStatus", connectionStatus);
        req.setAttribute("page-body", "db.jsp");
        req.getRequestDispatcher("WEB-INF/_layout.jsp")
                .forward(req, resp); // ~ return View()
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Реакція на кнопку "create" - створюємо таблицю БД "замовлення дзвінків"
        String status;
        String message;
        String sql = "CREATE TABLE " + dbPrefix + "call_me (" +
                "id BIGINT PRIMARY KEY," +
                "name VARCHAR(64)," +
                "phone CHAR(13) NOT NULL COMMENT '+38 098 765 43 21'," +
                "moment DATETIME DEFAULT CURRENT_TIMESTAMP" +
                ") ENGINE = InnoDB DEFAULT CHARSET = UTF8";
        try (Statement statement = dbProvider.getConnection().createStatement()) {
            statement.executeUpdate(sql);
            status = "OK";
            message = "Table created";
        } catch (SQLException ex) {
            status = "error";
            message = ex.getMessage();
        }
        JsonObject result = new JsonObject();
        result.addProperty("status", status);
        result.addProperty("message", message);
        resp.getWriter().print(result.toString());
    }

//    private CallMeValidationModel validateCallMeForm(JsonObject data) {
//        CallMeValidationModel result = new CallMeValidationModel();
//        String name = data.get("name").getAsString();
//        String phone = data.get("phone").getAsString();
//        if (name == null || "".equals(name)) {
//            result.setValid(false);
//            result.setNameMessage("Ім'я не може бути порожнім");
//        } else if (!Pattern.matches("^[а-яА-Яa-zA-ZіІїЇ]+$", name)) {
//            result.setValid(false);
//            result.setNameMessage("Ім'я не відповідає шаблону, тільки букви, без пробілів");
//            result.setNameField(name);
//        }
//        if (phone == null || "".equals(phone)) {
//            result.setValid(false);
//            result.setNameMessage("Телефон не може бути порожнім");
//        } else if (!Pattern.matches("^\\+38\\s?(\\(\\d{3}\\)|\\d{3})\\s?\\d{3}(-|\\s)?\\d{2}(-|\\s)?\\d{2}$", phone)) {
//            result.setValid(false);
//            result.setNameMessage("Телефон не відповідає шаблону: +38099xxxxxxx або +38(099)xxx-xx-xx");
//            result.setPhoneField(phone);
//        }
//        return result;
//    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // insert - додати до БД. Дані передаються як JSON у тілі запиту
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int len;
        String json;
        JsonObject result = new JsonObject();
        try (InputStream body = req.getInputStream()) {
            while ((len = body.read(buffer)) > 0) {
                bytes.write(buffer, 0, len);
            }
            json = bytes.toString(StandardCharsets.UTF_8.name());
            JsonObject data = JsonParser.parseString(json).getAsJsonObject();
            result.addProperty("name", data.get("name").getAsString());
            result.addProperty("phone", data.get("phone").getAsString());

        } catch (IOException ex) {
            //json = ex.getMessage();
            result.addProperty("message", ex.getMessage());
        }
        resp.getWriter().print(result.toString());
    }
}