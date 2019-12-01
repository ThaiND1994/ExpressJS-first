var express=require('express');
var multer  = require('multer')
var router=express.Router();
var db=require('../db');
var controller=require('../controllers/product.controller');
router.get('/product',controller.index);
module.exports=router;