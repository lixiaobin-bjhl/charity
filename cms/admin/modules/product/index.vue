<!--
  @fileOverview charity-cms-proeduct 产品管理
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <div class="module-wrap" v-loading.fullscreen.lock="loading">
        <transition name="slide-right" :appear="true" transition="transition">
	        <detail v-if="$store.state.product.showDetailState" :pid="pid"></detail>
	    </transition>
        <div class="list-header">
            <el-form :inline="true" :model="filter" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="filter.productSubjectId" placeholder="全部分类" clearable @change="filterChange">
                        <el-option v-for="item in productSubejctList" :value="item._id" :key="item._id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="输入产品名称" v-model="filter.key">
                        <el-button slot="append" icon="search" @click="search"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="btn-group">
                <div class="right">
                    <el-button type="primary" @click="add" v-if="hasAuth(2, 2)">新增产品</el-button>
                </div>
                <span v-if="multipleSelection.length">共{{list.length}}条，已选{{multipleSelection.length}}条</span>
                <el-button type="text" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
            </div>
        </div>
        <div class="list-content">
            <el-table ref="table" :data="list" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column inline-template label="标题">
                    <a href="javascript:;" @click="showDetail(row)">{{row.title}}</a>
                </el-table-column>
                <el-table-column inline-template label="产品图片" :min-width="150">
                    <div class="image-list image-preview">
                        <image-preview-item :height="50" v-for="(img, index) in getImages(row)" :key="index" :img="img" :show-remove="false"></image-preview-item>
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
                <el-table-column prop="storeCount" label="库存">
                </el-table-column>
                <el-table-column prop="saleCount" label="销量">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                inline-template
                width="139">
                <div>
                    <el-button @click="del(row)" type="text" size="small" v-if="hasAuth(2, 4)">删除</el-button>
                    <el-button @click="modify(row)" type="text" size="small" v-if="hasAuth(2, 3)">编辑</el-button>
                    <el-button @click="updateSaleStatus(row._id, 0)" v-if="row.isNotSale==1 && hasAuth(2, 3)" type="text" size="small">上架</el-button>
                    <el-button @click="updateSaleStatus(row._id, 1)" v-if="row.isNotSale!=1 && hasAuth(2, 3)"type="text" size="small">下架</el-button>
                </div>
                </el-table-column>
            </el-table>
        </div>
        <add v-if="addState" @save="refresh"></add>
        <image-preview></image-preview> 
    </div>
</template>

<script>
    
    import * as newsSubejctRequest  from '../productSubject/request';
    import Detail from './components/Detail.vue';
    import { list, remove, batchRemove, update } from './request';
    import indexBy from '../../../../app/public/scripts/function/indexBy';
    import compressImage from '../../../../app/public/scripts/function/compressImage';
    import Add from './components/Add.vue';
    import ImagePreview from '../../common/components/ImagePreview';
    import ImagePreviewItem from '../../common/components/ImagePreviewItem';

    export default {
        data () {
            return {
                addState: false,
                productSubejctList: [],
                multipleSelection: [],
                list: [],
                pid: null,
                loading: false,
                filter: {
                    productSubjectId: '',
                    key: ''
                },
                images: [],
                modalclose: true,
                keyinput: true,
                mousescroll: true,
                showclosebutton: true,
                showcaption: true,
                imagecountseparator: 'of',
                showimagecount: true,
                showthumbnails: true
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
                this.pid = product._id;
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
             * 设置图片预览器需要的图片
             */
            getImages (item) {
                var storageIds = item.storageIds;
                var result = [];
                if (storageIds && storageIds.length) {
                    storageIds.forEach((storageId)=> {
                        result.push({
                            u: storageId,
                            c: ''
                        })
                    });
                }
                return result;
            },

            /**
             * 刷新页面
             */
            refresh () {
                this.getList();
            },

            /**
             * 搜索
             */
            search () {
                this.pageNum = 1;
                this.refresh();
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
                       this.loading = false; 
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
            ImagePreview,
            ImagePreviewItem,
            Detail
        }
    }
</script>