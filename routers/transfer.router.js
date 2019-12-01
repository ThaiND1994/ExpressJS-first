var express=require('express');
var router=express.Router();
var db=require('../db');
var controller=require('../controllers/transfer.controller');
router.get('/create',controller.create);
router.post('/create',controller.postCreate);
module.exports=router;