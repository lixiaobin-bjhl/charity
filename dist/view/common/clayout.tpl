<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
    {% block title %}
        <title>AppMoon</title>
    {% endblock %}
    <meta charset="utf-8">
    <meta name="description" content="AppMoon微信小程序生成平台">
    <meta name="keywords" content="AppMoon,微信小程序">
    <meta name="robots" content="NOINDEX,NOFOLLOW">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="HandheldFriendly" content="true">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="renderer" content="webkit">
    <link rel="shortcut icon" href="http://otzuzbqja.bkt.clouddn.com/favicon6.ico" />
    <link rel="stylesheet" href="/public/scripts/ccommon_1a744dd603.css"/>
    {% block css %}
    {% endblock %}
</head>

<body>
    <header class="am-topbar header">
        <div>
            <div class="left hw-logo">
               <a href="/" class="logo">
                     <span class="icon icon-moon"></span><span>AppMoon</span>
               </a>
            </div>
            <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only"
                data-am-collapse="{target: '#doc-topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span
            class="am-icon-bars"></span>
            </button>
        <div class="am-collapse am-topbar-collapse right" id="doc-topbar-collapse">
            <div class=" am-topbar-left am-form-inline am-topbar-right" role="search">
                <ul class="am-nav am-nav-pills am-topbar-nav hw-menu">
                    <li><a {% if page=='home' %} class="hw-menu-active" {% endif %} href="/">首页</a></li>
                    <li><a href="/solution" {% if page=='solution' %} class="hw-menu-active" {% endif %}>解决方案</a></li>
                    {#<li><a href="/product"  {% if page=='product' %} class="hw-menu-active" {% endif %}>产品中心</a></li>#}
                    {#<li><a {% if page=='case' %} class="hw-menu-active" {% endif %} href="/case">客户案例</a></li>#}
                    {#<li><a href="service-center.html">服务中心 </a></li>#}
                    {#<li><a {% if page=='news' %} class="hw-menu-active" {% endif %} href="/new">新闻中心</a></li>#}
                    <li><a {% if page=='about' %} class="hw-menu-active" {% endif %} href="/about" >关于我们</a></li>
                    <li><a {% if page=='contact' %} class="hw-menu-active" {% endif %} href="/contact">联系我们</a></li>
                    <li><a {% if page=='team' %} class="hw-menu-active" {% endif %} href="/team">团队介绍</a></li>
                    <li><a href="/admin/login">AppMoon</a></li>
                </ul>
            </div>
        </div>
    </div>
    </header>

    <div class="layout-container">
        {% block layoutContainer %}
            layoutContainer
        {% endblock %}        
    </div>

    {% block layoutFooter %}
        <footer class="footer ">
            <ul>
                <li class="am-u-lg-4 am-u-md-4 am-u-sm-12 part-5-li2">
                    <div class="part-5-title">联系我们</div>
                    <div class="part-5-words2">
                        <span>地址：武汉市洪山区南湖大道53号南湖创业园</span>
                        <span>电话：18610720740</span>
                        <span>邮箱：lixiaobin8878@gmail.com</span>
                    </div>
                </li>
                <li class="am-u-lg-4 am-u-md-4 am-u-sm-12 ">
                    <div class="part-5-title">友情链接</div>
                    <div class="part-5-words2">
                        <ul class="part-5-words2-ul">
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="https://m.kuaidi100.com/" target="_blank">快递查询</a></li>
                            {#<li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/product">产品中心</a></li>#}
                            {#<li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/case">客户案例</a></li>#}
                            {#<li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="service-center.html">服务中心</a></li>#}
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/team">团队介绍</a></li>
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/about">关于我们</a></li>
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/join">加入我们</a></li>
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/admin/">AppMoon</a></li>
                            <div class="clear"></div>
                        </ul>
                    </div>
                </li>
            </ul>
        </footer> 
    {% endblock %}
    {% block commonScript %}
        {% if env === 'production' %}
            <script src="/public/cvendor_9e5dff54cd.js"></script>
        {% else %}
            <script src="cvendor.js"></script>
        {% endif %}
        <script src="/public/scripts/ccommon_1467c85025.js"></script>
    {% endblock %}

    {% block script %}
    {% endblock %}
</body>

</html>