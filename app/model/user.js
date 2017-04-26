/**
 * @fileOverview charity-user-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {
    const UserSchema = new mongoose.Schema({
        name: { type: String },
        password: { type: String }
    });
    return mongoose.model('User', UserSchema, 'user');
}   