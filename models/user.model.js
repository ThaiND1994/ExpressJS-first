var mongoose=require('mongoose');
// dùng để khai báo những field có trong Object
// muốn lưu vào database thì lưu vào Schema
// lấy ra cũng tương tự
// or dùng để làm sạch dữ liệu or validate dữ liệu
var userSchema=new mongoose.Schema({
   email:String,
   password:String,
   name:String,
   phone:String
});
var User= mongoose.model('User',userSchema,'users');
module.exports = User;