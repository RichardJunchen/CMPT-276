const chai = require('chai');
const chaiHttp = require('chai-http');
const orderModel = require('../models/orderModel');
const random = require('random');
const { expect } = require('chai');


// CONFIG
// ======
chai.should();

chai.use(chaiHttp);


// VARIABLES
// =========
let sampleOrderID = 0;

describe('order Model',  function() {

    describe('getOrderByID', function(){
        it('should result in the row of the order with targeted ID', function(done){
            let res = orderModel.getOrderByID(sampleOrderID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

    describe('getProductsByOrderID', function(){
        it('should result in the row of the produt with targeted ID', function(done){
            let res = orderModel.getProductsByOrderID(sampleOrderID)
            expect(res).should.be.instanceof(Object)
            done()
        })
    })

})