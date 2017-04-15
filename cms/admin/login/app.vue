<template>
    <div style="margin: 30px auto; width: 500px;">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
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
    
    export default {
        data() {
            return {
                form: {
                    name: '',
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
                    name: form.name.trim(),
                    password: form.password.trim(),
                };
                login(params);
            }
        }
    }

</script>