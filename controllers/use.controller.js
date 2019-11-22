var db=require('../db');
var shortid=require('shortid');

module.exports.index=function(request,response){
	response.render('users/index',{
		users:db.get('users').value()
	});
};
module.exports.search=function(request,response){
	// vì query trả về 1 object nên phải là:request.query.q
	var q=request.query.q;
	var matchedUsers=db.get('users').value().filter(function(user){
	// vì indexof sẽ trả về -1 nếu không tìm thấy nên ta phải return khác -1 
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
	})
	response.render('users/index',{
		users:matchedUsers
	});
}
module.exports.view=function(request,response){
	var id= request.params.id
	var user=db.get('users').find({id:id}).value();
	response.render('users/view',{
		user:user
	})
}
module.exports.create=function(request,response){
	console.log(request.cookies);
	response.render('users/creat');
}
module.exports.postcreate=function(request,response)
{
//cài thêm shortid từ lowdb để tự tạo ra id mới mỗi khi người dùng nhập mới
// cài thêm request.body để lưu trữ giá trị người dùng nhập sau đó thêm vào mảng users
//vì lúc này biến users undefined nên ta thay = db.get('users')
// users.push(request.body);
//chuyển người dùng về trang users 
    request.body.id=shortid.generate();
	db.get('users').push(request.body).write();
	response.redirect('/users');
}
