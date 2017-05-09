<html lang="zh">

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
    <link rel="stylesheet" href="/public/scripts/cvendor.css"/>
    {% block css %}
    {% endblock %}
</head>

<body>
     <div class="layout">
        <div class="layout-header am-hide-sm-only">
            <!--topbar start-->
            <div class="topbar">
                <div class="container">
                    <div class="am-g">
                        <div class="am-u-md-3">
                            <div class="topbar-left">
                                <i class="icon-globe"></i>
                                <div class="am-dropdown" data-am-dropdown="">
                                    <button class="am-btn am-btn-primary am-dropdown-toggle" data-am-dropdown-toggle="">Language
                                        <span class="icon-caret-down"></span></button>
                                    <ul class="am-dropdown-content">
                                        <li>
                                            <a href="#">English</a></li>
                                        <li class="am-divider"></li>
                                        <li>
                                            <a href="#">Chinese</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="am-u-md-9">
                            <div class="topbar-right am-text-right am-fr">Follow us
                                <i class="icon-facebook"></i>
                                <i class="icon-twitter"></i>
                                <i class="icon-google-plus"></i>
                                <i class="icon-pinterest"></i>
                                <i class="icon-instagram"></i>
                                <i class="icon-linkedin"></i>
                                <i class="icon-youtube-play"></i>
                                <i class="icon-rss"></i>
                                <a href="/login">登录</a>
                                <a href="/register">注册</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--topbar end-->
            <div class="header-box" data-am-sticky="">
                <!--header start-->
                <div class="container">
                    <div class="header">
                        <div class="am-g">
                            <div class="am-u-lg-2 am-u-sm-12">
                                <div class="logo">
                                    <a href="">
                                        <img src="/public/img/logo.png" alt="" /></a>
                                </div>
                            </div>
                            <div class="am-u-md-10">
                                <div class="header-right am-fr">
                                    <div class="header-contact">
                                        <div class="header_contacts--item">
                                            <div class="contact_mini">
                                                <i style="color:#7c6aa6" class="contact-icon icon-phone"></i>
                                                <strong>0 (855) 233-5385</strong>
                                                <span>周一~周五, 8:00 - 20:00</span></div>
                                        </div>
                                        <div class="header_contacts--item">
                                            <div class="contact_mini">
                                                <i style="color:#7c6aa6" class="contact-icon icon-envelope-o"></i>
                                                <strong>cn@yunshipei.com</strong>
                                                <span>随时欢迎您的来信！</span></div>
                                        </div>
                                        <div class="header_contacts--item">
                                            <div class="contact_mini">
                                                <i style="color:#7c6aa6" class="contact-icon icon-map-marker"></i>
                                                <strong>天使大厦,</strong>
                                                <span>海淀区海淀大街27</span></div>
                                        </div>
                                    </div>
                                    <a href="/contact" class="contact-btn">
                                        <button type="button" class="am-btn am-btn-secondary am-radius">联系我们</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--header end-->
                <!--nav start-->
                <div class="nav-contain">
                    <div class="nav-inner">
                        <ul class="am-nav am-nav-pills am-nav-justify">
                            <li class="">
                                <a href="/">首页</a></li>
                            <li>
                                <a href="/product">产品中心</a>
                                <ul class="sub-menu">{% for item in productSubject %}
                                    <li class="menu-item">
                                        <a href="/product/subject/11">{{item.name}}</a></li>{% endfor %}</ul>
                            </li>
                            <li>
                                <a href="/case">客户案例</a></li>
                            <li>
                                <a href="/solution">解决方案</a></li>
                            <li>
                                <a href="/news">新闻中心</a>
                                <!-- sub-menu start-->
                                <ul class="sub-menu">{% for item in newsSubject %}
                                    <li class="menu-item">
                                        <a href="/product/subject/11">{{item.name}}</a></li>{% endfor %}</ul>
                                <!-- sub-menu end--></li>
                            <li>
                                <a href="/about">关于我们</a></li>
                            <li>
                                <a href="/join">加入我们</a></li>
                            <li>
                                <a href="/contact">联系我们</a></li>
                        </ul>
                    </div>
                </div>
                <!--nav end--></div>
        </div>

        <div class="m-header">
            <div class="am-g am-show-sm-only">
                <div class="am-u-sm-2">
                    <div class="menu-bars">
                        <a href="#doc-oc-demo1" data-am-offcanvas="{effect: 'push'}">
                            <i class="am-menu-toggle-icon icon-bars"></i>
                        </a>
                        <!-- 侧边栏内容 -->
                        <nav data-am-widget="menu" class="am-menu  am-menu-offcanvas1" data-am-menu-offcanvas>
                            <a href="javascript: void(0)" class="am-menu-toggle"></a>
                            <div class="am-offcanvas">
                                <div class="am-offcanvas-bar">
                                    <ul class="am-menu-nav am-avg-sm-1">
                                        <li>
                                            <a href="/" class="">首页</a></li>
                                        <li class="am-parent">
                                            <a href="#" class="">产品中心</a>
                                            <ul class="am-menu-sub am-collapse ">
                                                {% for item in productSubject %}
                                                    <li>
                                                        <a href="/product/subject/11">{{item.name}}</a>
                                                    </li>
                                                {% endfor %}
                                            </ul>
                                        </li>
                                        <li class="">
                                            <a href="/example" class="">客户案例</a></li>
                                        <li class="">
                                            <a href="/solution" class="">解决方案</a></li>
                                        <li class="am-parent">
                                            <a href="/news" class="">新闻中心</a>
                                            <ul class="am-menu-sub am-collapse  ">
                                                {% for item in newsSubject %}
                                                    <li>
                                                        <a href="/product/subject/11">{{item.name}}</a>
                                                    </li>
                                                {% endfor %}
                                            </ul>
                                        </li>
                                        <li class="">
                                            <a href="/about" class="">关于我们</a></li>
                                        <li class="">
                                            <a href="/join" class="">加入我们</a></li>
                                        <li class="">
                                            <a href="/contact" class="">联系我们</a></li>
                                        <li class="am-parent">
                                            <a href="" class="nav-icon nav-icon-globe">Language</a>
                                            <ul class="am-menu-sub am-collapse  ">
                                                <li>
                                                    <a href="#">English</a></li>
                                                <li class="">
                                                    <a href="#">Chinese</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-share-contain">
                                            <div class="nav-share-links">
                                                <i class="icon-facebook"></i>
                                                <i class="icon-twitter"></i>
                                                <i class="icon-google-plus"></i>
                                                <i class="icon-pinterest"></i>
                                                <i class="icon-instagram"></i>
                                                <i class="icon-linkedin"></i>
                                                <i class="icon-youtube-play"></i>
                                                <i class="icon-rss"></i>
                                            </div>
                                        </li>
                                        <li class="">
                                            <a href="/login" class="">登录</a></li>
                                        <li class="">
                                            <a href="/register" class="">注册</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div class="am-u-sm-5 am-u-end">
                    <div class="m-logo">
                        <a href="">
                            <img src="/public/img/logo.png" alt=""></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="layout-container">
            {% block layoutContainer %}
                layoutContainer
            {% endblock %}        
        </div>

        <div class="layout-footer">
            {% block layoutFooter %}
                <div class="footer">
                    <div style="background-color:#383d61" class="footer--bg"></div>
                    <div class="footer--inner">
                        <div class="container">
                            <div class="footer_main">
                                <div class="am-g">
                                    <div class="am-u-md-3 ">
                                        <div class="footer_main--column">
                                            <strong class="footer_main--column_title">关于我们</strong>
                                            <div class="footer_about">
                                                <p class="footer_about--text">云适配(AllMobilize Inc.) 是全球领先的HTML5企业移动化解决方案供应商，由前微软美国总部IE浏览器核心研发团队成员及移动互联网行业专家在美国西雅图创立.</p>
                                                <p class="footer_about--text">云适配跨屏云也成功应用于超过30万家企业网站，包括微软、联想等世界500强企业</p></div>
                                        </div>
                                    </div>
                                    <div class="am-u-md-3 ">
                                        <div class="footer_main--column">
                                            <strong class="footer_main--column_title">产品中心</strong>
                                            <ul class="footer_navigation">
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">Enterplorer 企业浏览器</a></li>
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">Xcloud 网站跨屏云</a></li>
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">Amaze UI 前端开发框架</a></li>
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">Amaze UI 前端开发框架</a></li>
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">Amaze UI 前端开发框架</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="am-u-md-3 ">
                                        <div class="footer_main--column">
                                            <strong class="footer_main--column_title">技术支持</strong>
                                            <ul class="footer_navigation">
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">企业移动信息化白皮书</a></li>
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">企业移动信息化白皮书</a></li>
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">企业移动信息化白皮书</a></li>
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">企业移动信息化白皮书</a></li>
                                                <li class="footer_navigation--item">
                                                    <a href="#" class="footer_navigation--link">企业移动信息化白皮书</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="am-u-md-3 ">
                                        <div class="footer_main--column">
                                            <strong class="footer_main--column_title">联系详情</strong>
                                            <ul class="footer_contact_info">
                                                <li class="footer_contact_info--item">
                                                    <i class="icon-phone"></i>
                                                    <span>服务专线：400 069 0309</span></li>
                                                <li class="footer_contact_info--item">
                                                    <i class="icon-envelope-o"></i>
                                                    <span>yunshipei.com</span></li>
                                                <li class="footer_contact_info--item">
                                                    <i class="icon-map-marker"></i>
                                                    <span>北京市海淀区海淀大街27号天使大厦（原亿景大厦）三层</span></li>
                                                <li class="footer_contact_info--item">
                                                    <i class="icon-clock-o"></i>
                                                    <span>Monday - Friday, 9am - 6 pm;</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {% endblock %}
        </div>

     </div> 

    {% block commonScript %}
       <script src="/public/scripts/cvendor.bundle.js"></script>
    {% endblock %}
</body>

</html>