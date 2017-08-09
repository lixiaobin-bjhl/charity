{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>AppMoon-产品中心</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/product_d41d8cd98f.css"/>
{% endblock %}

{% block layoutContainer %}
<div class="toppic">
      <div class="am-container-1">
          <div class="toppic-title left">
              <i class="am-icon-paper-plane toppic-title-i">
              </i>
              <span class="toppic-title-span">
                  产品中心
              </span>
              <p>
                Product
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
                  <a href="/product" class="w-white">
                      产品中心
                  </a>
              </span>
          </div>
      </div>
</div>

<div style="padding: 200px 100px; color: #999">产品中心</div> 
{% endblock %}

{% block script %}
<script src="/public/scripts/product_be543fcca9.js"></script>
{% endblock %}
</html>