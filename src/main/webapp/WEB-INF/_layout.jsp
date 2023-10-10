<%@ page contentType="text/html;charset=UTF-8" %>
<%
    String pageBody = (String) request.getAttribute("page-body");
    String context = request.getContextPath(); // /JavaWeb201 - Dekploy - App context
%>
<!doctype html>
<html>
<head>
    <title>Java web</title>
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <%--    Site CSS--%>
    <link rel="stylesheet" href="<%=context%>/css/site.css"/>
</head>
<body>
<nav>
    <div class="nav-wrapper purple darken-4">
        <!-- Modal Trigger -->
        <a class="left modal-trigger auth-icon" href="#auth-modal"><i class="material-icons">exit_to_app</i></a>

        <a href="<%= context %>/" class="left site-logo">Java Web201</a>

        <ul id="nav-me" class="right hide-on-med-and-down">
            <li <%="about.jsp".equals(pageBody) ? "class='active'" : ""%>
            ><a href="<%=context%>/about">About</a></li>
            <li <%="filters.jsp".equals(pageBody) ? "class='active'" : ""%>
            ><a href="<%=context%>/filters">Filters</a></li>
            <li <%="ioc.jsp".equals(pageBody) ? "class='active'" : ""%>
            ><a href="<%=context%>/ioc">IoC</a></li>
        </ul>
    </div>
</nav>

<%--<%=String.format("%s/%s", context, pageBody)%>--%>
<div class="container">
    <jsp:include page="<%= pageBody %>"/>
</div>


<footer class="page-footer purple darken-4">
    <div class="container">
        <div class="row">
            <div class="col l6 s12">
                <h5 class="white-text">Footer Content</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer
                    content.</p>
            </div>
            <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <div class="container">
            © 2014 Copyright Text
            <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
    </div>
</footer>


<!-- Modal Structure -->
<div id="auth-modal" class="modal">
    <div class="modal-content">
        <h4>Автентифікація на сайті</h4>
        <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
        <a href="<%=context%>/signup" class="modal-close waves-effect deep-purple darken-4 btn-flat">Реєстрація</a>
        <a href="#!" class="modal-close waves-effect deep-purple darken-2 btn-flat">Вхід</a>
    </div>
</div>


<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<%--Site JS--%>
<script src="<%=context%>/js/site.js"></script>
</body>
</html>
