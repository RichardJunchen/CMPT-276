const checkoutPage = {
    viewCheckout: (req, res) => {
        
        // retrieve order_id from shopping cart
        var order_id = req.params.order_id

        // checkout ...

        res.render('checkoutPage', {order_id: req.params.order_id, email: req.session.email});
    },
    submitOrder: async (req,res,next) => {
        try {
            const bottles = await productsModel.getAllBottles();
            const shirts = await productsModel.getAllShirts();
            const backpacks = await productsModel.getAllBackpacks();
            res.render('allProductsPage', {bottles: bottles.rows, shirts: shirts.rows, backpacks:backpacks.rows, admin: req.session.isAdmin});
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = checkoutPage;