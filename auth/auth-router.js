const router = require('express').Router();
const user = require("./auth-model")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const { username, password } = req.body
    console.log(req.body)
    if (!username || !password) {
      console.log(username)
      res.status(401).json({
        message: "Username or password not available"
      })
    }
    else {
      const users = await user.findUserName(username)
      if (users) {
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
        next()
      }

    }
  }
  catch (err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  try {
    const { username, password } = req.body
    console.log("login", req.body)
    if (!username || !password) {
      res.status(401).json({
        message: "Username or password not available"
      })
    }
    else {
      console.log("hi")
      const login = await user.findUserName(username)
      console.log("login", login)
      if (!login) {
        res.status(401).json({
          message: "Invalid User credentials"
        })
      }
      else {
        console.log(login.password)
        const passwordValid = await bycrypt.compare(password, login.password)

        if (!passwordValid) {
          console.log(passwordValid, "password")
          //  const token=
          res.status(401).json({
            message: "Invalid password"
          })
        }
        else {
          /* const token=jwt.sign({
             userID:user.id,
             userRole:user.role,
       
           },"keep it secret,keep it safe")
           res.cookie("token",token)*/
          const tokenPayload = { subject: user.id, username: user.username };
          const token = jwt.sign(tokenPayload, "keep it secret,keep it safe");
          res.cookie("token",token)
          res.status(200).json({
            message: token
          })
        }
      }
    }
    next()
  }
  catch (err) {
    next(err)
  }

});

module.exports = router;
