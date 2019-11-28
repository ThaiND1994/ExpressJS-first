var express=require('express');
var multer  = require('multer')
var router=express.Router();
var db=require('../db');
var controller=require('../controllers/list.controller');
router.get('/product',controller.product);
module.exports=router;