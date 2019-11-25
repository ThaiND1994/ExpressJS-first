var db=require('../db');
module.exports.requireAuth=function(request,response,next)
{
	//nếu cookie khác
	if(!request.signedCookies.userid)
	{
		response.redirect('/auth/login');
		return;
	}
	var user=db.get('users').find({id:request.signedCookies.userid}).value();
	if(!user)
	{
		response.redirect('/auth/login');
		return;
	}
	response.locals.user=user;
	next();
}