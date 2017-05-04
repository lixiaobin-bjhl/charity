<!--
  @fileOverview charity-cms-main 添加产品
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <el-dialog :title="product ? '编辑产品' : '新增产品'" v-model="$parent.addState" size="small">
        <el-form label-width="100px" :model="form" :rules="rules" ref="form" v-loading="loading">
            <el-form-item label="标题" required prop="title">
                <el-input placeholder="请输入1-30字内的产品标题" :maxlength="30" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item prop="storageId">
                <upload @change="changeProductImage">
                    <el-button type="primary" v-text="form.storageId ? '修改图片' : '上传图片'"></el-button>
                </upload>
                <el-input type="hidden" v-model="form.storageId"></el-input>
                <div v-if="form.storageId">
                    <img width="100" height="100" :src="form.storageId|compressImage(100, 100)">
                </div>
            </el-form-item>
            <el-form-item label="摘要" required prop="summary">
                <el-input placeholder="请输入产品摘要" type="textarea" :maxlength="30" v-model="form.summary"></el-input>
            </el-form-item>
            <el-form-item label="分类" required prop="productSubjectId">
                <el-select v-model="form.productSubjectId" placeholder="请选择分类" clearable>
                    <el-option v-for="item in productSubejctList"  :value="item._id" :label="item.name"></el-option>
                </el-select>
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
                    storageId: '',
                    summary: '',
                    price: '',
                    discountPrice: ''
                },
                loading: false,
                rules: config.addFormRule,
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
                    storageId: product.storageId,
                    discountPrice: product.discountPrice,
                    productSubjectId: product.productSubjectId
                });
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
                                this.form.storageId = res.key;
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
                            storageId: form.storageId,
                            discountPrice: form.discountPrice,
                            productSubjectId: form.productSubjectId
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