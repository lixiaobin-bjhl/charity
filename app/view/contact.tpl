{% extends "./common/clayout.tpl" %}

{% block title %}
    <title>联系我们</title>
{% endblock %}

{% block css %}
     <link rel="stylesheet" href="/public/scripts/contact.css"/>
{% endblock %}

{% block layoutContainer %}
     <div class="page-header">
        <div class="am-container">
            <h1 class="page-header-title">联系我们</h1>
        </div>
    </div>

    <div class="breadcrumb-box">
        <div class="am-container">
            <ol class="am-breadcrumb">
            <li><a href="/">首页</a></li>
            <li class="am-active">联系我们</li>
            </ol>
        </div>
    </div>
   
   <div class="section" style="margin-top:0px;background-image: url('../assets/images/pattern-light.png');">
    <div class="container">
      <!--index-container start-->
      <div class="index-container">
        <div class="am-g">
          <div class="am-u-md-4">
            <div class="contact_card">
							<i style="color:#59bcdb" class="contact_card--icon icon-phone"></i>
							<strong class="contact_card--title">Contact Us</strong>
							<p class="contact_card--text">Feel free to call us on <br> <strong>0 (855) 233-5385</strong> <br> Monday - Friday, 8am - 7pm</p>
              <button type="button" class="am-btn am-btn-secondary">Order a Call Back</button>
						</div>
          </div>
          <div class="am-u-md-4">
            <div class="contact_card">
							<i style="color:#59bcdb" class="contact_card--icon icon-envelope-o"></i>
							<strong class="contact_card--title">Our Email</strong>
							<p class="contact_card--text">Drop us a line anytime at <br> <strong><a href="mailto:info@financed.com">info@financed.com</a>,</strong> <br> and we’ll get back soon.</p>
              <button type="button" class="am-btn am-btn-secondary">Start Writing</button>
						</div>
          </div>
          <div class="am-u-md-4">
            <div class="contact_card">
							<i style="color:#59bcdb" class="contact_card--icon icon-map-marker"></i>
							<strong class="contact_card--title">Our Address</strong>
							<p class="contact_card--text">Come visit us at <br> <strong>Stock Building, New York,</strong> <br> NY 93459</p>
              <button type="button" class="am-btn am-btn-secondary">See the Map</button>
						</div>
          </div>
        </div>
      </div>
      <!--index-container end-->
    </div>
  </div>

{% endblock %}

<script src="/public/scripts/contact.bundle.js"></script>

</html>