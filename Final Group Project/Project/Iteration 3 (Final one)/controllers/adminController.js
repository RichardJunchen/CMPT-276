const productsModel = require('../models/productModel');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

const adminControls = {
    viewSettings:async (req,res) =>{
        try {
            var products = await productsModel.getAllProducts();
            var officeCounts = await productsModel.getAllProductCounts();
            const user = await userModel.getAlluser();
            const orders = await orderModel.getAllOrders();
            var productList = [];
            for (var i = 0; i < products.rows.length; i++) {
                var currentProduct = products.rows[i];
                var sku_id = currentProduct.sku_id;
                for (var j = 0; j < officeCounts.rows.length; j++) {
                    var currentQuantity = officeCounts.rows[j];
                    if (currentQuantity["sku_id"] == sku_id) {
                        switch (currentQuantity.location) {
                            case "Burnaby":
                                currentProduct["BurnabyQuantity"] = currentQuantity["quantity"];
                                break;
                            case "Metrotown":
                                currentProduct["MetrotownQuantity"] = currentQuantity["quantity"];
                                break;
                            case "New Westminster":
                                currentProduct["NewWestminsterQuantity"] = currentQuantity["quantity"];
                                break;
                            case "Richmond":
                                currentProduct["RichmondQuantity"] = currentQuantity["quantity"];
                                break;
                            case "Surrey":
                                currentProduct["SurreyQuantity"] = currentQuantity["quantity"];
                                break;
                            case "Vancouver":
                                currentProduct["VancouverQuantity"] = currentQuantity["quantity"];
                                break;
                        }
                    }
                }
                productList.push(currentProduct);
            }
            res.render('settingsPage',{items: productList,user:user.rows, orders: orders.rows, admin: req.session.isAdmin})

        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = adminControls;