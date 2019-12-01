var Product=require('../models/product.model');
module.exports.index=function(request,response,next)
{
	//Product.find() trả về 1 promise  khi nó resolve cụ thể là product trong data base
	Product.find().then(function(products)
	{ //hiển thị
     response.render('product/index',{
     	product:products
     });
     console.log(products);
	});
};