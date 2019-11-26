var db=require('../db');
var md5=require('md5');
var shortid=require('shortid');

module.exports.index=function(request,response){
	var page=parseInt(request.query.page) || 1;//n
	var perPage=3 //x
	var start= (page-1) * perPage;
	var end= page * perPage;
	response.render('users/index',{
		users:db.get('users').value().slice(start,end)
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
	console.log(user);
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
    var id=request.body.id
    id=shortid.generate();
    var name=request.body.name;
    var phone=request.body.phone;
    var email=request.body.email;
    var pass=request.body.pass;
    // chuyển đổi pass người dùng nhập thành mã MD5
    var hashedPass=md5(pass);
	db.get('users').push({id:id,name:name,phone:phone,email:email,pass:hashedPass}).write();
	response.redirect('/users');
}