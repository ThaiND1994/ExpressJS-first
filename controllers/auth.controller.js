var db=require('../db');
var md5=require('md5');
module.exports.login=function(request,response){
	response.render('auth/login');
};
// khi người dùng nhập vào email và password thì sẽ gửi 1 post request lên sever
// sever sẽ tiếp nhận và tìm trong database
module.exports.postlogin=function(request,response){
	//email và pass người dùng nhập
    var email=request.body.email;
    var pass=request.body.pass;
    // chuyển đổi pass người dùng nhập thành mã MD5
    var hashedPass=md5(pass);
    // tìm xem email và pass có giống database không
    var user=db.get('users').find({email:email}).value();
    var pass=db.get('users').find({pass:pass}).value();
    //nếu user không đúng
    if(!user)
    { 
    	//đưa người dùng ở lại trang login và thông báo lỗi 
    	response.render('auth/login',{
    		errors:[
    			'Use does not exits'
    		]
    	})
    return;
    }
    // nếu pass người dùng nhập đã mã hóa thành mã MD5 không giống vs mã md5 trong database
    // đưa người dùng ở lại trang login và thông báo lỗi 
    if(user.pass !==hashedPass)
    {
    	response.render('auth/login',{
    		errors:[
    			'Wrong Password!'
    		]
    	})
    return;
    }
    // cấp cho người dùng 1 mã signedcookie khi đăng nhập đúng
    response.cookie('userid',user.id,{signed:true});
    //chuyển sang trang user
    response.redirect('/users')
};