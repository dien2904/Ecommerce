const router = require('express').Router();
const ctrl = require('../controller/user');
const {verifyaccesstoken} = require('../middleware/verifytoken')

// Đăng ký user
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/current',verifyaccesstoken,ctrl.getcurrent);

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE