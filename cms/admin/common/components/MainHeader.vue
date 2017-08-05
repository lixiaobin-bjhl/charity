<template>
    <div class="header">
            <a href="/admin" class="logo">
                 <span class="icon icon-moon"></span><span>AppMoon</span>
            </a>
            <div class="right">
                <div class="name">
                     <el-dropdown>
                        <div>
                            <img width="25" height="25" :src="account.headPic|compressImage(25,25)">
                            <span class="account el-dropdown-link">
                                {{account.name}}<i class="el-icon-caret-bottom el-icon--right triangle"></i>
                            </span>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item  @click.native="redirect('/')">主页预览</el-dropdown-item>
                            <el-dropdown-item divided @click.native="redirect('/admin/logout')">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

    <!--
                    <ul class="list">
                        <li><a href="/">主页预览</a></li>
                        <li>
                            <a href="/admin/logout">退出登录</a>
                        </li>
                    </ul>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                account: window.account
            };
        },
        methods: {
            redirect (url) {
                window.location.href = url;
            } 
        }
    }
</script>