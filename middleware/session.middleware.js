var shortid=require('shortid');
var db=require('../db');
module.exports=function(request,response,next)
{
	//nếu như chưa có cookie thì tạo mới cookie có tên là sessionID và trả về 
	if(!request.signedCookies.sessionId)
	{   //khai báo biến sessionId để dùng được nhiều lần
		var sessionId=shortid.generate();
     response.cookie('sessionId',sessionId,{
     	signed:true
     });
     db.get('sessions').push({id:sessionId}).write();
	}
	//nếu có cookie rồi thì next ko chạy dòng 5,6,7
	var sessionId=request.signedCookies.sessionId;
	var cart=db.get("sessions").find({id:sessionId}).get("cart").size().value();
	// var countCart=Object.values(db.get("sessions").find({id:sessionId}).get("cart").value());
    response.locals.cart=cart;
	next();
}