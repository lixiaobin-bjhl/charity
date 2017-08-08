<!--
    @fileOverview charity-cms-user 订单管理
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
         <deliver :order="selectedOrder" @save="getList()" v-if="deliverState"></deliver>
    </div>
</template>

<script>

    import { list, update } from './request'
    import config from './config'
    import Deliver from './components/Deliver.vue';
    import indexBy from '../../../../app/public/scripts/function/indexBy'

    export default  {
        data () {
            return {
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
             * 快递 
             */
            deliver (row) {
                this.selectedOrder = row;
                this.deliverState = true;
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
                list(this.filter)
                    .then((res)=> {
                        this.loading = false;
                        this.list = res.data;
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
