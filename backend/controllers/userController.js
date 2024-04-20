const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// register a user in db
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser =await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPass = await bcrypt.hash(password,11);

    const user = await User.create({
      name,email,password:hashedPass
    })
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret , { expiresIn: '7d' });
    res.status(201).cookie('token',token).json({
      success : true,
      message : "Registered !",
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : error
    })
  }
};
//login a user
exports.login = async(req,res)=>{
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret , { expiresIn: '7d' });
    res.status(200).cookie('token',token).json({
      success : true,
      message : "Logged In!",
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : error
    })
  }
}
//logout user
exports.logout = async(req,res)=>{
  res.cookie('token',null, {
      httpOnly : true,
      expires : new Date(Date.now()),
  })
  res.status(200).json({
      success: true,
      message : "Logged Out"
  })
}


//check func for authen
exports.profile = (req,res)=>{
  console.log(req.user);
  res.status(200).json({
    success : true,
    user : req.user
  })
}

exports.getUserDetails = async(req,res,next)=>{
  const user  = await User.findById(req.body.user);
    res.status(200).json({
        success : true,
        user,
    })

  
}

exports.createSnippet = async (req, res, next) => {
  try {
    const { name, email, snip } = req.body;
    const existingUser =await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPass = await bcrypt.hash(password,11);

    const user = await User.create({
      name,email,password:hashedPass
    })
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret , { expiresIn: '7d' });
    res.status(201).cookie('token',token).json({
      success : true,
      message : "Registered !",
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : error
    })
  }
};