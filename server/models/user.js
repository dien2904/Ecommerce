const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobile: { type: String, unique:true },
    role: { type:String, default:"user"},

    cart:{type:Array ,default:[]},
    address:[{type:mongoose.Types.ObjectId, ref:'address'}],
    wishlist:[{type:mongoose.Types.ObjectId, ref:'product'}],
    isblocked:{type:Boolean, default:false},
    refreshtoken:{type:String},

    passwordchangeat:{type:String},
    passwordtoken:{type:String},
    passwordresetexpires:{type:String}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
