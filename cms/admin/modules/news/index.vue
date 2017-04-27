<template>
    <div>
        <el-form>
            <el-select v-model="filter.newsSubjectId" placeholder="全部分类" clearable @change="filterChange">
                <el-option v-for="item in newsSubejctList"  :value="item._id" :label="item.name"></el-option>
            </el-select>
        </el-form>
        <el-table v-loading.body="loading" :data="list">
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="summary" label="摘要">
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
            <el-table-column inline-template label="创建时间">
                <div>
                    {{row.createTime|date('yyyy-MM-dd HH:mm')}} 
                </div>
            </el-table-column>
            <el-table-column inline-template label="创建人">
                <div>
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
                <el-button @click="del(row)" type="text" size="small">删除</el-button>
                <el-button @click="modify(row)" type="text" size="small">编辑</el-button>
            </div>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    
    import * as newsSubejctRequest  from '../newsSubject/request';
    import { list } from './request';
    import indexBy from '../../../../app/public/scripts/function/indexBy';

    export default {
        data () {
            return {
                newsSubejctList: [],
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
                list (this.filter)
                    .then((res)=> {
                        this.loading = false;
                        this.list = this.adaptList(res.data.list);
                    })
                    .catch(()=> {
                       this.loading = true; 
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
                var newsSubejctList = this.newsSubejctList;
                if (newsSubejctList.length) {
                    var subjectMap = indexBy(newsSubejctList, '_id');
                    data.forEach((item)=> {
                        this.$set(item, 'newsSubject', subjectMap[item.newsSubjectId]);
                    });
                }
                return data;
            }
        },
        watch: {
            newsSubjectList () {
                this.adaptList();
            }
        }
    }
</script>