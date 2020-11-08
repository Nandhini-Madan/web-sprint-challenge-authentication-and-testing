const db=require("../database/dbConfig")

function findUserName(username){
    return db("users")
            .where("username",username)
            .first("id","username","password")

}
