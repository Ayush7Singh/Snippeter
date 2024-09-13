const jwt = require('jsonwebtoken');


exports.authenticateUser = (req,res,next)=>{
  const {token} = req.cookies
  if(!token){
    return res.status(401).json({
      success : false,
      message : "Unauthorized"
    })
  }
  jwt.verify(token,process.env.jwt_secret,(error,decodedToken)=>{
    if(error){
      return res.status(401).json({
        success : false,
        message : "Unauthorized!"
      })
    }
    req.body.user = decodedToken.userId;
    next();
  })
}