<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
    {% block title %}
        <title>charity</title>
    {% endblock %}
    <meta charset="utf-8">
    <meta name="robots" content="NOINDEX,NOFOLLOW">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="HandheldFriendly" content="true">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="renderer" content="webkit">
    <link rel="shortcut icon" href="http://opdjozubd.bkt.clouddn.com/favicon.ico" />
    <link rel="stylesheet" href="/public/scripts/common_2694f27e0f.css"/>
    {% block css %}
    {% endblock %}
</head>

<body>
    {% if userStr %}
       <script>
            window.authority = {{authority|safe}}
            window.user = {{userStr|safe}}
       </script> 
    {% endif %}
    <div class="site-content">
        {% block body %}
        please input site content
        {% endblock %}
    </div>

    {% block footer %}
        <div class="bfooter">
            COPYRIGHT (©) 2017 舍利果 微信小程序平台 - CMS内空管理系统
            <a class="beian" href="http://www.miitbeian.gov.cn/" target="_blank">鄂ICP备15002492</a>
        </div>
    {% endblock  %}

    {% block commonScript %}
        {% if env === 'production' %}
            <script src="/public/vendor_5063101692.js"></script>
        {% else %}
            <script src="/public/scripts/vendor.dll.js"></script>
        {% endif %}
        <script src="/public/scripts/common_87f8d97e8a.js"></script>
    {% endblock %}
    {% block script %}
    {% endblock %}
</body>
</body>

</html>