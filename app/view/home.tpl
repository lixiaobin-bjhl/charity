{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>首页</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/home.css"/>
{% endblock %}

{% block layoutContainer %}
    
    <div class="rollpic" style="min-height: 380px;">
        <div data-am-widget="slider" class="am-slider am-slider-default" data-am-slider='{}' >
            <ul class="am-slides">
                <li><img src="public/img/hw_bg1.png"/></li>
                <li><img src="public/img/hw_bg.png"/></li>  	
                <li><img src="public/img/hw_bg3.png"/></li>
            </ul>
        </div>
    </div>

<div class="am-container-1">
	<div class="solutions part-all">
		<div class="part-title">
			<a href="solutions.html">
			<i class="am-icon-lightbulb-o part-title-i"></i>
			<span class="part-title-span">解决方案</span>
			<p>Solutions</p>
			</a>
		</div>
		<ul class="am-g part-content solutions-content">
		  <li class="am-u-sm-6 am-u-md-3 am-u-lg-3">
		  	<i class="am-icon-safari solution-circle"></i>
		  	<span class="solutions-title">网站、移动网站</span>
		  	<p class="solutions-way">微信公众号开发移动网站微信公众号开发</p>
		  </li>
		  <li class="am-u-sm-6 am-u-md-3 am-u-lg-3">
		  	<i class="am-icon-magic solution-circle"></i>
		  	<span class="solutions-title">网站、移动网站</span>
		  	<p class="solutions-way">移动网站微信公众号开发移动网站微信公众号开发,解决方案</p>
		  </li>
		  <li class="am-u-sm-6 am-u-md-3 am-u-lg-3">
		  	<i class="am-icon-phone solution-circle"></i>
		  	<span class="solutions-title">网站、移动网站</span>
		  	<p class="solutions-way">移动网站微信公众号开发移动网站微信公众号开发</p>
		  </li>
		  <li class="am-u-sm-6 am-u-md-3 am-u-lg-3">
		  	<i class="am-icon-hacker-news solution-circle"></i>
		  	<span class="solutions-title">网站、移动网站</span>
		  	<p class="solutions-way">网站、移动网站微信公众号开发移动网站微信公众号开发,解决方案</p>
		  </li>
		  
		</ul>
		
	</div>
	</div>
	<div class="gray-li">
	<div class="customer-case part-all ">
		<div class="part-title">
			<a href="customer-case.html">
			<i class=" am-icon-briefcase part-title-i"></i>
			<span class="part-title-span">客户案例</span>
			<p>Customer Case</p>
			</a>
		</div>
	
	
		 <ul data-am-widget="gallery" class=" am-avg-sm-1
  am-avg-md-4 am-avg-lg-4 am-gallery-bordered customer-case-content" >
      <li class="case-li am-u-sm-6 am-u-md-6 am-u-lg-3">
        <div class="am-gallery-item case-img1">
            <a href="#" >
              <img src="public/img/app1.png"  />
                
            </a>
        </div>
        <div class="case-li-mengban">
        	<div class=" case-word">
              <h3 class="am-gallery-title">响应式商城</h3>
              <p>2015-06-11</p>
              <a><span><i class="am-icon-eye"></i>查看更多</span></a>
           </div>
        </div>
      </li>
      <li class="case-li am-u-sm-6 am-u-md-6 am-u-lg-3">
        <div class="am-gallery-item case-img1">
            <a href="#" >
              <img src="public/img/app2.png"  />              
            </a>
        </div>
        <div class="case-li-mengban">
        	<div class=" case-word">
              <h3 class="am-gallery-title">物流红娘</h3>
              <p>2015-06-11</p>
              <a><span><i class="am-icon-eye"></i>查看更多</span></a>
           </div>
        </div>
      </li>
      <li class="case-li am-u-sm-6 am-u-md-6 am-u-lg-3">
        <div class="am-gallery-item case-img1">
            <a href="#" >
              <img src="public/img/app3.png"  />             
            </a>
        </div>
        <div class="case-li-mengban">
        	<div class=" case-word">
              <h3 class="am-gallery-title">车型湖北</h3>
              <p>2015-06-11</p>
              <a><span><i class="am-icon-eye"></i>查看更多</span></a>
           </div>
        </div>
      </li>
      <li class="case-li am-u-sm-6 am-u-md-6 am-u-lg-3">
        <div class="am-gallery-item case-img1">
            <a href="#" >
              <img src="public/img/app4.png"  />             
            </a>
        </div>
        <div class="case-li-mengban">
        	<div class=" case-word">
              <h3 class="am-gallery-title">管理系统</h3>
              <p>2015-06-11</p>
              <a><span><i class="am-icon-eye"></i>查看更多</span></a>
           </div>
        </div>
      </li>
      <li class="case-li am-u-sm-6 am-u-md-6 am-u-lg-3">
        <div class="am-gallery-item case-img1">
            <a href="#" >
              <img src="public/img/app5.png"  />              
            </a>
        </div>
        <div class="case-li-mengban">
        	<div class=" case-word">
              <h3 class="am-gallery-title">智众商城</h3>
              <p>2015-06-11</p>
              <a><span><i class="am-icon-eye"></i>查看更多</span></a>
           </div>
        </div>
      </li>
      <li class="case-li am-u-sm-6 am-u-md-6 am-u-lg-3">
        <div class="am-gallery-item case-img1">
            <a href="#" >
              <img src="public/img/app6.png"  />                
            </a>
        </div>
        <div class="case-li-mengban">
        	<div class=" case-word">
              <h3 class="am-gallery-title">汇众商城</h3>
              <p>2015-06-11</p>
              <a><span><i class="am-icon-eye"></i>查看更多</span></a>
           </div>
        </div>
      </li>
      <li class="case-li am-u-sm-6 am-u-md-6 am-u-lg-3">
        <div class="am-gallery-item case-img1">
            <a href="#" >
              <img src="public/img/app7.png"  />                
            </a>
        </div>
        <div class="case-li-mengban">
        	<div class=" case-word">
              <h3 class="am-gallery-title">无鞋网</h3>
              <p>2015-06-11</p>
              <a><span><i class="am-icon-eye"></i>查看更多</span></a>
           </div>
        </div>
      </li>
      <li class="case-li am-u-sm-6 am-u-md-6 am-u-lg-3">
        <div class="am-gallery-item case-img1">
            <a href="#" >
              <img src="public/img/app8.png"  />               
            </a>
        </div>
        <div class="case-li-mengban">
        	<div class=" case-word">
              <h3 class="am-gallery-title">响应式商城</h3>
              <p>2015-06-11</p>
              <a><span><i class="am-icon-eye"></i>查看更多</span></a>
           </div>
        </div>
      </li>
      
  </ul>
		<div class="lan-bott">
			<div class="left"><span>全方位解决方案,为您轻松解决不同问题</span>
				<p>A full range of solutions for you to solve different problems</p>
			</div>
			<div class="right">
				<a href="customer-case.html">
					<span class="see-more">查看更多<i class="am-icon-angle-double-right"></i></span>
				</a>
			</div>
			<div class="clear"></div>
		</div>
		<div class="part-title">
		    	
		</div>
		</div>
</div>	

{% endblock %}

{% block script %}
<script src="/public/scripts/home.bundle.js"></script>
{% endblock %}

</html>