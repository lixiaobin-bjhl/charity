<template>
   <div style="height: 100%;">
        <loading-progress :shown="$store.state.loadingProgressState"></loading-progress>
        <main-header></main-header>
        <div class="side-bar">
            <el-menu :default-active="active" :default-openeds="openids" class="sidebar-menu" @open="handleOpen" @close="handleClose">
                 <div v-for="(menu, index) in sidebarConfig" :key="index" v-if="menu.children">
                    <el-submenu :index="'' + index">
                        <template slot="title">
                            <i class="el-icon-f" :class="menu.icon"></i>{{menu.name}}
                        </template>
                        <el-menu-item-group v-if="menu.children && menu.children.length">
                            <el-menu-item v-if="hasAuth(item.number, 1)" v-for="(item, i) in menu.children" :key="item.number" :index="index + '-' + i" @click.native="changeUrl(item.url)">
                                {{item.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </div>
                <div v-else>
                    <el-submenu :index="'' + index">
                        <template slot="title">
                            <div @click="changeUrl(menu.url)">
                                <i class="el-icon-f" :class="menu.icon"></i>{{menu.name}}
                            </div>
                        </template>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
        <div class="main" :class="{'home': $route.path == '/admin/home'}">
            <div class="breadcrumb" v-if="$route.path!='/admin/home'">
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
    import MainHeader from './common/components/MainHeader.vue';
    import LoadingProgress from './common/components/LoadingProgress.vue';

    require('./style.scss');

    export default {
        data () {
            return {
                active: '',
                openids: [],
                sidebarConfig
            };
        },
        mounted () {
            var path = this.$route.path;
            var active = '';

            sidebarConfig.forEach((m1, m)=> {
                m1.children && m1.children.some((n1, n)=> {
                    if (n1.url === path) {
                        active = m + '-' + n; 
                        return true;
                    }
                });
            });
            this.active = active;
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
        },
        components: {
            MainHeader,
            LoadingProgress
        }
    }
</script>

<style lang="scss">
    .side-bar {
        position: fixed;
        padding-top: 50px;
        top: 0;
        left: 0;
        bottom: 0;
        background: #333;
        z-index: 6;
        float: left;
        width: 182px;
        height: 100%;
        z-index: 51;
        overflow: hidden;
        overflow-y: auto;
        .el-menu {
            background: transparent;
            > div {
                &:first-of-type {
                    .el-submenu__icon-arrow {
                        display: none;
                    }
                }
            }
            .el-submenu [class^=el-icon-] {
                vertical-align: middle;
            }
        }
        .el-menu-item, .el-submenu__title {
            color: #99a3ae;
            border-bottom: 1px solid #2c2c2c;
            &:hover {
                background-color: rgba(0,0,0,.13);
            }
        }
        .is-opened {
            .el-submenu__title {
                background-color: rgba(0,0,0,.13);
            }
        }
        .el-submenu.is-active .el-submenu__title {
            border-bottom: 0;
        }  
        .el-menu-item-group__title {
            padding-top: 0;
        }
        .is-active {
             background-color: rgba(0,0,0,.13);
        }
    }
</style>