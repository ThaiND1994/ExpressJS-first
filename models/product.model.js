var mongoose=require('mongoose');
// dùng để khai báo những field có trong Object
// muốn lưu vào database thì lưu vào Schema
// lấy ra cũng tương tự
// or dùng để làm sạch dữ liệu or validate dữ liệu
var productSchema=new mongoose.Schema({
   name:String,
   img:String,
   description:String
});
var Product= mongoose.model('Product',productSchema,'products');
module.exports = Product;
// khi exports xong nếu muốn dùng ở file nào chỉ cần vào file đó require 