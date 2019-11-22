var express=require('express');
var router=express.Router();
var db=require('../db');
var shortid=require('shortid');
var controller=require('../controllers/use.controller');


router.get('/',controller.index);
router.get('/search',controller.search);
router.get('/create',controller.create);
router.get('/:id',controller.view);
router.post('/create',controller.postcreate);
module.exports=router;