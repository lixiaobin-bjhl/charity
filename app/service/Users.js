/**
 * @fileOverview charity-user-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => (

    class Users extends app.Service {

        * find(id) {
            yield this.ctx.model.users.find({});
        }
    }
);
