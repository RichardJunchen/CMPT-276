const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const random = require('random');

// CONFIG
// ======
chai.should();
chai.use(chaiHttp);


// VARIABLES
// =========
let randomProductID = random.int((min=0), (max=Number.MAX_SAFE_INTEGER))
let randomSkuID = random.int((min=0), (max=Number.MAX_SAFE_INTEGER))
let randomOrderID = random.int((min=0), (max=Number.MAX_SAFE_INTEGER))
// let sampleBottleProductID = 1;
// let sampleBottleRandomSkuID = Math.floor(Math.random() * [1454758, 1454759, 1454750].length);
let sampleOrderID = 2;
let sampleProductID = 3;


// TESTS
// =====
describe('server routes', () => {

    describe('GET routes', () => {

        describe('GET / route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        // INTERNAL SERVER ERROR BOUND:
        // req.query.code undefined 
        // req.session.email undefined
        // req.session.name undefined
        // req.session.isAdmin undefined
        /*
        describe('GET /redirect route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/redirect')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })
        */

        describe('GET /home route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/home')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /addProductPage route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/addProductPage')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /addProduct route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/addProduct')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /shopBottles route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/shopBottles')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /shopBackpacks route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/shopBackpacks')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /shopShirts route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/shopShirts')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /shopAllProducts route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/shopAllProducts')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /detail route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/detail')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /detail/id route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/detail/'+randomProductID)
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /faq route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/faq')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /after_add route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/after_add')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        // INTERNAL SERVER ERROR BOUND:
        // req.session.user_id undefined
        /*
        describe('GET /after_add/product_id/sku_id route', () => {
            it('should return OK status', (done) => {
                try {
                    chai.request(server)
                    .get('/after_add/8/4109764')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
                } catch (err) {
                    done(err)
                }
            })
        })
        */

        describe('GET /shopCart/order_id route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/shopCart/'+sampleOrderID)
                    .end((err, response) => {
                        response.should.have.status(200)
                        // should return OK since either empty cart or full cart is valid
                    done()
                    })
            })
        })

        describe('GET /checkoutPage/:order_id route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/checkoutPage/'+randomOrderID)
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /connectPage route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/connectPage')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })

        describe('GET /contact route', () => {
            it('should return OK status', (done) => {
                chai.request(server)
                    .get('/contact')
                    .end((err, response) => {
                        response.should.have.status(200)
                    done()
                    })
            })
        })
    })

    describe('POST routes', () => {

        describe('POST /getProductPageDetails route', () => {
            it('should return OK status', (done) => {

                const data = {
                    id: sampleProductID
                }

                chai.request(server)
                    .post('/getProductPageDetails')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200)
                    done()
                    })
            })
        })

        // INTERNAL SERVER ERROR BOUND:
        // req.body.obj undefined 
        /* 
        describe('POST /updateProduct route', () => {
            it('should return OK status', (done) => {

                const data = {
                    id: sampleProductID
                }

                chai.request(server)
                    .post('/updateProduct')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200)
                    done()
                    })
            })
        })
        */
    })
})