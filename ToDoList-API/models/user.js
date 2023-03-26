const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String
});

// Use this when you don't have the instance and you want to get a new one or perform action without actual instance
userSchema.statics.login = async function (email, password) {
    let result = null;

    try {
        let user = await this.findOne({ email: email }).exec();
        if (user && user.password === password) {
            delete user.password;
            result = user;
        }
    } catch (ex) {
        //logger.error(ex);
    }
    return result;
};

// Use this when you already have the instance of the object
userSchema.methods.getFullName = function () {
    return this.name + ' ' + this.email;
};

module.exports = mongoose.model('User', userSchema);