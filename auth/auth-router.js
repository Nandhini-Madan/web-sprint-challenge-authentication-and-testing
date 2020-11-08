const router = require('express').Router();
const user=require("./auth-model")

router.post('/register', async (req, res) => {
  // implement registration
  try{
    const {username,password}=req.body
    if(!username||!password){
      res.status(401).json({
        message:"Username or password not available"
      })
    }
    else{
      const user=await user
    //  const [id]=
    }
  }
  catch(err){

  }
});

router.post('/login', (req, res) => {
  // implement login

});

module.exports = router;
