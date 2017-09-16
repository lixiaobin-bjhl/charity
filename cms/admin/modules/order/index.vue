<!--
    @fileOverview charity-cms-user 订单管理
    @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="list-content" v-loading.fullscreen.lock="loading">
        <div class="list-header">
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="filter.status" placeholder="请选择订单状态" clearable @change="refresh">
                        <el-option v-for="item in statusOptions" :value="item.id" :key="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
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
                <el-table-column inline-template label="订单金额">
                    <div>
                        {{row.totalFee|unitMoney|currency}} 
                    </div>
                </el-table-column>
                <el-table-column prop="_id"  label="订单号">
                </el-table-column>
                <el-table-column inline-template label="订单状态">
                    <div>
                        {{getStatusStr(row.status)}}
                    </div>
                </el-table-column>
                <el-table-column prop="message" label="订单留言">
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    inline-template
                    width="130">
                    <div>
                        <el-button type="text" @click="deliver(row)" size="small">发货</el-button>
                        <el-button type="text" @click="finish(row)" size="small">结束订单</el-button>
                    </div>
                </el-table-column>
        </el-table>
        <pager :page-dto="pageDto" @currentchange="changePage" @sizechange="changeSize"></pager> 
         <deliver :order="selectedOrder" @save="getList()" v-if="deliverState"></deliver>
    </div>
</template>

<script>

    import { list, update } from './request'
    import config from './config'
    import Deliver from './components/Deliver.vue';
    import listMixins from '../../common/mixin/list';
    import indexBy from '../../../../app/public/scripts/function/indexBy'

    export default  {
        mixins: [listMixins],
        data () {
            return {
                filter: {
                    status: '',
                    key: ''
                },
                statusOptions: config.ORDER_STATUS, 
                loading: false,
                selectedOrder: null,
                deliverState: false,
                list: []
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            /**
             * 刷新页面 
             */
            refresh () {
                this.pageDto.pageNum = 1;
                this.getList();
            },
            /**
             * 快递 
             */
            deliver (row) {
                this.selectedOrder = row;
                if (!row.status) {
                    this.$confirm('该订单还未支付，是否要发货?', '提示', {
                        type: 'warning'
                    })
                    .then(()=> {
                        this.deliverState = true;
                    });
                } else {
                    this.deliverState = true;
                }
            },
            
            /**
             * 结束订单
             */
            finish (row) {
                this.$confirm('是否确认结束订单?', '提示', {
                    type: 'warning'
                })
                .then(()=> {
                    update(row._id, {
                        status: 3
                    })
                        .then((res)=> {
                            toast('保存成功', 'success');
                            this.getList();
                        });
                });
            },
            
            /**
             * 获取支付状态
             */
            getStatusStr (status) {
                var option = indexBy(config.ORDER_STATUS, 'id')[status];
                var result = '';
                if (option) {
                    result = option.name;
                }
                return result;
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
                list(params)
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
        },
        components: {
            Deliver
        }
    }
</script>
