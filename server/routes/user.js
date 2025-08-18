const router = require('express').Router();
const ctrl = require('../controller/user');

// Đăng ký user
router.post('/register', ctrl.register);

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE