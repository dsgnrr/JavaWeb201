<%@ page contentType="text/html;charset=UTF-8" %>
<%
    String connectionStatus = (String) request.getAttribute("connectionStatus");
%>
<h1>Робота з базами даних</h1>
<h2>JDBC</h2>
<p>
    <strong>JDBC</strong> - Java DataBase Connectivity - технологія
    доступу до даних, аналогічна подібним ADO, PDO тощо.
    Головна ідея - створення підключення, формування запиту та передача
    його до СУБД, одержання результатів виконання запиту та даних, що
    ним повертаються
</p>
<p>
    Технологія надає універсальний інтерфейс доступу до даних (однаковий
    для різних СУБД), конкретна реалізація здійснюється шляхом підключення
    драйверів відповідної БД (які також називають конекторами)
    Налаштування підключення здійснюється шляхом реєстрації драйвера
    та надсилання запиту до СУБД щодо підключення (автентифікації).
    Нагадуємо, що паролі до БД слід зберігати в окремому файлі (конфігурації)
    який вилучено з Git (.gitigonre)
</p>
<p>
    Оскільки дані про підключення можуть знадобитись у різних частинах проєкту найбільш доцільно створювати його у
    вигляді окремого сервісу
</p>

<p>
    Статус підключення: <strong><%=connectionStatus%>
</strong>
</p>
<p>
    При роботі кількох сервісів з однією БД вживається підхід з
    розрізнення таблиць за допомогою схем або префіксів. Не всі
    БД підтримують схеми (MS SQL - так, MySQL - ні)
</p>
<h2>Управління даними</h2>
<p>
    <button id="db-create-button"
            class="waves-effect waves-light btn deep-purple darken-4">
        Create Phone Table
    </button>
<div class="input-field col s6">
    <input value id="user-name" name="user-name" type="text" class="validate">
    <label for="user-name">Ім'я</label>
    <span id="nameError" class="helper-text" data-error=""></span>
</div>
<div class="input-field col s6">
    <input name="user-phone" id="user-phone" type="text" class="validate">
    <label for="user-phone">Телефон</label>
    <span id="phoneError" class="helper-text" data-error=""></span>
</div>
<button id="db-insert-button"
        class="waves-effect waves-light btn deep-purple darken-4">
    <i class="material-icons right">phone_iphone</i>
    Замовити дзвінок
</button>

<br/>
<u id="out"></u>
</p>
<div class="row">
    <button id="db-read-button"
            class="waves-effect waves-light btn deep-purple darken-4">
        <i class="material-icons right">view_list</i>
        Переглянути замовлення
    </button>
</div>

