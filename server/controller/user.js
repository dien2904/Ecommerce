const user = require('../models/user');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    console.log("REQ BODY:", req.body); // log để debug
    const { email, password, firstname, lastname } = req.body;
    // Kiểm tra input
    if (!email || !password || !lastname || !firstname) {
        return res.status(400).json({
            success: false,
            mes: 'Missing input'
        });
    }
    const User = await user.findOne({email})
    if(User) throw new Error('User has existed')
    else{
        const newuser = await user.create(req.body)
        return res.status(200).json({
            success: newuser ? true : false,
            mes: newuser ? 'registed successfully' : 'something went wrong' 
        });
    };
        
});
const login = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    // Kiểm tra input
    if (!email || !password) 
        return res.status(400).json({
            success: false,
            mes: 'Missing input'
        });
    const response = await user.findOne({email})
    if (response && await response.iscorrectPassword(password)) {
        const {password, role, ... userData } = response.toObject()
        return res.status(200).json({
            success:true ,
            userData
        })
    }else{
        throw new Error('invalid credential!!!')
    }
           
});

module.exports = {
    register ,
    login 
};
