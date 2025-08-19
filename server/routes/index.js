const userRouter = require('./user');
const {notFound, errHandler} = require('../middleware/errhandler')

const initRouter = (app) => {
    app.use('/api/user', userRouter)
    
   
    app.use(notFound)
    app.use(errHandler)
    // tất cả route của user đều bắt đầu bằng /api/user
};

module.exports = initRouter
