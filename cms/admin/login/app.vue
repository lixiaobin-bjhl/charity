<template>
    <div class="login">
        <div class="login-logo">
	        <img src="/public/img/charity.png">
	    </div>
        <el-form ref="form" :model="form" label-width="80px">
            <div class="form-li">
	            <span class="icon-user"></span>
                 <input type="text" id="username" name="username" placeholder="请输入手机号" v-model="form.mobile">
	        </div>
            
            <div class="form-li">
                 <span class="icon-lock"></span>
                 <input type="password" id="password" name="password" placeholder="请输入密码" v-model="form.password">
            </div>
            <div class="form-li">
                <el-button class="btn-submit" type="primary" @click="onSubmit">登录</el-button>
           </div> 
        </el-form>
    </div>
</template>

<script>

    import { login } from './request';
    import md5 from 'md5';
    require('element-ui/lib/theme-default/index.css');
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
                var params = {
                    mobile: form.mobile.trim(),
                    password: md5(form.password.trim()),
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