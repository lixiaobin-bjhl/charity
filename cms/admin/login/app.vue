<template>
    <div style="margin: 30px auto; width: 500px;">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="手机">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import { login } from './request';
    import md5 from 'md5';
    import redirect from '../../../app/public/scripts/function/redirect';
    require('element-ui/lib/theme-default/index.css');
    
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