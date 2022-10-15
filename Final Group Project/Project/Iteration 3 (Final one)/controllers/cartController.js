let pg = ('../db/postgresql');
const pool = require('../db/postgresql');
let productsModel = require('../models/productModel');
let ordersModel = require('../models/orderModel');


const cartPage = {
    viewSubPage: async (req, res) => {
        try{
            var sku_id = req.params.sku_id;
            console.log(req.params);
            // // add new item to order/cart
            console.log('REQ SESSION: **************************************************')
            console.log(req.session)
            console.log(req.session.user_id)

            var order_id = await productsModel.createCartForRequesterID(req.session.user_id);
            await productsModel.addProductToCart(order_id, sku_id);
            
            // // render new item summary
            const new_item = await productsModel.getProductBySkuID(sku_id)

            // // dispatch order_id to after_add, so it can viewed later at shoppingCart.hbs
            res.redirect('/shopCart/' + order_id);

        }catch (err) {
            console.log(err);
        }

        // let sql = `SELECT * FROM bottles WHERE bottles.id = ${req.params.id}`;
        // let query = pool.query(sql,(err,result)=>{
        //     if(err) throw err;
        //     console.log('here' + result)
        // });
    },

    viewCart: async (req, res)=>{
        try {
            // retrieve order_id form after_add
            var order_id = req.params.order_id

            console.log('REQ PARAMS: **************************************************')
            console.log(req.params)

            // retrieve shopping cart and dispatch to shoppingCart.hbs
            const cart = await ordersModel.getProductsByOrderID(order_id)

            console.log(cart)

            res.render('shoppingCart',{
                cart: cart.rows,
                order_id, admin: req.session.isAdmin
            })
        } catch (err) {
            console.log(err)
        }
    },
    findCart: async (req, res)=>{
        try {
            const result = await ordersModel.getOrderByUserID(req.session.user_id);
            if (result.rows.length != 0) {
                const order_id = result.rows[0].order_id;
                console.log(order_id);
                res.redirect('/shopCart/' + order_id);
            }
            else {
                console.log("user has no incomplete cart");
                res.render('emptyCartPage', {admin: req.session.isAdmin});
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = cartPage;