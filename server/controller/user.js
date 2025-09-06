const user = require('../models/user');
const asyncHandler = require('express-async-handler');
const {generateAccessToken, generateRefreshToken} = require('../middleware/jwt');
const jwt = require('jsonwebtoken');

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

// refreshtoken => cấp mới accesstoken
// accesstoken => xác thực người dùng, phân quyền người dùng
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
        // tách password và role ra khỏi respone
        const {password, role, ... userData } = response.toObject()
        // tạo accesstoken
        const accesstoken = generateAccessToken(response._id,role)
        // tạo refresh token
        const refreshtoken = generateRefreshToken(response._id)
        // lưu refresh token vào database
        await user.findByIdAndUpdate(response._id,{refreshtoken},{new:true})
        // lưu rftokenvào cookie
        res.cookie('refreshtoken',refreshtoken,{httpOnly:true, maxAge: 7 * 24 * 60 * 60 * 1000})
        return res.status(200).json({
            success:true ,
            accesstoken,
            userData
        })
    }else{
        throw new Error('invalid credential!!!')
    }
           
});

const getcurrent = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const User = await user.findById(_id).select('-refreshtoken -password -role')
    return res.status(200).json({
        success: false,
        rs: User ? User : 'user not found'
    })
        
});

const refreshacesstoken = asyncHandler (async(req, res) => {
    const cookie = req.cookies //lấy token từ cookie
    
    if(!cookie && !cookie.refreshtoken) throw new Error('no refresh token') //check token có hợp lệ kh
    
    const rs = await jwt.verify(cookie.refreshtoken, process.env.JWT_SECRET)
    const respone = await user.findOne({_id:rs._id, refreshtoken: cookie.refreshtoken}) 
    return res.status(200).json({
            success: respone ? true : false,
            newaccesstoken: respone ? generateAccessToken( respone._id,  respone.role) : 'Refreshtoken not matched'
        })
})

const logout = asyncHandler (async(req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshtoken) throw new Error('No refresh token in cookie')
    // xóa refreshtoken o db
    await user.findOneAndUpdate({refreshtoken:cookie.refreshtoken}, {refreshtoken:''}, {new: true})
    // xóa refreshtoken o trinh duyet
    res.clearCookie('refreshtoken',{
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout done'
    })
})


module.exports = {
    register ,
    login ,
    getcurrent,
    refreshacesstoken,
    logout
};
