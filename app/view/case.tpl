{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>客户案例</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/case.css"/>
{% endblock %}

{% block layoutContainer %}
    <div class="page-header">
        <div class="am-container">
            <h1 class="page-header-title">客户案例</h1>
        </div>
    </div>

     <div class="breadcrumb-box">
        <div class="am-container">
            <ol class="am-breadcrumb">
            <li><a href="/">首页</a></li>
            <li class="am-active">客户案例</li>
            </ol>
        </div>
    </div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
{% endblock %}

<script src="/public/scripts/case.bundle.js"></script>

</html>