<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
    {% block title %}
        <title>舍利果</title>
    {% endblock %}
    <meta charset="utf-8">
    <meta name="robots" content="NOINDEX,NOFOLLOW">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="HandheldFriendly" content="true">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="renderer" content="webkit">
    <link rel="shortcut icon" href="http://opdjozubd.bkt.clouddn.com/favicon.ico" />
    <link rel="stylesheet" href="/public/scripts/ccommon_f21ec7970b.css"/>
    {% block css %}
    {% endblock %}
</head>

<body>
    <header class="am-topbar header">
        <div class="am-container-1">
            <div class="left hw-logo" style="font-weight: bold; font-size: 24px; color: #3399ff;">
                舍利果   
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
                    <li><a href="/product"  {% if page=='product' %} class="hw-menu-active" {% endif %}>产品中心</a></li>
                    <li><a {% if page=='case' %} class="hw-menu-active" {% endif %} href="/case">客户案例</a></li>
                    {#<li><a href="service-center.html">服务中心 </a></li>#}
                    {#<li><a {% if page=='news' %} class="hw-menu-active" {% endif %} href="/new">新闻中心</a></li>#}
                    <li><a {% if page=='about' %} class="hw-menu-active" {% endif %} href="/about" >关于我们</a></li>
                    <li><a {% if page=='contact' %} class="hw-menu-active" {% endif %} href="/contact">联系我们</a></li>
                    <li><a {% if page=='join' %} class="hw-menu-active" {% endif %} href="/join">加入我们</a></li>
                    <li><a href="/admin/login">管理后台</a></li>
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
                        <span>地址:武汉市洪山区街道口鹏程国际B座2511</span>
                        <span>电话:18238765101</span>
                        <span>传真:(123) 456-7890</span>
                        <span>邮箱:support@vectorlab.com</span>
                        <span><i class="am-icon-phone"></i><em >027-82671661</em></span>
                    </div>
                </li>
                <li class="am-u-lg-4 am-u-md-4 am-u-sm-12 ">
                    <div class="part-5-title">相关链接</div>
                    <div class="part-5-words2">
                        <ul class="part-5-words2-ul">
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/solution">解决方案</a></li>
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/product">产品中心</a></li>
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/case">客户案例</a></li>
                            {#<li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="service-center.html">服务中心</a></li>#}
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/about">关于我们</a></li>
                            <li class="am-u-lg-4 am-u-md-6 am-u-sm-4"><a href="/join">加入我们</a></li>
                            <div class="clear"></div>
                        </ul>
                    </div>
                </li>
            </ul>
        </footer> 
    {% endblock %}
    {% block commonScript %}
        {% if env === 'production' %}
            <script src="/public/cvendor_8529412c9e.js"></script>
        {% else %}
            <script src="/public/scripts/cvendor.dll.js"></script>
        {% endif %}
        <script src="/public/scripts/ccommon_8d17ccd88d.js"></script>
    {% endblock %}

    {% block script %}
    {% endblock %}
</body>

</html>