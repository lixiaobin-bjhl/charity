<!--
    @fileOverview charity-cms-user 用户管理
    @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="list-content" v-loading.fullscreen.lock="loading">
        <div class="list-header">
            <el-form :inline="true" :model="filter" onsubmit="return false;">
                <el-form-item>
                    <el-input placeholder="输入用户名称" @keyup.enter.native="refresh" v-model.trim="filter.key">
                        <el-button slot="append" icon="search" @click="refresh"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="list">
            <el-table-column inline-template label="用户">
                <div>
                    {{row.nickName}} 
                </div>
            </el-table-column>
            <el-table-column inline-template label="性别">
                <div>
                    <span v-if="row.gender == 1">男</span>
                    <span v-else-if="row.gender == 2">女</span>
                    <span v-else>未知</span>
                </div>
            </el-table-column>
            <el-table-column inline-template label="头像">
                <div>
                    <img width="50" height="50" class="headPic" :src="row.avatarUrl">
                </div>
            </el-table-column>
            <el-table-column inline-template label="加入时间">
                <div>
                    {{row.createTime|date('yyyy-MM-dd HH:mm')}} 
                </div>
            </el-table-column>
            <el-table-column prop="loginCount" label="访问次数">
            </el-table-column>
            <el-table-column prop="openid" label="openid">
            </el-table-column>
            <el-table-column inline-template label="地域">
                <div>{{row.province}}-{{row.city}}</div>
            </el-table-column>
         </el-table>
         <pager :page-dto="pageDto" @currentchange="changePage" @sizechange="changeSize"></pager> 
    </div>
</template>

<script>

    import { list } from './request';
    import listMixins from '../../common/mixin/list';

    export default  {
        mixins: [listMixins],
        data () {
            return {
                loading: false,
                filter: {
                    key: ''
                },
                list: []
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            /**
             * 刷新列表 
             */
            refresh () {
                this.pageDto.pageNum = 1;
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
                        this.list = data.list;
                        this.pageDto.count = data.count;
                    })
                    .catch(()=> {
                       this.loading = false; 
                    });
            }
        }
    }
</script>
