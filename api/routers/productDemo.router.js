var express=require('express');

var router=express.Router();

var controller=require('../controller/productDemo.controller');
router.get('/products',controller.index);
router.post('/products',controller.create);
router.put('/products/:id',controller.update);
router.patch('/products/:id',controller.updatePatch);
router.delete('/products/:id',controller.delete);
module.exports=router;