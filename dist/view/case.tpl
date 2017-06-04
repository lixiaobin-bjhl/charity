{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>客户案例</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/case_d41d8cd98f.css"/>
{% endblock %}

{% block layoutContainer %}
   
    <div class="toppic">
      <div class="am-container-1">
          <div class="toppic-title left">
              <i class="am-icon-paper-plane toppic-title-i">
              </i>
              <span class="toppic-title-span">
                  客户案例
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
                  <a href="/case" class="w-white">
                      客户案例
                  </a>
              </span>
          </div>
      </div>
  </div>

 <div style="padding: 200px 100px; color: #999">客户案例</div> 
{% endblock %}

{% block script %}
<script src="/public/scripts/case_8890d61520.js"></script>
{% endblock %}

</html>