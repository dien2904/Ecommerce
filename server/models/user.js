const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods = {
    iscorrectPassword : async function (password){
        return await bcrypt.compare(password, this.password)
        
    }
}

module.exports = mongoose.model('User', userSchema);
