<template>
    <div class="login-wrap">
        <div class="login">
            <div class="login-logo">
                <img src="/public/img/logo.png" style="width:250px; height:auto;" alt="logo">
            </div>
            <form ref="form" @keyup.enter="onSubmit" :model="form" label-width="80px">
                <div class="form-li">
                    <span class="icon-account"></span>
                    <input type="text" id="accountname" name="accountname" placeholder="请输入手机号" v-model="form.mobile">
                </div>
                
                <div class="form-li">
                    <span class="icon-lock"></span>
                    <input type="password" id="password" name="password" placeholder="请输入密码" v-model="form.password">
                </div>
                <div class="form-li">
                    <input class="btn-submit" name="commit" type="button" value="登录" @click="onSubmit">
                </div> 
            </form>
        </div>
    </div>
</template>

<script>

    import { login } from './request';
    import md5 from 'md5';
    import redirect from '../../../app/public/scripts/function/redirect';
    require('./style.scss');
    
    export default {
        data() {
            return {
                form: {
                    mobile: '',
                    password: ''
                }
            }
        },
        methods: {
            /**
             * 登录 
             */
            onSubmit () {
                var form = this.form;
                var mobile = form.mobile.trim();
                var password = form.password.trim();
                
                if (!mobile) {
                    this.$message({
                        message: '请输入手机号',
                        type: 'warning'
                    });
                    return;
                }

                if (!password) {
                     this.$message({
                            message: '请输入密码',
                            type: 'warning'
                        });
                    return;
                }

                var params = {
                    mobile: mobile,
                    password: md5(password)
                };
                login(params)
                    .then(()=> {
                        redirect('/admin/');
                    }, ()=> {
                        this.$message({
                            message: '用户名或密码错误',
                            type: 'warning'
                        });
                    });
            }
        }
    }

</script>