package step.learning.dto.models;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class RegFormModel {

    // region fields
    private String name;
    private String login;
    private String password;
    private String repeat;
    private String email;
    private Date birthdate;
    private boolean isAgree;

    // endregion
    public RegFormModel(HttpServletRequest request) {
        this.setName(request.getParameter("reg-name"));
        this.setLogin(request.getParameter("reg-login"));
        this.setPassword(request.getParameter("reg-password"));
        this.setRepeat(request.getParameter("reg-repeat"));
        this.setEmail(request.getParameter("reg-email"));
        this.setIsAgree(request.getParameter("reg-rules"));
        try {
            this.setBirthdate(request.getParameter("reg-birthdate"));
        } catch (ParseException e) {
            this.setBirthdate((Date) null);
        }
    }

    //    public Map<String, String> getErrorMessages() {
//        Map<String, String> result = new HashMap<>();
//        if (name == null || "".equals(name)) {
//            result.put("name", "Ім'я не може бути порожнім");
//        }
//        if (login == null || "".equals(login)) {
//            result.put("login", "Логін не може бути порожнім");
//        }
//        if (email == null || "".equals(email)) {
//            result.put("email", "Email не може бути порожнім");
//        }
//        return result;
//    }
    public RegistrationValidationModel getErrorMessages() {
        RegistrationValidationModel result = new RegistrationValidationModel();
        boolean isValid = true;
        if (name == null || "".equals(name)) {
            isValid = false;
            result.setNameMessage("Ім'я не може бути порожнім");
        }
        if (login == null || "".equals(login)) {
            isValid = false;
            result.setLoignMessage("Логін не може бути порожнім");
        }
        if (email == null || "".equals(email)) {
            isValid = false;
            result.setEmailMessage("Email не може бути порожнім");
        }
        if (getBirthdateAsString().isEmpty()) {
            isValid = false;
            result.setDateMessage("Дата народження не може бути порожньою");
        }
        if (isValid) {
            return null;
        } else return result;
    }

    // region accessors
    public String getBirthdateAsString() {
        if (getBirthdate() == null) {
            return "";
        }
        return formDateFormat.format(getBirthdate());
    }

    public void setBirthdate(String birthdate) throws ParseException {
        this.birthdate = formDateFormat.parse(birthdate);
    }

    public void setIsAgree(String isAgree) {
        this.isAgree = "on".equalsIgnoreCase(isAgree) || "true".equalsIgnoreCase(isAgree);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRepeat() {
        return repeat;
    }

    public void setRepeat(String repeat) {
        this.repeat = repeat;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public boolean isAgree() {
        return isAgree;
    }

    public void setIsAgree(boolean agree) {
        isAgree = agree;
    }

    // endregion
    private static final SimpleDateFormat formDateFormat = new SimpleDateFormat("yyyy-MM-dd");
}
