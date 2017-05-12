<!--
  @fileOverview charity-cms-proeduct 角色管理
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="module-wrap">
        <div class="list-header">
            <div class="btn-group">
                <div class="right">
                    <el-button type="primary" @click="add">新增角色</el-button>
                </div>
            </div>
        </div>
        <el-table v-loading.body="loading" ref="table" :data="list">
            <el-table-column prop="name" label="角色名称">
            </el-table-column>
            <el-table-column inline-template label="拥有权限">
                <div v-html="getAuthorityText(row)"></div>
            </el-table-column>
            <el-table-column inline-template label="创建时间">
                <div>
                    {{row.updateTime|date('yyyy-MM-dd HH:mm')}} 
                </div>
            </el-table-column>
            <el-table-column inline-template label="更新时间">
                <div>
                    {{row.updateTime|date('yyyy-MM-dd HH:mm')}} 
                </div>
            </el-table-column>
             <el-table-column prop="remark" label="备注">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            inline-template
            width="100">
            <div>
                <el-button @click="del(row)" type="text" size="small">删除</el-button>
                <el-button @click="modify(row)" type="text" size="small">编辑</el-button>
            </div>
            </el-table-column>
        </el-table>
        <add v-if="addState" @save="refresh"></add>
    </div>
</template>

<script>
    
    import { list, remove, batchRemove, update } from './request';
    import indexBy from '../../../../app/public/scripts/function/indexBy';
    import compressImage from '../../../../app/public/scripts/function/compressImage';
    import modules from '../../../../config/modules';
    import encodeHTML from '../../../../app/public/scripts/function/encodeHTML';
    import Add from './components/Add.vue';
    import vueImages from 'vue-images/dist/vue-images';

    export default {
        data () {
            return {
                addState: false,
                roleSubejctList: [],
                multipleSelection: [],
                list: [],
                pid: null,
                loading: false,
                filter: {
                    roleSubjectId: '',
                    key: ''
                }
            };
        },
        created () {
            this.getList();
        },
        methods: {
            /**
             * 新增角色
             */
            add () {
                this.addState = true;
            },

            /**
             * 更新角色
             */
            modify (row) {
                this.$store.commit('SET_ROLE', row);
                this.add();
            },

            /**
             * 删除角色
             * @param {Object} item 角色单元
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
             * 获取权限文本
             * @param {Object} row 角色信息
             * @return {string} 权限文本
             */
            getAuthorityText (row) {
                var authority = row.authority;
                // 这里暂不显示二级目录的权限
                var result = [];
                for (var key in modules) {
                    if (modules.hasOwnProperty(key)) {
                        var module = modules[key];
                        if (authority[module.id]) {
                            result.push(encodeHTML(module.name));
                        }
                    }
                }
                return result.join('<br>');
            },

            /**
             * filter 发现变化，对列表数据进行筛选
             */
            filterChange () {
                this.getList();
            },

            /**
             * 获取角色列表
             */
            getList () {
                this.loading = true;
                list (this.filter)
                    .then((res)=> {
                        this.loading = false;
                        this.list = this.adaptList(res.data.list);
                    })
                    .catch(()=> {
                       this.loading = true; 
                    });
            },

            /**
             * 获取角色分类列表
             */
            getNewsSubjectList () {
                newsSubejctRequest.list()
                    .then((res)=> {
                        this.roleSubejctList = res.data.list;
                    });
            },

            /**
             * 扩展数据
             */
            adaptList (data) {
                var roleSubejctList = this.roleSubejctList;
                if (roleSubejctList.length) {
                    var subjectMap = indexBy(roleSubejctList, '_id');
                    data.forEach((item)=> {
                        this.$set(item, 'roleSubject', subjectMap[item.roleSubjectId]);
                    });
                }
                return data;
            },

            /**
             * 选择表格中的role
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