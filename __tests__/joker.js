const { default: expectCt } = require("helmet/dist/middlewares/expect-ct")
const { TestScheduler } = require("jest")
const supertest=require("supertest")
const server=require("../api/server")
const db=require("../database/dbConfig")
describe ("joker tests",()=>{
    it ("register test",async ()=>{
        const res=await supertest(server)
        .post("/api/auth/register")
        .send({username:"nand3",password:"abc"})
        console.log(res.statusCode)
   expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("nand3")
    expect(res.body.id).toBeDefined()

    })
    it("login",async ()=>{
        const res=await supertest(server)
        .post("/api/auth/login")
        .send({username:"nandy1234",password:"abc"})
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
     //   expect(res.body.message).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ5OTY2Njd9.VCxh8Nq9Bh9jb48eykgwxCPgwl6Cvgd25SQkDX83QMQ")
     expect(res.body.message).toBe("welcome nandy1234")

    })
})