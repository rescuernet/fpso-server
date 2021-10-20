const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    email: {type:String,unique:true,required:true,minlength:6,trim:true},
    password: {type:String,required:true},
    isActivated: {type:Boolean,default:false},
    activationLink: {type:String}
})

module.exports = model('User',UserSchema);