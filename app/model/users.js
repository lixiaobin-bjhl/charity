
'use strict';

module.exports = mongoose => {
    const UserSchema = new mongoose.Schema({
        name: { type: String },
        password: { type: String }
    });
    return mongoose.model('Users', UserSchema);
}   