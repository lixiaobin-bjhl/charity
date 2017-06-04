/**
 * @fileOverview c端公共业务 
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

require('../../css/ccommon.scss');

(function () {
    $('.customer-logo').find('.customer-box').each(function () {
        $(this).hover(function () {
            $(this).find('.am-active').show();
            $(this).find('.normal-logo').hide();
        }, function () {
            $(this).find('.am-active').hide();
            $(this).find('.normal-logo').show();
        })
    });
})()


