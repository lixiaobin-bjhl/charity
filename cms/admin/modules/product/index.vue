<!--
  @fileOverview charity-cms-proeduct 产品管理
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div>
        <transition name="slide-right" :appear="true" transition="transition">
	        <detail v-if="$store.state.product.showDetailState"></detail>
	    </transition>
        <div class="list-header">
            <el-form>
                <el-select v-model="filter.productSubjectId" placeholder="全部分类" clearable @change="filterChange">
                    <el-option v-for="item in productSubejctList" :value="item._id" :label="item.name"></el-option>
                </el-select>
            </el-form>
            <div class="btn-group">
                <div class="right">
                    <el-button type="primary" @click="add">新增产品</el-button>
                </div>
                <span v-if="multipleSelection.length">共{{list.length}}条，已选{{multipleSelection.length}}条</span>
                <el-button type="text" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
            </div>
        </div>
        <el-table v-loading.body="loading" :data="list" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column inline-template label="标题">
                 <a href="javascript:;" @click="showDetail(row)">{{row.title}}</a>
            </el-table-column>
            <el-table-column inline-template label="产品图片">
                <div>
                    <img width="60" height="60" :src="row.storageId|compressImage(60, 60)">
                </div>
            </el-table-column>
            <el-table-column inline-template label="分类">
                <div>
                    <div v-if="row.productSubject">
                        {{row.productSubject.name}}
                    </div>
                </div>
            </el-table-column>
            <el-table-column inline-template label="价格">
                <div>
                    <div>
                        {{row.price|currency}}
                    </div>
                </div>
            </el-table-column>
            <el-table-column inline-template label="优惠">
                <div>
                    <div>
                        {{row.discountPrice|currency}}
                    </div>
                </div>
            </el-table-column>
            <el-table-column inline-template label="状态">
                <div>
                    {{row.isNotSale ? '已下架' : '上架' }} 
                </div>
            </el-table-column>
            <el-table-column inline-template label="创建人">
                <div v-if="row.author">
                    {{row.author.name}} 
                </div>
            </el-table-column>
            <el-table-column inline-template label="更新时间">
                <div>
                    {{row.updateTime|date('yyyy-MM-dd HH:mm')}} 
                </div>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            inline-template
            width="100">
            <div>
                <el-button @click="del(row)" type="text" size="small">删除</el-button>
                <el-button @click="modify(row)" type="text" size="small">编辑</el-button>
                <el-button @click="updateSaleStatus(row._id, 0)" v-if="row.isNotSale==1" type="text" size="small">上架</el-button>
                <el-button @click="updateSaleStatus(row._id, 1)" v-else type="text" size="small">下架</el-button>
            </div>
            </el-table-column>
        </el-table>
        <add v-if="addState" @save="refresh"></add>
    </div>
</template>

<script>
    
    import * as newsSubejctRequest  from '../productSubject/request';
    import Detail from './components/Detail.vue';
    import { list, remove, batchRemove, update } from './request';
    import indexBy from '../../../../app/public/scripts/function/indexBy';
    import Add from './components/Add.vue';

    export default {
        data () {
            return {
                addState: false,
                productSubejctList: [],
                multipleSelection: [],
                list: [],
                loading: false,
                filter: {
                    productSubjectId: ''
                } 
            };
        },
        created () {
            this.getNewsSubjectList();
            this.getList();
        },
        methods: {
            /**
             * 新增产品
             */
            add () {
                this.addState = true;
            },
            /**
             * 查看产品详情
             */
            showDetail (product) {
                this.$store.commit('SHOW_PRODUCT_DETAIL', product);
            },
            /**
             * 更新产品
             */
            modify (row) {
                this.$store.commit('SET_PRODUCT', row);
                this.add();
            },
            /**
             * 产品上架/下架
             * @param {string} id 产品id
             * @param {number} isNotSale 产品更新状态，1为下架，0为上架
             */
            updateSaleStatus (id, status) {
                var aciton = status === 1 ? "下架" : '上架';
                this.$confirm('是否确认' + aciton + '?', '提示', {
                    type: 'warning'
                })
                .then(()=> {
                    update(id, {
                        isNotSale: status
                    })
                    .then((res)=> {
                        toast('更新成功', 'success');
                        this.refresh();
                    });
                });
            },
            /**
             * 批量删除产品
             */
            batchDel () {
                this.$confirm('是否确认批量删除?', '提示', {
                    type: 'warning'
                })
                .then(()=> {
                    batchRemove(this.multipleSelection)
                    .then((res)=> {
                        toast('删除成功', 'success');
                        this.refresh();
                    });
                });
            },
            /**
             * 删除产品
             * @param {Object} item 产品单元
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
             * filter 发现变化，对列表数据进行筛选
             */
            filterChange () {
                this.getList();
            },
            /**
             * 获取产品列表
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
             * 获取产品分类列表
             */
            getNewsSubjectList () {
                newsSubejctRequest.list()
                    .then((res)=> {
                        this.productSubejctList = res.data.list;
                    });
            },
            /**
             * 扩展数据
             */
            adaptList (data) {
                var productSubejctList = this.productSubejctList;
                if (productSubejctList.length) {
                    var subjectMap = indexBy(productSubejctList, '_id');
                    data.forEach((item)=> {
                        this.$set(item, 'productSubject', subjectMap[item.productSubjectId]);
                    });
                }
                return data;
            },
            /**
             * 选择表格中的product
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;
            } 
        },
        watch: {
            productSubjectList () {
                this.adaptList();
            }
        },
        components: {
            Add,
            Detail
        }
    }
</script>