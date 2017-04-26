/**
 * @fileOverview charity-cms-newsSubject request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post } from '../../../../app/public/scripts/common/service';

export function add (params) {
    return post('/api/newsSubject', {
        name: params.name,
        remark: params.remark
    });
}