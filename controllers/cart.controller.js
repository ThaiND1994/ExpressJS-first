var db=require('../db')
module.exports.addToCart=function(request,response,next)
{
	var productId=request.params.productId;
	var sessionId=request.signedCookies.sessionId;
	// nếu không có sessionID
	if(!sessionId)
	{
		//đưa người dùng về lại trang product
		response.redirect('/product');
		return;
	}
	// tìm xem trong database đã có giá trị nào trùng với ID
	// khi người dùng click vào nút "Add to cart"
	// nếu không có thì count trả về 0
	// nếu có thì + thêm count vào
	var count =db.get('sessions').find({id:sessionId}).get('cart.' +productId ,0).value();
	db.get("sessions")
	.find({id:sessionId})
	.set('cart.' + productId ,count + 1)
	.write();
    response.redirect('/list/product');
}