<!--
    @fileOverview charity-cms-shippingAddress 收货地址管理
    @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="list-content" v-loading.fullscreen.lock="loading">
         <el-table :data="list">
                <el-table-column inline-template label="用户">
                    <div>
                        {{row.user && row.user.nickName}} 
                    </div>
                </el-table-column>
                <el-table-column inline-template label="头像">
                    <div v-if="row.user">
                        <img width="50" height="50" class="headPic" :src="row.user.avatarUrl">
                    </div>
                </el-table-column>
                <el-table-column inline-template label="创建时间">
                    <div>
                        {{row.createTime|date('yyyy-MM-dd HH:mm')}} 
                    </div>
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column inline-template label="地址">
                    <div>
                        {{row.region.join('')}}{{row.address}} 
                    </div>
                </el-table-column>
                <el-table-column prop="contactNumber" label="手机">
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
