<!--
  @fileOverview charity-cms-account 添加用户
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <el-dialog :title="account ? '编辑用户' : '新增用户'" v-model="$parent.addState" size="small">
        <el-form label-width="100px" :model="form" :rules="rules" ref="form" v-loading="loading">
            <el-form-item label="用户姓名" required prop="name">
                <el-input placeholder="请输入1-10字内的用户姓名" :maxlength="10" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="headPic">
                <upload @change="changeAccountImage">
                    <el-button type="primary" v-text="form.headPic ? '修改头像' : '上传头像'"></el-button>
                </upload>
                <el-input type="hidden" v-model="form.headPic"></el-input>
                <div v-if="form.headPic" style="margin-top: 10px">
                    <img width="100" height="100" :src="form.headPic|compressImage(100, 100)">
                </div>
            </el-form-item>
            <el-form-item label="手机号" required prop="mobile">
                <el-input placeholder="请输入用户密码" :disabled="account" :maxlength="11" v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="密码" v-if="!account" required prop="password">
                <el-input placeholder="请输入用户密码" :maxlength="30" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="账号类型" required prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio :label="item.id"  v-for="item in accountTypeOption" :disabled="currentAccount.type == 2 || (currentAccount.type == 1 && item.id <= 1)" :key="item.id">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="主账号手机" required prop="masterMobile" v-if="form.type == 2">
                 <el-input placeholder="请输入主账号手机" :disabled="currentAccount.type == 1 " :maxlength="11" v-model="form.masterMobile"></el-input>
            </el-form-item>
            <el-form-item label="所属角色" required prop="roleId">
                <el-radio-group v-model="form.roleId">
                    <el-radio :label="item._id" v-for="item in roleList" :key="item._id">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input placeholder="请输入用户摘要" type="textarea" :maxlength="100" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" :disabled="submiting" @click.native.prevent="submit">保存</el-button>
        </span>
    </el-dialog>
</template>
<script>

    import { add, update } from '../request';
    import config from '../config';
    import Upload from '../../../common/components/Upload.vue';
    import  { uptoken, upload } from '../request';
    import * as roleRquest from '../../role/request';
    import md5 from 'md5';

    export default {
        data () {
            return {
                uploadURL: '',
                currentAccount: window.account,
                form: {
                    name: '',
                    headPic: '',
                    password: '',
                    mobile: '',
                    remark: '',
                    roleId: '',
                    type: '',
                    // 如果当前账号是主账号，主账号就是他自己
                    masterMobile: window.account.type == 1 ? window.account.mobile : ''
                },
                loading: false,
                accountTypeOption: config.accountTypeOption,
                rules: config.addFormRule,
                roleList: [],
                submiting: false
            };
        },
        computed: {
            account () {
                return this.$store.state.account.account || null;
            }
        },
        created () {
            var account = this.account;
            this.getRoleList();
            
            if (account) {
                Object.assign(this.form, {
                    name: account.name,
                    remark: account.remark,
                    headPic: account.headPic,
                    mobile: account.mobile,
                    type: account.type,
                    masterMobile: account.masterMobile,
                    roleId: account.roleId
                });
            }
        },
        methods: {
            /**
             * 改变用户图片
             */
            changeAccountImage (files) {
                if (!files) {
                    return;
                }
                var file = files[0];
                var fd = new FormData();
                
                fd.append('file', file);
                uptoken()
                    .then((res)=> {
                        var token = res.data.token;
                        fd.append('token', token);
                        this.loading = true;
                        upload(fd)
                            .then((res)=> {
                                this.form.headPic = res.key;
                                this.loading = false;
                                toast('图片上传成功', 'success');
                            })
                            .catch(()=> {
                                this.loading = false;
                            });
                    });
            },
            /**
             * 获取用户分类列表
             */
            getRoleList () {
                roleRquest.list()
                    .then((res)=> {
                        this.roleList = res.data.list;
                    });
            },
            /**
             * 取消添加分类
             */
            cancel () {
                this.$parent.addState = false;
            },
            /**
             * 提交数据
             */
            submit() {
                this.$refs['form'].validate((valid) => {
				    if (valid) {
                        var form = this.form;
                        var account = this.account;
                        var handler = null;
                        var params = {
                            name: form.name,
                            mobile: form.mobile,
                            type: form.type,
                            remark: form.remark,
                            masterMobile: form.masterMobile,
                            headPic: form.headPic,
                            roleId: form.roleId
                        };
                        // 编辑
                        if (account) {
                            handler = update.bind(null, account._id, params);
                        } else {
                            params.password = md5(form.password.trim());
                            handler = add.bind(null, params);
                        }
                        handler()
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.$emit('save');
                            this.cancel();
                        })
                        .catch(()=> {
                           this.submiting = false;
                        });
                    }
                });
            }
        },
        beforeDestroy() {
            this.$store.commit('RESET_ACCOUNT');
        },
        components: {
            Upload
        }
    };
</script>