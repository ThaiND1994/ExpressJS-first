var db=require('../db');
module.exports.login=function(request,response){
	response.render('auth/login');
};
// khi người dùng nhập vào email và password thì sẽ gửi 1 post request lên sever
// sever sẽ tiếp nhận và tìm trong database
module.exports.postlogin=function(request,response){
    var email=request.body.email;
    var pass=request.body.pass;
    var user=db.get('users').find({email:email}).value();
    var pass=db.get('users').find({pass:pass}).value();
    if(!user)
    {
    	response.render('auth/login',{
    		errors:[
    			'Use does not exits'
    		]
    	})
    return;
    }
    if(!pass)
    {
    	response.render('auth/login',{
    		errors:[
    			'Wrong Password!'
    		]
    	})
    return;
    }
    response.cookie('userid',user.id);
    response.redirect('/users')
};