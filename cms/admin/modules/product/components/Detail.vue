<!--
  @fileOverview charity-cms-product 产品详情
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
	<div class="detail">
		<top-head title="产品详情" v-on:clickright="hide"></top-head>
		<div class="detail-info" v-loading="loading">
            <el-row :gutter="10" v-if="info._id">
                <el-col :span="8">
                    <label>产品名称：</label> <div>{{info.title}}</div>
                </el-col>
                <el-col :span="8" v-if="info.customField && info.customField.length && item.value" v-for="(item, index) in info.customField" :key="index">
                    <label>{{item.name}}：</label>
                    <div>{{item.value}}</div>
                </el-col>
                <el-col :span="8">
                    <label>产品摘要：</label>
                    <div>{{info.summary}}</div>
                </el-col>
                <el-col :span="8">
                    <label>产品图片：</label>
                    <div class="image-list image-preview">
                        <image-preview-item :height="50" v-for="(img, index) in info.storageIds.map(function(item){return{'u': item, 'c':''}})" :key="index" :img="img" :show-remove="false"></image-preview-item>
                    </div>
                         <!-- <img v-for="storageId in info.storageIds" :key="storageId" :src="storageId|compressImage(100, 100)"> -->
                </el-col>
                <el-col :span="8">
                    <label>产品价格：</label>
                    <div>{{info.price|currency}}</div>
                </el-col>
                <el-col :span="8">
                    <label>产品状态：</label>
                    <div>{{info.isNotSale ? '下架': '上架'}}</div>
                </el-col>
                <el-col :span="8">
                    <label>创建人：</label>
                    <div>{{info.author.name}}</div>
                </el-col>
                <el-col :span="8">
                    <label>产品分类：</label>
                    <div>{{info.productSubject.name}}</div>
                </el-col>
                <el-col :span="8">
                    <label>产品折扣：</label>
                    <div>{{info.discountPrice | currency}}</div>
                </el-col>
                <el-col :span="8">
                    <label>创建时间：</label>
                    <div>{{info.createTime | date('yyyy-MM-dd HH:ss')}}</div>
                </el-col>
                <el-col :span="8">
                    <label>最近更新时间：</label>
                    <div>{{info.updateTime | date('yyyy-MM-dd HH:ss')}}</div>
                </el-col>
                <el-col :span="8">
                    <label>库存：</label>
                    <div>{{info.storeCount}}</div>
                </el-col>
                <el-col :span="8">
                    <label>规格：</label>
                    <span v-for="(item, index) in info.specifications" :key="index">
                        <span>
                        {{item.id|specification}} : {{item.value}}<br>
                        </span>
                    </span>
                </el-col>
                <el-col :span="8">
                    <label>备注：</label>
                    <pre>{{info.remark || '-'}}</pre>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    import TopHead from '../../../common/components/TopHead.vue';
    import { show } from '../request';
    import ImagePreviewItem from '../../../common/components/ImagePreviewItem';

    export default {
        props: ['pid'],
        data () {
            return {
                loading: true,
                info: {}
            };
        },
        components: {
            TopHead,
            ImagePreviewItem
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