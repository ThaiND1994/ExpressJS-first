var Product=require('../../models/product.model');
// dùng post man để chạy
// hiển thị
module.exports.index= async function(request,response,next)
{
	//Product.find() trả về 1 promise  khi nó resolve cụ thể là product trong data base
	// các bắt lỗi đưa nó vào try catch
	try{
    var products = await Product.find();
    // demo lỗi
    // products.foo();
	response.json(products);
       }
	catch(error){
		// nó sẽ truyền lỗi đến middleware tiếp theo và đưa ra thông báo
		next(error);
	}
};
// tạo mới dữ liệu người dùng nhập vào từ ứng dụng post man và được lưu trữ trong  
module.exports.create= async function(request,response)
{
 var products = await Product.create(request.body);
 response.json(products);
};
// cập nhật dữ liệu theo id
// với rest api put ta có thể lấy ra và thay đổi toàn bộ dữ liệu trong mongoDB
// dùng Models.findByIdAndUpdate() để tìm và update giá trị khi dùng put


module.exports.update= async function(request,response)
{   var id=request.params.id;
	var products= await Product.findByIdAndUpdate({_id:id},{ $set: { name: 'jason bourne' }});
	response.json(products);
}


// cập nhật dữ liệu theo id
// với rest api patch ta có thể lấy ra và thay đổi  dữ liệu trong mongoDB
// dùng Models.findOneAndUpdate() để tìm và update giá trị khi dùng patch


module.exports.updatePatch= async function(request,response)
{   var id=request.params.id;
	var products= await Product.findOneAndUpdate({_id:id},{ $set: { name: 'jason bourne' }});
	response.json(products);
}
// xóa dữ liệu theo id

module.exports.delete=async function(request,response)
{
	var id=request.params.id;
	var products= await Product.findByIdAndDelete({_id:id})
	response.json(products);
}
