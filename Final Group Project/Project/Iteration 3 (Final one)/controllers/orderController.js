const { getProductsByOrderID } = require('../models/orderModel');
const orderModel = require('../models/orderModel');
const productModelControls = require('../models/productModel');
const userModel  = require('../models/userModel');

const orderControls = {
    updateNewOrder: async(req,res,next) => {
        try {
            console.log("reached updateNewOrder!")
            const order_id = req.params.order_id;
            const location = req.body.location;
            const request = req.body.request;
            console.log(req.body);
            await orderModel.updateNewOrderStatus(order_id, location, request);
            res.render('orderSubmitPage');
        } catch (err) {
            console.log(err)
        }
    },
    viewOrder: async(req,res,next) => {
        try {
            const order_id = req.params.order_id;
            const orderInformation = await orderModel.getOrderByID(order_id);
            const requester = orderInformation.rows[0].requester_id;
            const userInformation = await userModel.getUserByID(requester);
            const productsInOrder = await getProductsByOrderID(order_id); 
            var email = req.session.email;
            const status = orderInformation.rows[0].status;
            var incomplete = true;
            if (status.toLowerCase() == "completed") {
                var incomplete = false;
                console.log("completed order reached");
                var fulfiller_id = orderInformation.rows[0].fulfiller_id;
                var fulfiller = await userModel.getUserByID(fulfiller_id);
                console.log("Fulfiller: " + fulfiller);
                var fulfiller_email = fulfiller.rows[0].email;
            }
            res.render('reviewOrderPage', {products: productsInOrder.rows, user: userInformation.rows, email, order_id, status, order_incomplete: incomplete, fulfiller_email});
        } catch (err) {
            console.log(err)
        }
    },
    updateOrder: async(req,res,next) => {
        try {
            const order_id = req.params.order_id;
            const order = await orderModel.getOrderByID(order_id);
            const location = order.rows[0].location;
            console.log(req.body);
            const fulfiller_id = await userModel.getUserByEmail(req.body.fulfiller_email);
            console.log(fulfiller_id);
            await orderModel.updateCurrentOrderStatus(order_id, req.body.status,fulfiller_id.rows[0].user_id);
            console.log(req.body.calculation);
            if (req.body.status == "Completed" && req.body.calculation == "Automatic"){
                const productsInOrder = await getProductsByOrderID(order_id); 
                for (var i = 0; i < productsInOrder.rows.length; i++) {
                    console.log(productsInOrder.rows[i].sku_id + " " + productsInOrder.rows[i].order_count + " " + location);
                    await productModelControls.deductProductCount(productsInOrder.rows[i].sku_id, productsInOrder.rows[i].order_count, location);
                }
                console.log(productsInOrder.rows)
            }
            res.redirect('/viewOrder/' + order_id);
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = orderControls;