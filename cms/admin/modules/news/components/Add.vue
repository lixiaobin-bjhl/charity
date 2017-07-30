<!--
  @fileOverview charity-cms-news 添加新闻
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <el-dialog :title="news ? '编辑新闻' : '新增新闻'" v-model="$parent.addState" size="large">
        <el-form label-width="100px" :model="form" :rules="rules" ref="form">
            <el-form-item label="标题" required prop="title">
                <el-input placeholder="请输入1-30字内的新闻标题" :maxlength="30" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="摘要" required prop="summary">
                <el-input placeholder="请输入新闻摘要" type="textarea" :maxlength="30" v-model="form.summary"></el-input>
            </el-form-item>
            <el-form-item label="分类" required prop="newsSubjectId">
                <el-select v-model="form.newsSubjectId" placeholder="请选择分类" clearable>
                    <el-option v-for="item in newsSubejctList" :key="item._id"  :value="item._id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="内容" required prop="editorContent">
                <editor
                    :upload-url="uploadURL"
                    @change="changeContent"
                    v-model="form.content">
                </editor>
                <el-input type="hidden" v-model="form.editorContent"></el-input>
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
    import * as newsSubejctRequest  from '../../newsSubject/request';
    import Editor from '../../../common/components/Editor.vue';

    export default {
        data () {
            return {
                uploadURL: '',
                form: {
                    title: '',
                    summary: '',
                    newsSubjectId: '',
                    editorContent: '',
                    content: ''
                },
                rules: config.addFormRule,
                newsSubejctList: [],
                submiting: false
            };
        },
        computed: {
            news () {
                return this.$store.state.news.news || null;
            }
        },
        created () {
            var news = this.news;
            this.getNewsSubjectList();
            
            if (news) {
                Object.assign(this.form, {
                    title: news.title,
                    summary: news.summary,
                    content: news.content,
                    newsSubjectId: news.newsSubject._id,
                    editorContent: news.content
                });
            }
        },
        methods: {
            /**
             * 获取新闻分类列表
             */
            getNewsSubjectList () {
                newsSubejctRequest.list()
                    .then((res)=> {
                        this.newsSubejctList = res.data.list;
                    });
            },
            /**
             * 富文本框内容发生变化
             */
            changeContent (value) {
                this.form.editorContent = value;
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
                        var news = this.news;
                        var handler = null;
                        var params = {
                            title: form.title,
                            summary: form.summary,
                            content: form.editorContent,
                            newsSubjectId: form.newsSubjectId
                        };

                        // 编辑
                        if (news) {
                            handler = update.bind(null, news._id, params);
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
            this.$store.commit('RESET_NEWS');
        },
        components: {
            Editor
        }
    };
</script>