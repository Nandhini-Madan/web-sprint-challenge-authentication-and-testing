const db=require("../database/dbConfig")

async function findUserName(username){
    console.log(username)
    return await db("users")
            .where("username",username)
            .first("id","username","password")

}
async function addUser(data){
    console.log(data,"data")
   const [id]= await db("users").insert(data)
   return findByUserId(id)
}
async function findByUserId(id){
    return await db("users")
            .where("id",id)
            .first("id","username","password")
}
function find(){

}

module.exports={
    findUserName,
    addUser,
    findByUserId,



}
