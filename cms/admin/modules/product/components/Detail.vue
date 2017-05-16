<!--
  @fileOverview charity-cms-product 产品详情
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
	<div class="detail">
		<top-head title="产品详情" v-on:clickright="hide"></top-head>
		<div v-loading="loading">
            <el-row :gutter="10" v-if="info._id">
                <el-col :span="8">
                    <label>产品名称</label> {{info.title}}
                </el-col>
                <el-col :span="8">
                    <label>产品摘要</label> {{info.summary}}
                </el-col>
                <el-col :span="8">
                    <label>产品图片</label>
                    <img v-for="storageId in info.storageIds" :key="storageId" :src="storageId|compressImage(100, 100)">
                </el-col>
                <el-col :span="8">
                    <label>产品价格</label>{{info.price|currency}}
                </el-col>
                <el-col :span="8">
                    <label>产品状态</label>{{info.isNotSale ? '下架': '上架'}}
                </el-col>
                <el-col :span="8">
                    <label>创建人</label>{{info.author.name}}
                </el-col>
                <el-col :span="8">
                    <label>产品分类</label>{{info.productSubject.name}}
                </el-col>
                <el-col :span="8">
                    <label>产品折扣</label>
                    {{info.discountPrice | currency}}
                </el-col>
                <el-col :span="8">
                    <label>创建时间</label>
                    {{info.createTime | date('yyyy-MM-dd HH:ss')}}
                </el-col>
                <el-col :span="8">
                    <label>最近更新时间</label>
                    {{info.updateTime | date('yyyy-MM-dd HH:ss')}}
                </el-col>
                <el-col :span="8">
                    <label>库存</label>
                    {{info.storeCount}}
                </el-col>
                <el-col :span="8">
                    <label>规格</label>
                    <span v-for="(item, index) in info.specifications" :key="index">
                        <span>
                        {{item.id|specification}} : {{item.value}}<br>
                        </span>
                    </span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    import TopHead from '../../../common/components/TopHead.vue';
    import { show } from '../request';

    export default {
        props: ['pid'],
        data () {
            return {
                loading: true,
                info: {}
            };
        },
        components: {
            TopHead
        },
        created () {
            this.getDetail();
        },
        methods: {
            /**
             * 隐藏产品详情
             */
            hide () {
                this.$store.commit('HIDE_PRODUCT_DETAIL');
            },
        
            /**
             * 获取产品详情数据
             */
            getDetail () {
                show(this.pid)
                .then((res)=> {
                    this.info = res.data;
                    this.loading = false;
                })
                .catch(()=> {
                    this.loading = false;
                });
            }
        }
    }
</script>