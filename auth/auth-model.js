const db=require("../database/dbConfig")

function findUserName(username){
    return db("users")
            .where("username",username)
            .first("id","username","password")

}
function addUser(data){
   const [id]=db("users").insert(data)
   return findByUserId(id)
}
function findByUserId(id){
    return db("users")
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
