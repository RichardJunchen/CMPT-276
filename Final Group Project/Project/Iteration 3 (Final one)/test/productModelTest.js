const chai = require('chai');
const chaiHttp = require('chai-http');
const productModel = require('../models/productModel');
const random = require('random');
const { expect } = require('chai');


// CONFIG
// ======
chai.should();

chai.use(chaiHttp);


// VARIABLES
// =========
let sampleProductID = 0;
let sampleSkuID = 1;
let sampleRequesterID = 2;
let sampleOrderID = 3;
let sampleName = "fiji water bottle"
let sampleDesc = "fresh water"
let sampleValue = 7
let sampleCategory = "bottle"
let sampleSize = "L"
let sampleGender = "F"
let sampleColor = "yellow", sampleImgURL = "bob.png"


let newBurnabyQty = 5
let newMetroQty = 4
let newNewWestQty = 3
let newRichmondQty = 2
let newSurreyQty = 1
let newVancouverQty = 6


describe('Product Model',  function() {

    describe('getAllProducts', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllProducts()
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllBottles', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllBottles()
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllBackpacks', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllBackpacks()
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllShirts', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllShirts()
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllUsers', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllUsers()
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getProductByID', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getProductByID(sampleProductID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getProductBySkuID', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getProductBySkuID(sampleSkuID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('createCartForRequesterID', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.createCartForRequesterID(sampleRequesterID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('addProductToCart', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.addProductToCart(sampleOrderID, sampleSkuID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('insertProduct', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.insertProduct(sampleName, sampleDesc, sampleValue, sampleCategory)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('insertProductDetails', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.insertProductDetails(sampleSkuID, sampleProductID, sampleSize, sampleGender, sampleColor, sampleImgURL)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('insertEmptyProductCount', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.insertEmptyProductCount(sampleSkuID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllProductCounts', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllProductCounts()
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getOneProduct', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getOneProduct(sampleProductID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllSizes', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllSizes(sampleProductID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllColors', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllColors(sampleProductID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllGenders', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllGenders(sampleProductID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getAllImage', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.getAllImage(sampleProductID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('updateProductTable', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.updateProductTable(sampleProductID, sampleName, sampleDesc, sampleValue, sampleCategory)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('updateProductDetailsTable', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.updateProductDetailsTable(sampleSkuID, sampleGender, sampleSize, sampleColor, sampleImgURL)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('updateProductDetailsOfficesTable', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = productModel.updateProductDetailsOfficesTable(sampleSkuID, newBurnabyQty, newMetroQty, newNewWestQty, newRichmondQty, newSurreyQty, newVancouverQty)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })
})