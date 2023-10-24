<%@ page contentType="text/html;charset=UTF-8" %>
<h1>SPA</h1>
<p>
    Автентифікація та авторизація - за допомогою токенів здійснюється
    наступним чином:<br/>
</p>
<ul class="collection">
    <li class="collection-item">
        1. користувач вводить логін та пароль, формується асинхронний запит
        до API авторизації, у відповідь отримується токен.
    </li>
    <li class="collection-item">
        2. токен перевіряється на цілісніть та зберігається у локальному
        сховищі. Подальші запити включають одержаний токен до
        заголовків
    </li>
    <li class="collection-item">
        3. Наявність токену на сторінці: <b id="spa-token-status"></b>
    </li>
    <li class="collection-item"></li>
</ul>
<auth-part></auth-part>
<button class="btn deep-purple darken-2" id="spa-get-data">Дані</button>
<button class="btn deep-purple darken-4" id="spa-logout">Вихід</button>