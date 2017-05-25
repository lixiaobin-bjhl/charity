{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>关于我们</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/about.css"/>
{% endblock %}

{% block layoutContainer %}
   
<div class="toppic">
      <div class="am-container-1">
          <div class="toppic-title left">
              <i class="am-icon-paper-plane toppic-title-i">
              </i>
              <span class="toppic-title-span">
                  关于我们
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
                  <a href="/about" class="w-white">
                      关于我们
                  </a>
              </span>
          </div>
      </div>
</div>

<div style="padding: 200px 100px; color: #999">关于我们</div> 

{% endblock %}

<script src="/public/scripts/about.bundle.js"></script>

</html>