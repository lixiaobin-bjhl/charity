{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>AppMoon-团队介绍</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/team.css"/>
{% endblock %}

{% block layoutContainer %}
  <div class="toppic">
      <div class="am-container-1">
          <div class="toppic-title left">
              <i class="am-icon-street-view toppic-title-i">
              </i>
              <span class="toppic-title-span">
                  团队介绍
              </span>
              <p>
                  Team
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
                  <a href="/team" class="w-white">
                      团队介绍
                  </a>
              </span>
          </div>
      </div>
</div>

<div class=" am-container-1">
	<div class="part-title part-title-mar">
			<i class=" am-icon-street-view part-title-i"></i>
			<span class="part-title-span">团队介绍</span>
			<p>Team</p>
		</div>
</div>

 <div style="padding: 50px 100px 300px 100px; color: #999">团队介绍……</div> 

{% endblock %}
{% block script %}
<script src="/public/scripts/team.bundle.js"></script>
{% endblock %}
</html>