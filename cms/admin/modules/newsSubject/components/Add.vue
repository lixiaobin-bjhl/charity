<!--
  @fileOverview charity-cms-main 添加新闻分类
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <el-dialog :title="subject ? '编辑新闻分类' : '新增新闻分类'" v-model="$parent.addState">
        <el-form label-width="100px" :model="form" :rules="rules" ref="form">
            <el-form-item label="分类名称" required prop="name">
                <el-input placeholder="请输入1-20字内的新闻分类名称" :maxlength="20" v-model="form.name"></el-input>
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

    import { add } from '../request';

    export default {
        data () {
            return {
                form: {
                    name: '',
                    remark: ''
                },
                rules: {
                    name: {
                        required: true,
                        message: '请输入新闻分类名称'
                    }
                },
                submiting: false
            };
        },
        computed: {
            subject () {
                return this.$store.state.newsSubject.subject || null;
            }
        },
        methods: {
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
                        add({
                            name: form.name,
                            remark: form.remark
                        })
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
            this.$store.commit('RESET_SUBJECT');
        }
    };
</script>