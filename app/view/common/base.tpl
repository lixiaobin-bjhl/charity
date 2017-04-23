<html lang="zh">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> {% block title %}
    <title>charity</title>
    {% endblock %}
    <meta charset="utf-8">
    <meta name="robots" content="NOINDEX,NOFOLLOW">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="HandheldFriendly" content="true">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="renderer" content="webkit">
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-default/index.css">

</head>

<body>
    {% if user %}
        <div class=“header“>
            欢迎你：{{user.name}}<a href="/admin/logout">退出</a>
        </div>
    {% endif %}
    <div class="site-content">
        {% block body %}
        please input site content
        {% endblock %}
    </div>

    {% block footer %}
        <div class="footer">
            COPYRIGHT (©) 2017 菠萝蜜 网站模板 - 智能建站 - 企业建站 - CMS内空管理系统
            <a class="beian" href="http://www.miitbeian.gov.cn/" target="_blank">鄂ICP备15002492</a>
        </div>
    {% endblock  %}

    {% block commonScript %}
       <script src="/public/scripts/vendor.bundle.js"></script>
    {% endblock %}
</body>

</html>