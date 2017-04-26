<!--
  @fileOverview charity-cms-main 新闻分类管理
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div>
        <div>分类管理</div>
        <div>
            <el-button type="primary" @click="add">新增新闻分类</el-button>
        </div>
        <add v-if="addState"></add>
    </div>
</template>

<script>

    import Add from './components/Add.vue';

    export default {
        data () {
            return {
                addState: false
            };
        },
        methods: {
            /**
             * 新增新闻分类
             */
            add () {
                this.addState = true;
            }
        },
        components: {
            Add
        }
    };
</script>
