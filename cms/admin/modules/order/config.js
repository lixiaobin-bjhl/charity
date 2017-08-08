/**
 * @fileOverview charity-order-config
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default {
    ORDER_STATUS: [
        {
            id: 0,
            name: '待支付'
        },
        {
            id: 1,
            name: '待发货'
        },
        {
            id: 2,
            name: '待收货'
        },
        {
            id: 3,
            name: '已完成'
        }
    ],
    deliverRules: {
        expressType: {
            required: true,
            message: '请选择快递类型'
        },
        expressNumber: {
            required: true,
            message: '请填写快递单号'
        }
    }
}


