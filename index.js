require('dotenv').config();

var express=require('express');
var bodyParser = require('body-parser');
//cookie parser
var cookieParser = require('cookie-parser');
var shortid=require('shortid');
var useRouter=require('./routers/user.router');
var authRouter=require('./routers/auth.router');
var listRouter=require('./routers/list.router');

// khai báo lowdb(data base đơn giản)
var db=require('./db');
  // khai báo short id


var app=express();

app.use(cookieParser("trucphuong2333"))

var port=3000;


app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//khai báo static file
app.use(express.static('public'))


app.get('/',function(request,response){
	response.render('index',{
		name:'Thái'
	});
});

app.use('/users',useRouter)
app.use('/auth',authRouter)
app.use('/list',listRouter)




app.listen(port,function()
{
	console.log('Server is running '+ port);
})