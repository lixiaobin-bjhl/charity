<template>
   <div>
       <div class="side-bar"> 
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-message"></i>内容管理
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">新闻管理</el-menu-item>
                        <el-menu-item index="1-2">产品中心</el-menu-item>
                        <el-menu-item index="1-3">客户案例</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>账号设置
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-setting"></i>系统管理
                </el-menu-item>
            </el-menu>
        </div>
   </div>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss">
    .side-bar {
        width: 200px;
        float: left;
    }
</style>