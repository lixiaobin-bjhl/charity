{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>加入我们</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/join.css"/>
{% endblock %}

{% block layoutContainer %}
  <div class="toppic">
      <div class="am-container-1">
          <div class="toppic-title left">
              <i class="am-icon-paper-plane toppic-title-i">
              </i>
              <span class="toppic-title-span">
                  加入我们
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
                  <a href="/join" class="w-white">
                      加入我们
                  </a>
              </span>
          </div>
      </div>
</div>

<div style="padding: 200px 100px; color: #999">加入我们</div> 

{% endblock %}
{% block script %}
<script src="/public/scripts/join.bundle.js"></script>
{% endblock %}
</html>