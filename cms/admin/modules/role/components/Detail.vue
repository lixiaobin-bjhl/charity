<!--
  @fileOverview charity-cms-role 角色详情
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
	<div class="detail">
		<top-head title="角色详情" v-on:clickright="hide"></top-head>
		<div v-loading="loading">
            <el-row :gutter="10" v-if="info._id">
                <el-col :span="8">
                    <label>角色名称</label> {{info.title}}
                </el-col>
                <el-col :span="8">
                    <label>角色摘要</label> {{info.summary}}
                </el-col>
                <el-col :span="8">
                    <label>角色图片</label><img :src="info.storageId|compressImage(100, 100)">
                </el-col>
                <el-col :span="8">
                    <label>角色价格</label>{{info.price|currency}}
                </el-col>
                <el-col :span="8">
                    <label>角色状态</label>{{info.isNotSale ? '下架': '上架'}}
                </el-col>
                <el-col :span="8">
                    <label>创建人</label>{{info.author.name}}
                </el-col>
                <el-col :span="8">
                    <label>角色分类</label>{{info.roleSubject.name}}
                </el-col>
                <el-col :span="8">
                    <label>角色折扣</label>
                    {{info.discountPrice | currency}}
                </el-col>
                <el-col :span="8">
                    <label>创建时间</label>
                    {{info.createTime | date('yyyy-MM-dd HH:ss')}}
                </el-col>
                <el-col :span="8">
                    <label>更新时间</label>
                    {{info.updateTime | date('yyyy-MM-dd HH:ss')}}
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
             * 隐藏角色详情
             */
            hide () {
                this.$store.commit('HIDE_ROLE_DETAIL');
            },
        
            /**
             * 获取角色详情数据
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