<!--
  @fileOverview charity-cms-order-发货
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
    <el-dialog class="add-dialog" title="发货" v-model="$parent.deliverState">
        <el-form label-width="100px" :model="form" :rules="rules" ref="form" class="add-dialog" size="small" style="margin-top: 20px;">
            
            <el-form-item label="当前订单号">
                {{ order._id }}
            </el-form-item>
            
            <el-form-item label="快递类型" required prop="expressType">
                <el-autocomplete
                    v-model="form.expressTypeName"
                    style="width:300px"
                    :fetch-suggestions="querySearchExpress"
                    custom-item="express-item"
                    placeholder="输入快递公司名称"
                    @select="selectExpress"
                    icon="edit"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="快递单号" required prop="expressNumber">
                <el-input placeholder="快递单号" v-model.trim="form.expressNumber" :maxlength="30" style="width:300px"></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="expressRemark">
                <el-input placeholder="备注" v-model.trim="form.expressRemark" type="textarea" :maxlength="100" style="width:300px"></el-input>
            </el-form-item> 

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" :disabled="submiting" @click.native.prevent="submit">保存</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import Vue from 'vue';
    Vue.component('express-item', {
        functional: true,
        render: function (h, ctx) {
            var item = ctx.props.item;
            return h('li', ctx.data, [
                h('div', { attrs: { class: 'com' } }, [item.com])
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });

    import { update } from '../request';
    import expressOptions from './expressOptions';

    import config from '../config';

    export default {
        data () {
            return {
                form: {
                    expressType: '',
                    expressRemark: '',
                    expressNumber: '',
                    expressTypeName: ''
                },
                rules: {},
                restaurants: expressOptions,
                submiting: false
            };
        },
        props: {
            order: {
                default () {
                    return {};
                }
            }
        },
        methods: {
            /**
             * 取消添加分类
             */
            cancel () {
                this.$parent.deliverState = false;
            },
            selectExpress (item) {
                this.form.expressTypeName = item.com;
                this.form.expressType = item.no;
            },

            /**
             * 搜索快递名称
             */
            querySearchExpress (queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString 
                    ? restaurants.filter(this.createFilter(queryString)) 
                    : restaurants;
                cb(results);
            },

            /**
             * 过快递名称 
             */
            createFilter(queryString) {
                return (restaurant) => {
                    var no = restaurant.no;
                    var com = restaurant.com;

                    return (
                        no.indexOf(queryString.toLowerCase()) > -1
                        || no.indexOf(queryString.toUpperCase()) > -1
                        || no.indexOf(queryString) > -1
                        || no.indexOf(queryString) > -1
                        || com.indexOf(queryString) > -1
                    );
                };
            },
            /**
             * 提交数据
             */
            submit() {
                this.$refs['form'].validate((valid) => {
				    if (valid) {
                        var form = this.form;
                        
                        var params = {
                            expressType: form.expressType,
                            expressNumber: form.expressNumber,
                            expressRemark: form.expressRemark,
                            status: 2
                        };
                        
                        update(this.order._id, params)
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
            
        }
    };
</script>