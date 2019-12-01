var shortid=require('shortid');
var db=require('../db');

module.exports.create=function(request,response,next)
{
	response.render('transfer/create',{ csrfToken: request.csrfToken() });
};

module.exports.postCreate=function(request,response,next)
{   var data={
	  // id tự sinh ra bằng short ID
      id:shortid.generate(),
      //  tên account do người dùng nhập và được lưu vào request.body
      account:request.body.accountId,
      amount:parseInt(request.body.amount),
      // userID lấy từ singnedCookies
      userID:request.signedCookies.userid
    }
	db.get('transfers').push(data).write();
	response.redirect('/transfer/create')
	response.render('data is being processed')
};