<!--
    @fileOverview charity-cms-news
    @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="list-header">
            <el-form>
                <el-select v-model="filter.newsSubjectId" placeholder="全部分类" clearable @change="filterChange">
                    <el-option v-for="item in newsSubejctList" :value="item._id" :key="item._id" :label="item.name"></el-option>
                </el-select>
            </el-form>
            <div class="btn-group">
                <div class="right">
                    <el-button type="primary" @click="add" v-if="hasAuth(3, 2)">新增新闻</el-button>
                </div>
                <span v-if="multipleSelection.length">共{{list.length}}条，已选{{multipleSelection.length}}条</span>
                <el-button type="text" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
            </div>
        </div>
        <div class="list-content"> 
            <el-table :data="list" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column inline-template label="分类">
                    <div>
                        <div v-if="row.newsSubject">
                            {{row.newsSubject.name}}
                        </div>
                    </div>
                </el-table-column>
                <el-table-column inline-template label="创建时间">
                    <div>
                        {{row.createTime|date('yyyy-MM-dd HH:mm')}} 
                    </div>
                </el-table-column>
                <el-table-column inline-template label="创建人">
                    <div v-if="row.author">
                        {{row.author.name}} 
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
                    <el-button @click="del(row)" type="text" size="small" v-if="hasAuth(3, 4)">删除</el-button>
                    <el-button @click="modify(row)" type="text" size="small" v-if="hasAuth(3, 3)">编辑</el-button>
                </div>
                </el-table-column>
            </el-table>
            <pager :page-dto="pageDto" @currentchange="changePage" @sizechange="changeSize"></pager> 
        </div>
        <add v-if="addState" @save="refresh"></add>
    </div>
</template>

<script>
    
    import * as newsSubejctRequest  from '../newsSubject/request';
    import { list, remove, batchRemove} from './request';
    import indexBy from '../../../../app/public/scripts/function/indexBy';
    import Add from './components/Add.vue';
    import listMixins from '../../common/mixin/list';

    export default {
        mixins: [listMixins],
        data () {
            return {
                addState: false,
                newsSubejctList: [],
                multipleSelection: [],
                list: [],
                loading: false,
                filter: {
                    newsSubjectId: ''
                } 
            };
        },
        created () {
            this.getNewsSubjectList();
            this.getList();
        },
        methods: {
            /**
             * 新增新闻
             */
            add () {
                this.addState = true;
            },
            /**
             * 更新新闻
             */
            modify (row) {
                this.$store.commit('SET_NEWS', row);
                this.add();
            },
            /**
             * 批量删除新闻
             */
            batchDel () {
                this.$confirm('是否确认批量删除?', '提示', {
                    type: 'warning'
                })
                .then(()=> {
                    batchRemove(this.multipleSelection)
                    .then((res)=> {
                        toast('删除成功', 'success');
                        this.refresh();
                    });
                });
            },
            /**
             * 删除新闻
             * @param {Object} item 新闻单元
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
             * 刷新页面
             */
            refresh () {
                this.getList();
            },
            /**
             * filter 发现变化，对列表数据进行筛选
             */
            filterChange () {
                this.getList();
            },
            /**
             * 获取新闻列表
             */
            getList () {
                this.loading = true;
                var pageDto = this.pageDto;
                var params = Object.assign(
                    this.filter, 
                    {
                        pageSize: pageDto.pageSize, 
                        pageNum: pageDto.pageNum
                    }
                );
                list (params)
                    .then((res)=> {
                        this.loading = false;
                        var data = res.data;
                        this.list = this.adaptList(data.list);
                        this.pageDto.count = data.count;
                    })
                    .catch(()=> {
                       this.loading = false; 
                    });
            },
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
             * 扩展数据
             */
            adaptList (data) {
                // var newsSubejctList = this.newsSubejctList;
                // if (newsSubejctList.length) {
                //     var subjectMap = indexBy(newsSubejctList, '_id');
                //     data.forEach((item)=> {
                //         this.$set(item, 'newsSubject', subjectMap[item.newsSubjectId]);
                //     });
                // }
                return data;
            },
            /**
             * 选择表格中的news
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;
            } 
        },
        watch: {
            newsSubjectList () {
                this.adaptList();
            }
        },
        components: {
            Add
        }
    }
</script>