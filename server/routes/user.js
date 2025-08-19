const router = require('express').Router();
const ctrl = require('../controller/user');

// Đăng ký user
router.post('/register', ctrl.register);
router.get('/login', ctrl.login);

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE