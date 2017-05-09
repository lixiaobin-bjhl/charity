{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>解决方案</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/solution.css"/>
{% endblock %}

{% block layoutContainer %}
     <div class="page-header">
        <div class="am-container">
            <h1 class="page-header-title">解决方案</h1>
        </div>
    </div>

     <div class="breadcrumb-box">
        <div class="am-container">
            <ol class="am-breadcrumb">
            <li><a href="/">首页</a></li>
            <li class="am-active">解决方案</li>
            </ol>
        </div>
    </div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>

{% endblock %}

<script src="/public/scripts/solution.bundle.js"></script>

</html>