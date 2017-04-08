{% extends "./common/base.tpl" %}

{% block title %}
    <title>home</title>
{% endblock %}

{% block body %}
    <div class="news-view view">
        {% for item in list %} 
            <div>
                {{ item.title }} 
            </div>
        {% endfor %}
    </div>
{% endblock %}

<script src="/public/scripts/home.bundle.js"></script>

</html>