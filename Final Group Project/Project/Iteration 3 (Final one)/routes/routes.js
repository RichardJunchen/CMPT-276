const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('../controllers/AuthController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');
const uploadController = require('../controllers/uploadController');
const faqController = require('../controllers/faqController');
const Controller404 = require('../controllers/404Controller');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');
const emailController = require('../controllers/emailController');
const adminController = require('../controllers/adminController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', authController.authenticate);
router.get('/redirect',authController.redirect);
router.get('/home',authController.checkAuth, authController.home);
router.post('/addProduct',productController.addProduct);
router.get('/shopBottles',productController.viewBottles)
router.get('/shopBackpacks',productController.viewBackpacks)
router.get('/shopShirts',productController.viewShirts)
router.get('/shopAllProducts',productController.viewAllProducts)
router.get('/detail/:productId',productController.viewDetail)
router.get('/faq',faqController.viewFAQ)
router.get('/guideline',faqController.viewGuideline)
router.get('/after_add/:product_id/:sku_id',cartController.viewSubPage)
router.get('/shopCart/:order_id',cartController.viewCart)
router.get('/checkoutPage/:order_id',checkoutController.viewCheckout)
router.get('/settings',adminController.viewSettings)
router.get('/contact',productController.viewcontact)
router.post('/submitOrder/:order_id', emailController.sendEmail, orderController.updateNewOrder)
router.post('/uploadPhotos',uploadController.uploadFile)
router.get('/shopCart', cartController.findCart);
router.get('/viewOrder/:order_id', orderController.viewOrder);
router.post('/modifyOrder/:order_id', orderController.updateOrder);


// ajax requests 
router.post('/updateProduct', productController.updateProduct)
router.post('/getProductPageDetails', productController.returnProductDetails)

// other routes that are not defined
router.get('/*',Controller404.notFound)

module.exports = router;
