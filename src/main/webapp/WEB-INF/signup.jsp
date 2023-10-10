<%@ page import="step.learning.dto.models.RegFormModel" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    // Перевіряємо чи є повідомлення попередньої форми, формуємо значення для полів
    RegFormModel model = (RegFormModel) request.getAttribute("reg-model");
    String loginValue = model == null ? "" : model.getLogin();
    String nameValue = model == null ? "" : model.getName();
    String emailValue = model == null ? "" : model.getEmail();
    String birthdateValue = model == null ? "" : model.getBirthdateAsString();
    Map<String, String> errors = model == null ? new HashMap<String, String>() : (HashMap<String, String>) model.getErrorMessages();
%>
<h2>Реєстрація користувача</h2>
<% if (errors.containsKey("name")) { %>
<p style="color: darkred">error
</p>
<% } %>
<p><%=request.getAttribute("reg-message")%>
</p>
<div class="row">
    <form class="col s12" method="post" action="">
        <div class="row">
            <div class="input-field col s6">
                <i class="material-icons prefix">badge</i>
                <input value="<%= loginValue %>" name="reg-login" id="reg-login" type="text" class="validate">
                <label for="reg-login">Логін на сайті</label>
            </div>
            <div class="input-field col s6">
                <i class="material-icons prefix">person</i>
                <input value="<%= nameValue %>" name="reg-name" id="reg-name" type="text"
                       class="validate  <% if (errors.containsKey("name")) { %>invalid<% } %>">
                <label for="reg-name">Реальне ім'я</label>
                <% if (errors.containsKey("name")) { %>
                <span class="helper-text" data-error="<%= errors.get("name") %>">Helper text</span>
                <% } %>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <i class="material-icons prefix">lock</i>
                <input name="reg-password" id="reg-password" type="password" class="validate">
                <label for="reg-password">Пароль</label>
            </div>
            <div class="input-field col s6">
                <i class="material-icons prefix">lock_open</i>
                <input name="reg-repeat" id="reg-repeat" type="password" class="validate">
                <label for="reg-repeat">Повторіть пароль</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <i class="material-icons prefix">alternate_email</i>
                <input value="<%= emailValue %>" name="reg-email" id="reg-email" type="email" class="validate">
                <label for="reg-email">E-mail</label>
            </div>
            <div class="input-field col s6">
                <i class="material-icons prefix">cake</i>
                <input value="<%= birthdateValue %>" name="reg-birthdate" id="reg-birthdate" type="date"
                       class="validate">
                <label for="reg-birthdate">Дата народження</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <i class="material-icons prefix">receipt_long</i>
                <label> &emsp;
                    <input name="reg-rules" id="reg-rules" type="checkbox" class="filled-in validate">
                    <span>Не буду нічого порушувати</span>
                </label>
            </div>
            <div class="input-field col s6 right-align">
                <button class="waves-effect waves-light btn deep-purple darken-4"><i
                        class="material-icons right">how_to_reg</i>Реєстрація
                </button>
            </div>
        </div>
    </form>
</div>
