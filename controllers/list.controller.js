var db=require('../db');
var shortid=require('shortid');
module.exports.product=function(request,response){
	var page=parseInt(request.query.page) || 1;//n
	var perPage=3 //x
	var start= (page-1) * perPage;
	var end= page * perPage;
	var product=db.get('product').value().slice(start,end)
	console.log(product)
	response.render('list/list',{
		product:product
	});
};