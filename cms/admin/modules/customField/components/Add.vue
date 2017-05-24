<!--
  @fileOverview charity-cms-productSubejct 添加自定义字段
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <el-dialog class="add-dialog" :title="customField ? '编辑自定义字段' : '新增自定义字段'" v-model="$parent.addState">
        <el-form label-width="100px" :model="form" :rules="rules" ref="form">
            <el-form-item label="字段名称" required prop="name">
                <el-input placeholder="请输入1-20字内的自定义字段名称" :maxlength="20" v-model="form.name"></el-input>
            </el-form-item>

             <el-form-item label="是否必填" required>
                <el-switch
                v-model="form.required"
                on-text="是"
                off-text="否">
                </el-switch>
            </el-form-item>

            <el-form-item label="字段类型" required prop="type">
                 <el-radio-group v-model="form.type">
                    <el-radio :label="item.id" v-for="item in typeOption" :key="item.id">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="选项" required v-if="form.type === 1">
                <div v-for="(value, index) in form.options" :key="index">
                    <el-input placeholder="请填写选项" class="dynamic-input" :maxlength="20" v-model="form.options[index]">
                         <span slot="append" class="icon el-icon-circle-cross" @click="removeOption(index)" title="删除选项"></span>
                    </el-input>
                </div>
                <div>
                    <span class="el-icon-plus icon-tianjia" @click="addOption">&nbsp;<a href="javascript:;">添加选项</a></span>
                </div>
            </el-form-item>    

            <el-form-item label="默认值" prop="default" v-if="form.type !== ''">
                <el-input v-if="form.type === 0" placeholder="请填写默认值" :maxlength="30" v-model="form.default"></el-input>
                <el-select v-else-if="form.type === 1" clearable placeholder="请选择默认值"  v-model="form.default">
                    <el-option v-for="(value, index) in form.options" :value="value"  :label="value" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="备注" prop="remark">
                <el-input placeholder="请输入1-50字" :maxlength="50" v-model="form.remark"></el-input>
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

    export default {
        data () {
            return {
                form: {
                    name: '',
                    required: false,    
                    remark: '',
                    options: [''],
                    default: '',
                    type: ''
                },
                typeOption: config.typeOption,
                rules: config.addFormRule,
                submiting: false
            };
        },
        computed: {
            customField () {
                return this.$store.state.customField.customField || null;
            }
        },
        created () {
            var customField = this.customField;
            if (customField) {
                Object.assign(this.form, {
                    name: customField.name,
                    remark: customField.remark,
                    default: customField.default,
                    required: customField.required,
                    type: customField.type,
                    options: customField.options || []
                });
            }
        },
        methods: {
            /**
             * 添加选项
             */
            addOption () {
                this.form.options.push('');
            },
            /**
             * 移除选项
             */
            removeOption (index) {
                this.form.options.splice(index, 1);
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
                        var customField = this.customField;
                        var handler = null;
                        var params = {
                            name: form.name,
                            remark: form.remark,
                            default: form.default,
                            required: form.required,
                            type: form.type,
                            options: form.type === 0 ? [] : form.options
                        };

                        // 编辑
                        if (customField) {
                            handler = update.bind(null, customField._id, params);
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
            this.$store.commit('RESET_CUSTOM_FIELD');
        }
    };
</script>