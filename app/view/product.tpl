{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>产品中心</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/product.css"/>
{% endblock %}

{% block layoutContainer %}
    <div class="page-header">
        <div class="am-container">
            <h1 class="page-header-title">产品中心</h1>
        </div>
    </div>

     <div class="breadcrumb-box">
        <div class="am-container">
            <ol class="am-breadcrumb">
            <li><a href="/">首页</a></li>
            <li class="am-active">产品中心</li>
            </ol>
        </div>
    </div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>

{% endblock %}

<script src="/public/scripts/product.bundle.js"></script>

</html>