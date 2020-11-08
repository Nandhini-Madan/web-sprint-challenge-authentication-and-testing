const router = require('express').Router();
const user = require("./auth-model")
const bycrypt = require("bcryptjs")

router.post('/register', async (req, res) => {
  // implement registration
  try {
    const { username, password } = req.body
    if (!username || !password) {
      res.status(401).json({
        message: "Username or password not available"
      })
    }
    else {
      const users = await user.findUserName(username)
      if (!users) {
        res.status(401).json({
          message: "Username name is not available"
        })
      }
      else {
        const newUser = await user.addUser({
          username,
          password: await bycrypt.hash(password, 14)
        })
        res.status(201).json(newUser)
      }

    }
  }
  catch (err) {
    next(err)
  }
});

router.post('/login', async (req, res) => {
  // implement login
  try{
    const {username,password}=req.body
    if(!username||!password){
      res.status(401).json({
        message:"Username or password not available"
      })
    }
    else{
      const user =await user.findUserName(username)
      if(!user){
        res.status(401).json({
          message:"Invalid User credentials"
        })
      }
      else{
        const passwordValid=await bycrypt.compare(password,user.password)
        if(!passwordValid){
        //  const token=
          res.status(200).json({
            message:`Welcome ${user.username}`
          })
        }
      }
    }
  }
  catch(err){}

});

module.exports = router;
