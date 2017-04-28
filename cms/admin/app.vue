<template>
   <div>
       <div class="side-bar">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                 <div v-for="(menu, index) in sidebarConfig">
                    <el-submenu :index="'' + index">
                        <template slot="title">
                            <i :class="menu.icon"></i>{{menu.name}}
                        </template>
                        <el-menu-item-group v-if="menu.children && menu.children.length">
                            <el-menu-item v-for="(item, i) in menu.children" :key="i" :index="index + '-' + i" @click.native="changeUrl(item.url)">
                                {{item.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
        <div class="main">
            <div class="breadcrumb">
                <el-breadcrumb separator=".">
                    <el-breadcrumb-item v-for="(item, index) in breadOptions" :key="index"  @click.native="changeBreadcrumb(item)">
                        {{item.name}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <router-view></router-view>
        </div>
   </div>
</template>

<script>
    import sidebarConfig from './config/sidebar';
    require('./style.scss');
    require('element-ui/lib/theme-default/index.css');

    export default {
        data () {
            return {
                sidebarConfig
            };
        },
        computed: {
            breadOptions() {
                return this.$store.state.breadCrumbs;
            }
        },
        methods: {
            changeBreadcrumb(item) {
                this.$router.push(item.url);
            },
            /**
             * 切换左导菜单
             */
            changeUrl (url) {
                this.$router.push(url);
            },
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
        position: fixed;
        padding-top: 50px;
        top: 0;
        left: 0;
        background: #eef1f6;
        z-index: 1;
        float: left;
        width: 192px;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }
</style>