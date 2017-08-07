<!--
  @fileOverview charity-cms-newsSubject 新闻分类管理
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="list-header">
            <div class="btn-group">
                <div class="right">
                    <el-button type="primary" @click="add" v-if="hasAuth(4, 2)">新增新闻分类</el-button>
                </div>
            </div>
        </div>
        <div class="list-content">
            <el-table :data="list">
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column inline-template label="创建时间">
                    <div>
                        {{row.createTime|date('yyyy-MM-dd HH:mm')}} 
                    </div>
                </el-table-column>
                <el-table-column inline-template label="更新时间">
                    <div>
                        {{row.updateTime|date('yyyy-MM-dd HH:mm')}} 
                    </div>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                inline-template
                width="100">
                <div>
                    <el-button @click="del(row)" type="text" size="small" v-if="hasAuth(4, 4)">删除</el-button>
                    <el-button @click="modify(row)" type="text" size="small" v-if="hasAuth(4, 3)">编辑</el-button>
                </div>
                </el-table-column>
            </el-table>
        </div>
        <add v-if="addState" @save="refresh"></add>
    </div>
</template>

<script>

    import Add from './components/Add.vue';
    import { list, remove } from './request';

    export default {
        data () {
            return {
                addState: false,
                list: [],
                loading: true
            };
        },
        created () {
            this.getList();
        },
        methods: {
            /**
             * 新增新闻分类
             */
            add () {
                this.addState = true;
            },
            /**
             * 更新新闻分类
             */
            modify (row) {
                this.$store.commit('SET_SUBJECT', row);
                this.add();
            },
            /**
             * 刷新页面
             */
            refresh () {
                this.getList();
            },
            /**
             * 删除新闻分类
             * @param {Object} item 新闻分类单元
             */
            del (item) {
                this.$confirm('是否确认删除?', '提示', {
                    type: 'warning'
                })
                .then(()=> {
                    remove(item._id)
                    .then((res)=> {
                        toast('删除成功', 'success');
                        this.refresh();
                    });
                });
            },
            /**
             * 获取新闻分类列表
             */
            getList () {
                this.loading = true;
                list()
                    .then((res)=> {
                        this.loading = false;
                        this.list = res.data.list;
                    })
                    .catch((res)=> {
                        this.loading = false; 
                    });
            }
        },
        components: {
            Add
        }
    };
</script>
