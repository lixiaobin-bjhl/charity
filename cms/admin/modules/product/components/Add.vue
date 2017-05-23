<!--
  @fileOverview charity-cms-product 添加产品
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <el-dialog :title="product ? '编辑产品' : '新增产品'" v-model="$parent.addState" class="add-dialog add-product-dialog" size="small">
        <el-form label-width="100px" :model="form" :rules="rules" ref="form" v-loading="loading">
            <el-form-item label="标题" required prop="title">
                <el-input placeholder="请输入1-30字内的产品标题" :maxlength="30" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item prop="storageId">
                <upload @change="changeProductImage">
                    <el-button type="primary">添加图片</el-button>
                </upload>
                <el-input type="hidden" v-model="form.storageId"></el-input>
                <ul v-if="form.storageIds.length" class="product-imgs">
                    <li v-for="(storageId, index) in form.storageIds">
                        <i class="el-icon-circle-cross" @click="removeStorageId(index)"></i>
                        <img width="50" height="50" :src="storageId|compressImage(50, 50)">
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="摘要" prop="summary">
                <el-input placeholder="请输入产品摘要" type="textarea" :maxlength="100" v-model="form.summary"></el-input>
            </el-form-item>
            <el-form-item label="分类" required prop="productSubjectId">
                <el-select v-model="form.productSubjectId" placeholder="请选择分类" clearable>
                    <el-option v-for="item in productSubejctList" :key="item._id"  :value="item._id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="规格">
                <div v-for="(item, index) in form.specifications" :key="index">
                    <el-input placeholder="规格内容" class="dynamic-input" v-model="item.value">
                        <el-select v-model="item.id" slot="prepend" placeholder="请选择规格">
                            <el-option v-for="specification in specificationOption" 
                                :key="specification.id" 
                                :label="specification.name" 
                                :value="specification.id">
                            </el-option>
                        </el-select>
                        <span slot="append" class="icon el-icon-circle-cross" @click="removeSpecification(index)" title="删除规格"></span>
                    </el-input>
                </div>
                <div>
                    <span class="el-icon-plus icon-tianjia" @click="addSpecification">&nbsp;<a href="javascript:;">添加规格</a></span>
                </div>
            </el-form-item>

            <el-form-item label="库存" prop="storeCount">
                <el-input placeholder="请输入库存数" :maxlength="10" v-model="form.storeCount"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)" required prop="price">
                 <el-input placeholder="请输入产品价格" :maxlength="10" v-model="form.price"></el-input>
            </el-form-item>
            <div class="el-form-item">
                <label for="price" class="el-form-item__label" style="width: 100px;">
                    优惠(元)&nbsp;<el-tooltip class="item" effect="dark" content="售卖价格等于原价减去优惠价格" placement="right">
                    <span class="el-icon-warning"></span>
                </el-tooltip>
                </label>
                <div class="el-form-item__content" style="margin-left: 100px;">
                    <el-input placeholder="请输入优惠价格" :maxlength="10" v-model="form.discountPrice"></el-input>
                </div> 
            </div>

            <el-form-item label="自定义属性">
                 <div v-for="(item, index) in form.specifications" :key="index">
                    <el-input placeholder="规格内容" class="specification-input" v-model="item.value">
                        <el-select v-model="item.id" slot="prepend" placeholder="请选择规格">
                            <el-option v-for="specification in specificationOption" 
                                :key="specification.id" 
                                :label="specification.name" 
                                :value="specification.id">
                            </el-option>
                        </el-select>
                        <span slot="append" class="icon el-icon-circle-cross" @click="removeSpecification(index)" title="删除自定义属性"></span>
                    </el-input>
                    <div>
                        <span class="el-icon-plus icon-tianjia" @click="addSpecification">&nbsp;<a href="javascript:;">添加自定义属性</a></span>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input placeholder="请输入备注" type="textarea" :maxlength="100" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" :disabled="submiting" @click.native.prevent="submit">保存</el-button>
        </span>
    </el-dialog>
</template>
<script>

    import { add, update } from '../request';
    import config from '../config';
    import * as newsSubejctRequest  from '../../productSubject/request';
    import Upload from '../../../common/components/Upload.vue';
    import  { uptoken, upload } from '../request';

    export default {
        data () {
            return {
                uploadURL: '',
                form: {
                    title: '',
                    productSubjectId: '',
                    storageIds: [],
                    summary: '',
                    price: '',
                    storeCount: '',
                    remark: '',
                    specifications: [
                        {
                            value: '',
                            id: 0
                        }
                    ],
                    discountPrice: ''
                },
                userDefinedfields: [
                    {
                        name: '',
                        value: ''
                    }
                ],
                loading: false,
                rules: config.addFormRule,
                specificationOption: config.specificationOption,
                productSubejctList: [],
                submiting: false
            };
        },
        computed: {
            product () {
                return this.$store.state.product.product || null;
            }
        },
        created () {
            var product = this.product;
            this.getNewsSubjectList();
            
            if (product) {
                Object.assign(this.form, {
                    title: product.title,
                    summary: product.summary,
                    price: product.price,
                    storeCount: product.storeCount,
                    storageIds: product.storageIds,
                    discountPrice: product.discountPrice,
                    remark: product.remark,
                    specifications: product.specifications,
                    storeCount: product.storeCount,
                    productSubjectId: product.productSubjectId
                });
                var specifications = product.specifications;
                if (specifications && specifications.length) {
                    Object.assign({
                        specifications: product.specifications
                    });
                }
            }
        },
        methods: {
            /**
             * 改成产品图片
             */
            changeProductImage (files) {
                if (!files) {
                    return;
                }
                var file = files[0];
                var fd = new FormData();
                
                fd.append('file', file);
                uptoken()
                    .then((res)=> {
                        var token = res.data.token;
                        fd.append('token', token);
                        this.loading = true;
                        upload(fd)
                            .then((res)=> {
                                this.form.storageIds.push(res.key);
                                this.loading = false;
                                toast('图片上传成功', 'success');
                            })
                            .catch(()=> {
                                this.loading = false;
                            });
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
             * 删除图片
             * @param {number} index 图片的索引
             */
            removeStorageId (index) {
                this.form.storageIds.splice(index, 1);
            },

            /**
             * 添加规格
             */
            addSpecification () {
                this.form.specifications.push({
                    id: '',
                    value: ''
                })
            },

            /**
             * 移出规格
             */
            removeSpecification (index) {
                this.form.specifications.splice(index, 1);
            },

            /**
             * 取消添加分类
             */
            cancel () {
                this.$parent.addState = false;
            },

            /**
             * 提交数据
             */
            submit() {
                this.$refs['form'].validate((valid) => {
				    if (valid) {
                        var form = this.form;
                        var product = this.product;
                        var handler = null;
                        var params = {
                            title: form.title,
                            summary: form.summary,
                            price: form.price,
                            remark: form.remark,
                            storageIds: form.storageIds,
                            discountPrice: form.discountPrice,
                            productSubjectId: form.productSubjectId,
                            specifications: form.specifications,
                            storeCount: form.storeCount
                        };

                        // 编辑
                        if (product) {
                            handler = update.bind(null, product._id, params);
                        } else {
                            handler = add.bind(null, params);
                        }
                        handler()
                        .then(()=> {
                            toast('保存成功', 'success');
                            this.$emit('save');
                            this.cancel();
                        })
                        .catch(()=> {
                           this.submiting = false;
                        });
                    }
                });
            }
        },
        beforeDestroy() {
            this.$store.commit('RESET_PRODUCT');
        },
        components: {
            Upload
        }
    };
</script>