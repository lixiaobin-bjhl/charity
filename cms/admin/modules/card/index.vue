<!--
    @fileOverview charity-cms-card 购物车
    @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="list-content">
         <el-table v-loading.body="loading" :data="list">
                <el-table-column inline-template label="用户">
                    <div>
                        {{ row.user.nickName}} 
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
                <el-table-column inline-template label="商品">
                    <div>
                        {{row.product.title}} 
                    </div>
                </el-table-column>
                <el-table-column inline-template label="数量">
                    <div>
                        {{row.count}} 
                    </div>
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
