let productsModel = require('../models/productModel');
const uploadController = require('../controllers/uploadController');
const userModelControls = require('../models/userModel');

let pg = ('../db/postgresql');


const productControls = {

    viewcontact: (req,res,next)=>{
        res.render('contact', {admin: req.session.isAdmin});
    },
    viewCategory: (req,res,next) => {
        console.log(req.session);
        res.render('home', {name: req.session.name, email: req.session.email, admin: req.session.isAdmin});
    },
    addProduct: async (req,res,next) => {
            console.log(req.body);
            // insert into products using first three fields, name, description, and value
            // After insertion, retreieve the product ID, and delete the name, description, and value fields for better indexing of the JSON object
            try {
                var product_id = await productsModel.insertProduct(req.body.name, req.body.description, req.body.value, req.body.category);
                console.log("product_id: " + product_id.rows[0].product_id);
                delete req.body.name;
                delete req.body.description;
                delete req.body.value
                delete req.body.category
                var numOfVarieties = Object.keys(req.body).length/5
                console.log(numOfVarieties);
                for (var i = 0; i < numOfVarieties; i++) {
                    var sku_id = req.body[Object.keys(req.body)[i*5]]
                    var gender = req.body[Object.keys(req.body)[i*5 + 1]]
                    var size = req.body[Object.keys(req.body)[i*5 + 2]]
                    var color = req.body[Object.keys(req.body)[i*5 + 3]]
                    var imgurl = req.body[Object.keys(req.body)[i*5 + 4]]
                    console.log(sku_id + " " + gender + " " + size + " " + color + " " + imgurl + " ");
                    const result = await productsModel.insertProductDetails(sku_id, product_id.rows[0].product_id, size, gender, color,imgurl);
                    const result2 = await productsModel.insertEmptyProductCount(sku_id);
                }
                res.render('home', {name: req.session.name, email: req.session.email,admin: req.session.isAdmin});
            } catch (err) {
                console.log(err)
            }
        
    },
    retrieveAllProducts: async(req,res,next) => {
        try {
            const products = await productsModel.getAllProducts();
            res.render('allProductsPage', {bottles: bottles.rows, shirts: shirts.rows, backpacks:backpacks.rows, admin: req.session.isAdmin});
        } catch (err) {
            console.log(err)
        }
    },
    viewAllProducts: async (req,res,next) => {
        try {
            const bottles = await productsModel.getAllBottles();
            const shirts = await productsModel.getAllShirts();
            const backpacks = await productsModel.getAllBackpacks();
            res.render('allProductsPage', {bottles: bottles.rows, shirts: shirts.rows, backpacks:backpacks.rows, admin: req.session.isAdmin});
        } catch (err) {
            console.log(err)
        }
    },
    viewBottles: async (req,res,next) => {
        try {
            const bottles = await productsModel.getAllBottles();
            console.log(bottles.rows);
            res.render('bottlesPage', {bottles: bottles.rows, category: "Bottles", admin: req.session.isAdmin})
        } catch (err) {
            console.log(err)
        }
    },
    viewBackpacks: async (req,res,next) => {
        try {
            const backpacks = await productsModel.getAllBackpacks();
            res.render('backpacksPage', {backpacks: backpacks.rows, category: "Backpacks", admin: req.session.isAdmin})
        } catch (err) {
            console.log(err)
        }
    },
    viewShirts: async (req,res,next) => {
        try {
            const shirts = await productsModel.getAllShirts();
            res.render('shirtsPage', {shirts: shirts.rows, category: "Shirts", admin: req.session.isAdmin})
        } catch (err) {
            console.log(err)
        }
    },
    viewDetail: async (req,res,next) => {
        try {
            let productId = req.params.productId;
            const productDetail = await productsModel.getOneProduct(productId);
            const productSizes = await productsModel.getAllSizes(productId);
            const productColors = await productsModel.getAllColors(productId);
            const productImages = await productsModel.getAllImage(productId);
            const productGenders = await productsModel.getAllGenders(productId);
            res.render('detail',{productDetails: productDetail.rows, productSizes: productSizes.rows, productColors: productColors.rows, productImages: productImages.rows, productGenders: productGenders.rows, admin: req.session.isAdmin});
        } catch (err) {
            console.log(err)
        }
    },
    updateProduct: async (req,res,next) => {
        try {            
            console.log("new object data");
            console.log(req.body.obj)
            newProduct = req.body.obj;
            oldProduct = req.body.prevObj;
            productID = oldProduct[0]
            skuID = oldProduct[1]

            // products 
            newName = newProduct[2];
            newDesc = newProduct[3];
            newValue = newProduct[4]
            newCategory = newProduct[5];

            // productDetails
            newGender = newProduct[6];
            newSize = newProduct[7];
            newColor = newProduct[8];
            newImage = newProduct[9];

            // productDetailsOfficesTable
            newBurnabyQty = newProduct[10];
            newMetroQty = newProduct[11];
            newNewWestQty = newProduct[12];
            newRichmondQty = newProduct[13];
            newSurreyQty = newProduct[14];
            newVancouverQty = newProduct[15];


            await productsModel.updateProductTable(productID, newName, newDesc, newValue, newCategory);
            await productsModel.updateProductDetailsTable(skuID, newGender, newSize, newColor, newImage);
            await productsModel.updateProductDetailsOfficesTable(skuID, newBurnabyQty, newMetroQty, newNewWestQty, newRichmondQty, newSurreyQty, newVancouverQty);
        } catch (err) {
            console.log(err)
        }
    },
    returnProductDetails: async (req,res,next) => {
        try {
            const product_id = req.body.id;
            result = await productsModel.getProductByID(product_id);
            res.json(result.rows);
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = productControls;