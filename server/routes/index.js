const userRouter = require('./user');

const initRouter = (app) => {
    app.use('/api/user', userRouter); // tất cả route của user đều bắt đầu bằng /api/user
};

module.exports = initRouter;
