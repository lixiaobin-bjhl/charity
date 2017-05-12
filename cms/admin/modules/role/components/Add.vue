<!--
  @fileOverview charity-cms-role 添加角色
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <el-dialog :title="role ? '编辑角色' : '新增角色'" class="add-role" v-model="$parent.addState" size="small">
        <el-form label-width="100px" :model="form" :rules="rules" ref="form" v-loading="loading">
            <el-form-item label="角色名称" required prop="name">
                <el-input placeholder="请输写角色名称" :maxlength="30" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备注" required prop="remark">
                <el-input placeholder="请填写备注" type="textarea" :maxlength="100" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="限权" required prop="authority">
                <el-input type="hidden"></el-input>
            </el-form-item>
            <div class="show-modules">
                <el-row :gutter="20">
                    <el-col :span="8" class="module" v-for="(item, key) in modules" :key="key">
                        <span class="el-tree-node__expand-icon" :class="{expanded: item.expand}" @click="expand(item)"></span>
                        <el-checkbox class="checkbox" @change="changeModuleSelected(item)" v-model="item.checked">{{item.name}}</el-checkbox>
                        <transition name="md-fade-bottom">
                            <ul v-show="item.expand">
                                <li v-for="sub in item.children" :key="sub.id">
                                    <el-checkbox-group v-model="item.checkedList">
                                        <el-checkbox class="checkbox" :label="sub.id">{{sub.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </li>
                            </ul>
                        </transition>
                    </el-col>
                </el-row>
            </div>
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
    import modules from '../../../../../config/modules';
    import isEmpty from '../../../../../app/public/scripts/function/isEmpty';

    export default {
        data () {
            return {
                uploadURL: '',
                form: {
                   name: '',
                   remark: '',
                   authority: ''
                },
                modules,
                loading: false,
                rules: config.addFormRule,
                roleSubejctList: [],
                submiting: false
            };
        },
        computed: {
            role () {
                return this.$store.state.role.role || null;
            }
        },
        created () {
            var role = this.role;
            var modules = this.modules;

            // 给权限列表增加属性
            for (var key in modules) {
                if (modules.hasOwnProperty(key)) {
                    this.$set(modules[key], 'checkedList', []);
                    this.$set(modules[key], 'checked', false);
                }
            }
            // 编辑角色，回填角色内容
            if (role) {
                Object.assign(this.form, {
                    name: role.name,
                    remark: role.remark
                });
                var authority = role.authority;
                for (var key in modules) {
                    var module = modules[key];
                    var authNumber = authority[module.id];
                    // 有权限的子模块数量统计，用来计划是否所有的子模块都有权限
                    var hasAuthChildCount = 0;
                    // 某个模块有权限
                    if (authNumber) {
                        // 有权限的模块要展开
                        this.$set(module, 'expand', true);
                        module.children.forEach((child)=> {
                            hasAuthChildCount ++ ;
                            if (child.id & authNumber) {
                                module.checkedList.push(child.id);
                            }
                        });
                    }
                    // 如果所有子模块都选中了，就把模块也选中
                    if (hasAuthChildCount === module.children.length) {
                        module.checked = true;
                    }
                }
            }
        },
        watch: {
            modules: {
                handler (value) {
                    this.changeAuthority();
                },
                deep: true
            }
        },
        methods: {
            /**
             * 改变模块的全选状态
             */
            changeModuleSelected (item) {
                if (item.checked) {
                    item.checkedList = [];
                    item.children.forEach((children)=> {
                         item.checkedList.push(children.id);
                    });
                } else {
                    item.checkedList = [];
                }
            },

            /**
             * 获取用户选择的权限
             */
            getAuthority () {
                var authority = this.form.authority;
                var result = {};
                for (var key in authority) {
                    if (authority.hasOwnProperty(key)) {
                        if (authority[key]) {
                            result[key] = authority[key].reduce((a, b)=> {
                                return a | b;
                            });
                        } else {
                            result[key] = 0
                        } 
                    }
                }
                return result;
            },

            /**
             * 权限发生改变
             */
            changeAuthority () {
                var modules = this.modules;
                var authority = {};
                for (var key in modules) {
                    if (modules.hasOwnProperty(key)) {
                        var item = modules[key];
                        var checkedList = item.checkedList;
                        if (checkedList && checkedList.length) { 
                            authority[item.id] = item.checkedList;
                        }
                    }
                }
                if (isEmpty(authority)) { 
                    authority = null;
                }
                this.form.authority = authority;
                var form = this.$refs.form;
                if (form) {
                    form.validateField('authority');
                }
            },
            /**
             * 收起展开权限节点
             */
            expand (node) {
                this.$set(node, 'expand', !node.expand);
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
            submit () {
                this.$refs['form'].validate((valid) => {
				    if (valid) {
                        var form = this.form;
                        var role = this.role;
                        var handler = null;
                        var params = {
                            name: form.name,
                            remark: form.remark,
                            authority: this.getAuthority()
                        };

                        // 编辑
                        if (role) {
                            handler = update.bind(null, role._id, params);
                        } else {
                            handler = add.bind(null, params);
                        }
                        this.submiting = true;
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
            this.$store.commit('RESET_ROLE');
        },
        components: {
            Upload
        }
    };
</script>