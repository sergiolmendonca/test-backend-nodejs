const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const db = require('../db/db')
const request = require('supertest')

chai.should()
chai.use(chaiHttp)

describe('Product', function() {

    this.timeout(10000)

    describe('GET /noauth/product', () => {
        it('should GET Products', (done) => {
            request(server)
                .get('/noauth/product/list')
                .expect((res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
                .catch((err) => {
                    console.log(err)
                    done(err)
                })
                
        })
    })

    describe('POST /noauth/product', () => {
        it('should POST a product', (done) => {
            const product = {
                title: "PC",
                description: "Personal Computer",
                price: 4500.99,
                category: "test"
            }
            request(server)
                .post('/noauth/product')
                .send(product)
                .then((res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.info.should.have.property('title')
                    res.body.info.should.have.property('description')
                    res.body.info.should.have.property('price')
                    res.body.info.should.have.property('category')
                    res.body.success.should.equal(true)
                    done()
                })
                .catch((err) => {
                    console.log(err)
                    done(err)
                })
        })

        it('should not post a product without title', (done) => {
            const product = {
                description: "Personal Computer",
                price: 4500.99,
                category: "test"
            }
            chai.request(server)
                .post('/noauth/product')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('message')
                    res.body.success.should.equal(false)
                    done()
            })
        })
    })

    describe('UPDATE /noauth/product', () => {
        it('should update a product', (done) => {
            const id = '610beac4ec4ad00d60bebe2a'
            const product = {
                title: "MAC",
                description: "MACBOOK",
                price: 9500.99,
                category: "eletronics"
            }
            chai.request(server)
                .put('/noauth/product/' + id)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.info.should.have.property('title')
                    res.body.info.should.have.property('description')
                    res.body.info.should.have.property('price')
                    res.body.info.should.have.property('category')
                    res.body.success.should.equal(true)
                    done()
                })
                
        })
    })

})
