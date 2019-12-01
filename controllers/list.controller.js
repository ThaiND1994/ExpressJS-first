var db=require('../db');
var shortid=require('shortid');
var Product=require('../models/product.model');
module.exports.product=function(request,response){
	var page=parseInt(request.query.page) || 1;//n
	var perPage=3 //x
	var start= (page-1) * perPage;
	var end= page * perPage;
	var product=db.get('product').value().slice(start,end)
	response.render('list/list',{
		product:product
	});

};