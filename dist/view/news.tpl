{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>新闻中心</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/news_2a73fc7d35.css"/>
{% endblock %}

{% block layoutContainer %}
    <div class="toppic">
      <div class="am-container-1">
          <div class="toppic-title left">
              <i class="am-icon-paper-plane toppic-title-i">
              </i>
              <span class="toppic-title-span">
                  新闻中心
              </span>
              <p>
                  About Us
              </p>
          </div>
          <div class="right toppic-progress">
              <span>
                  <a href="/" class="w-white">
                      首页
                  </a>
              </span>
              <i class=" am-icon-arrow-circle-right w-white">
              </i>
              <span>
                  <a href="/news" class="w-white">
                      新闻中心
                  </a>
              </span>
          </div>
      </div>
</div>
 <div style="padding: 200px 100px; color: #999">新闻中心</div> 
{% endblock %}

<script src="/public/scripts/news_a8c078cc51.js"></script>

</html>