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

            <el-form-item label="备注" required prop="name">
                <el-input placeholder="请填写备注" type="textarea" :maxlength="100" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="限权">
            </el-form-item>
            <div class="show-modules">
                <el-row :gutter="20">
                    <el-col :span="8" class="module" v-for="(item, key) in modules" :key="key">
                        <span class="el-tree-node__expand-icon" :class="{expanded: item.expand}" @click="expand(item)"></span>
                        <el-checkbox class="checkbox" @change="changeModuleSelected(item)" v-model="item.checked">{{item.name}}</el-checkbox>
                        <transition name="md-fade-bottom">
                            <ul v-show="item.expand">
                                <li v-for="sub in item.children">
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


    export default {
        data () {
            return {
                uploadURL: '',
                form: {
                   name: ''
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
            
            if (role) {
                Object.assign(this.form, {
                    title: role.title,
                    summary: role.summary,
                    price: role.price,
                    storageId: role.storageId,
                    discountPrice: role.discountPrice,
                    roleSubjectId: role.roleSubjectId
                });
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
            submit() {
                this.$refs['form'].validate((valid) => {
				    if (valid) {
                        var form = this.form;
                        var role = this.role;
                        var handler = null;
                        var params = {
                            title: form.title,
                            summary: form.summary,
                            price: form.price,
                            storageId: form.storageId,
                            discountPrice: form.discountPrice,
                            roleSubjectId: form.roleSubjectId
                        };

                        // 编辑
                        if (role) {
                            handler = update.bind(null, role._id, params);
                        } else {
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
            this.$store.commit('RESET_ROLE');
        },
        components: {
            Upload
        }
    };
</script>