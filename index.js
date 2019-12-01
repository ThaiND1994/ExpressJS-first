require('dotenv').config();

var express=require('express');
var bodyParser = require('body-parser');
//cookie parser
var cookieParser = require('cookie-parser');
// khai báo short id
var shortid=require('shortid');
// csrf
var csurf = require('csurf')
// mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/express-demo3')

var useRouter=require('./routers/user.router');
var authRouter=require('./routers/auth.router');
var listRouter=require('./routers/list.router');
var sessionMiddleware=require('./middleware/session.middleware');
var CartRouter=require('./routers/cart.router')
var transferRouter=require('./routers/transfer.router')
var authMiddleware=require('./middleware/auth.middleware')
var productDemo=require('./routers/product.router')
// khai báo lowdb(data base đơn giản)
var db=require('./db');
var app=express();
app.use(cookieParser("trucphuong2333"))
var port=3000;

// template engines expressJS
app.set('view engine','pug');
app.set('views','./views');

// để cho nó hoạt động ở tất cả các router khác nhau
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//khai báo static file
app.use(sessionMiddleware)
app.use(express.static('public'))
app.use('/cart',CartRouter)
app.use('/users',useRouter)
app.use('/auth',authRouter)
app.use('/list',listRouter)
app.use('/product',productDemo)
// chống hack csrf
// phải được đặt bên trên của app.use('/transfer',authMiddleware.requireAuth,transferRouter);
// nếu đặt bên dưới sẽ bị lỗi
app.use(csurf({cookie:true}))
app.use('/transfer',authMiddleware.requireAuth,transferRouter);

app.get('/',function(request,response){
	response.render('index',{
		name:'Thái'
	});
});

app.listen(port,function()
{
	console.log('Server is running '+ port);
})