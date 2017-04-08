{% extends "./common/base.tpl" %}

{% block title %}
    <title>home</title>
{% endblock %}

{% block body %}
    {% for item in list %} 
        <div>
            {{ item.title }} 
        </div>
    {% endfor %}
{% endblock %}

<script src="/public/scripts/home.bundle.js"></script>

</html>