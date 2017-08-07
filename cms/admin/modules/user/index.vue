<!--
    @fileOverview charity-cms-user 用户管理
    @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="list-content">
         <el-table v-loading.body="loading" :data="list">
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
    </div>
</template>

<script>

    import { list } from './request'

    export default  {
        data () {
            return {
                loading: false,
                list: []
            }
        },
        mounted () {
            this.getList();
        },
        methods: {

            /**
             * 获取新闻列表
             */
            getList () {
                this.loading = true;
                list (this.filter)
                    .then((res)=> {
                        this.loading = false;
                        this.list = res.data;
                    })
                    .catch(()=> {
                       this.loading = false; 
                    });
            }
        }
    }
</script>
