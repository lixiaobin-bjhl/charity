{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>舍利果-关于我们</title>
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

<div class=" am-container-1">
	<div class="part-title part-title-mar">
			<a href="customer-case.html">
			<i class=" am-icon-paper-plane part-title-i"></i>
			<span class="part-title-span">关于舍利果</span>
			<p>About SheLiGuo</p>
			</a>
		</div>
	<div class="company-intro">
        <p>舍利果是微信小程序生成平台</p>
	</div>
</div>
<div class="gray-li company-thought-all" >
	<div class=" am-container-1">
			<ul class="company-thought">
				<li >
				  <div class="thought-all">
				  	<i class="am-icon-circle-o-notch"></i>
				  	<span>企业理念</span>
				  	<div class="thought-all-none">
				  	    <h5>专注 专业</h5>
				    </div>
				  </div>
				  
				</li>
				<li >
				  <div class="thought-all">
				  	<i class="am-icon-hand-o-right"></i>
				  	<span>服务理念</span>
				  	<div class="thought-all-none">
				  	    <h5>实务 用心</h5>
				    </div>
				  </div>	
				</li>
				<li >
				  <div class="thought-all">
				  	<i class="am-icon-bar-chart"></i>
				  	<span>发展方向</span>
				  	<div class="thought-all-none">
				  	    <h5>精益求精</h5>
				    </div>
				  </div>	
				</li>
				<div class="clear"></div>
			</ul>
		</div>
</div>


{% endblock %}

{% block script %}
<script src="/public/scripts/about.bundle.js"></script>
{% endblock %}

</html>