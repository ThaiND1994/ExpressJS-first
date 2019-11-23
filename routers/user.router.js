var express=require('express');
var router=express.Router();
var db=require('../db');
var shortid=require('shortid');
var controller=require('../controllers/use.controller');
var validate=require('../validate/user.validate');
var authMiddleware=require('../middleware/auth.middleware');


router.get('/',authMiddleware.requireAuth,controller.index);
router.get('/cookie',function(request,response,next){
	response.cookie('user-id',12345);
	response.send('Hello');
})
router.get('/search',controller.search);
router.get('/create',controller.create);
router.get('/:id',controller.view);
router.post('/create',validate.postCreate,controller.postcreate);
module.exports=router;