<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
    {% block title %}
        <title>AppMoon</title>
    {% endblock %}
    <meta charset="utf-8">
    <meta name="robots" content="NOINDEX,NOFOLLOW">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="HandheldFriendly" content="true">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="renderer" content="webkit">
    <link rel="shortcut icon" href="http://otzuzbqja.bkt.clouddn.com/favicon6.ico" />
    <link rel="stylesheet" href="/public/scripts/common_7c635d95c6.css"/>
    {% block css %}
    {% endblock %}
</head>

<body>
    {% if accountStr %}
       <script>
            window.authority = {{authority|safe}}
            window.account = {{accountStr|safe}}
       </script> 
    {% endif %}
    <div class="site-content">
        {% block body %}
        please input site content
        {% endblock %}
    </div>

    {% block footer %}
        <div class="bfooter">
            COPYRIGHT (©) 2017 AppMoon 微信小程序平台 - CMS内空管理系统
            <a class="beian" href="http://www.miitbeian.gov.cn/" target="_blank">鄂ICP备15002492</a>
        </div>
    {% endblock  %}

    {% block commonScript %}
        {% if env === 'production' %}
            <script src="/public/vendor_75ad403c1c.js"></script>
        {% else %}
            <script src="/public/scripts/vendor.dll.js"></script>
        {% endif %}
        <script src="/public/scripts/common_e559924a02.js"></script>
    {% endblock %}
    {% block script %}
    {% endblock %}
</body>
</body>

</html>