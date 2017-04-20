{% extends "../common/base.tpl" %}

{% block title %}
    <title>login</title>
{% endblock %}

{% block body %}
    {% if user %}
    <p>欢迎你：{{user.name}}</p>
    {% endif %}
    <div id="main"></div>
    <script src="/public/scripts/cmsLogin.bundle.js"></script>
{% endblock %}

</html>