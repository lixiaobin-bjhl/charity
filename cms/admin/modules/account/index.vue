<!--
  @fileOverview charity-cms-proeduct 用户管理
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="module-wrap" v-loading.fullscreen.lock="loading">
        <div class="list-header">
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="filter.type" placeholder="请选择类型" clearable @change="refresh">
                        <el-option v-for="item in typeOptions" :value="item.id" :key="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input :disabled="currentAccount && currentAccount.type" placeholder="输入名称或手机号" @keyup.enter.native="refresh" v-model.trim="filter.key">
                        <el-button slot="append" icon="search" @click="refresh"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="btn-group">
                <div class="right">
                    <el-button type="primary" v-if="hasAuth(1, 2)" @click="add">新增用户</el-button>
                </div>
            </div>
        </div>
        <div class="list-content"> 
            <el-table ref="table" :data="list">
                <el-table-column prop="name" label="用户姓名">
                </el-table-column>
                <el-table-column inline-template label="头像">
                    <img class="radius3" width="50" height="50" :src="row.headPic|compressImage(50, 50)">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号">
                </el-table-column>
                <el-table-column inline-template label="角色">
                    <div v-text="row.role.name"></div>
                </el-table-column>
                <el-table-column inline-template label="用户状态">
                    <div v-text="row.isForbidden ? '禁用' : '启用'"></div>
                </el-table-column>
                <el-table-column inline-template label="账号类型">
                    <div>
                    <span v-if="row.type === 0">超级用户</span>
                    <span v-else-if="row.type === 1">公司主账号</span>
                    <span v-else-if="row.type === 2">公司子账号</span>
                    </div>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                inline-template
                width="149">
                <div>
                    <el-button @click="del(row)" type="text" size="small" v-if="hasAuth(1, 4)">删除</el-button>
                    <el-button @click="modify(row)" type="text" size="small" v-if="hasAuth(1, 3)">编辑</el-button>
                    <el-button @click="updateForbiddenStatus(row._id, 0)" v-if="row.isForbidden && hasAuth(1, 3)" type="text" size="small">启用</el-button>
                    <el-button @click="updateForbiddenStatus(row._id, 1)" v-if="!row.isForbidden && hasAuth(1, 3)" type="text" size="small">禁用</el-button>
                </div>
                </el-table-column>
            </el-table>
            <pager :page-dto="pageDto" @currentchange="changePage" @sizechange="changeSize"></pager> 
        </div>
        <add v-if="addState" @save="refresh"></add>
    </div>
</template>

<script>
    
    import { list, remove, batchRemove, update } from './request';
    import indexBy from '../../../../app/public/scripts/function/indexBy';
    import compressImage from '../../../../app/public/scripts/function/compressImage';
    import Add from './components/Add.vue';
    import listMixins from '../../common/mixin/list';
    import config from './config';

    export default {
        mixins: [listMixins],
        data () {
            return {
                addState: false,
                currentAccount: window.account,
                accountSubejctList: [],
                multipleSelection: [],
                list: [],
                typeOptions: config.accountTypeOption,
                pid: null,
                loading: false,
                filter: {
                    type: '',
                    key: ''
                }
            };
        },
        created () {
            this.getList();
        },
        methods: {
            /**
             * 新增用户
             */
            add () {
                this.addState = true;
            },

            /**
             * 更新用户
             */
            modify (row) {
                this.$store.commit('SET_ACCOUNT', row);
                this.add();
            },

            /**
             * 删除用户
             * @param {Object} item 用户单元
             */
            del (item) {
                this.$confirm('是否确认删除?', '提示', {
                    type: 'warning'
                })
                .then(()=> {
                    remove(item._id)
                    .then((res)=> {
                        toast('删除成功', 'success');
                        this.refresh();
                    });
                });
            },

            /**
             * 刷新页面
             */
            refresh () {
                this.getList();
            },

            /**
             * 更新订单禁用状态
             */
            updateForbiddenStatus (id, status) {
                var aciton = status === 1 ? "禁用" : '启用';
                this.$confirm('是否确认' + aciton + '?', '提示', {
                    type: 'warning'
                })
                .then(()=> {
                    update(id, {
                        isForbidden: status
                    })
                    .then((res)=> {
                        toast('更新成功', 'success');
                        this.refresh();
                    });
                });
            },

            /**
             * filter 发现变化，对列表数据进行筛选
             */
            filterChange () {
                this.getList();
            },

            /**
             * 获取用户列表
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
                list (params)
                    .then((res)=> {
                        this.loading = false;
                        var data = res.data;
                        this.list = this.adaptList(data.list);
                        this.pageDto.count = data.count;
                    })
                    .catch(()=> {
                        this.loading = false;
                    });
            },

            /**
             * 获取用户分类列表
             */
            getNewsSubjectList () {
                newsSubejctRequest.list()
                    .then((res)=> {
                        this.accountSubejctList = res.data.list;
                    });
            },

            /**
             * 扩展数据
             */
            adaptList (data) {
                var accountSubejctList = this.accountSubejctList;
                if (accountSubejctList.length) {
                    var subjectMap = indexBy(accountSubejctList, '_id');
                    data.forEach((item)=> {
                        this.$set(item, 'accountSubject', subjectMap[item.accountSubjectId]);
                    });
                }
                return data;
            },

            /**
             * 选择表格中的account
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;
            } 
        },
        components: {
            Add
        }
    }
</script>