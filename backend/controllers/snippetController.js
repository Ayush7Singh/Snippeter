const Snippet =  require('../models/Snippet');
const mongoose = require('mongoose')

exports.addSnippet = async (req, res) => {
  try {
    console.log(req.body)
    const { name,lan,code,user } = req.body;
    const Snip = await Snippet.create({
      name,lan,code, user
    })
    res.status(500).json({
      success : true,
      message : "Snippet created successfully",
      Snip
    })
   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : error,
      Snippet
    })
  }
};


exports.getAllSnippet = async (req, res) => {
  try {
    const getSnippet =await Snippet.find({user : req.body.user});
    if (getSnippet) {
      return res.json(getSnippet);
    }
    else{
      console.log("No snippet exist"); 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : error
    })
  }
};

exports.getSnip = async (req, res) => {
  try {
    const id= req.params.id;
    console.log(id)
    const resi = await Snippet.findById(id);
    if (resi) {
      return res.json(resi);
    }
    else{
      console.log("No snippet exist"); 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : error
    })
  }
};
exports.updateSnippet =async(req,res)=>{
  try{
    const id= req.params.id;
    const {name,lan, code} = req.body;
    const updatedSnippet = await Snippet.findById(id);
    updatedSnippet.code=code;
    updatedSnippet.lan=lan;
    updatedSnippet.name=name;
    await updatedSnippet.save();
    res.status(500).json({
      success:true,
      message:"Updated Successfully",
      updatedSnippet
  })
  }catch(error){
      console.log(error);
      res.status(500).json({
          success:false,
          message:error
      })
  }
};

exports.dropSnippet =async(req,res)=>{
  try {
    const id= req.params.id;
    const resi = await Snippet.findByIdAndDelete(id);
    if (resi) {
      return res.json({
        success:true,
          message:"Deleted Successfully",
          resi
      });
    }
    else{
      console.log("No snippet exist"); 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : error
    })
  }
};

exports.addSnippetOther = async(req,res)=>{
  try {
    const {name, id} = req.body;
    const oldSnip = await Snippet.findById(id);
    oldSnip.shareCount+=1;
    await oldSnip.save();
    const newSnip = await Snippet.create({
      name, lan : oldSnip.lan, code : oldSnip.code, user : req.body.user
    })
    return res.status(200).json({
      messsage : "Added Successfully",
      success : true,
    })
  } catch (error) {
    console.log(error);
      res.status(500).json({
          success:false,
          message:error
      })
  }
}







exports.allSnips = async(req,res)=>{
  try {
    const snips = await Snippet.find();
    return res.status(200).json({
      success : true,
      snips
    })
  } catch (error) {
    console.log(error);
  }
}

exports.exploreAdd = async(req,res)=>{
  try {
    const snippet = await Snippet.findById(req.body.id);
    const newSnippet = await Snippet.create({
      code : snippet.code,
      lan : snippet.lan,
      name : snippet.name,
      user : req.body.user
    })
    snippet.shareCount +=1 ;
    await snippet.save();
    return res.status(200).json({
      success : true,
      message : "Added Successfully!",
      newSnippet
    })
  } catch (error) {
    console.log(error);
  }
}



exports.allSnips = async(req,res)=>{
  try {
    let snips = await Snippet.find();
    snips = snips.filter((item)=> item.user != req.body.user);
    return res.status(200).json({
      success : true,
      snips
    })
  } catch (error) {
    console.log(error);
  }
}

exports.exploreAdd = async(req,res)=>{
  try {
    const snippet = await Snippet.findById(req.body.id);
    const newSnippet = await Snippet.create({
      code : snippet.code,
      lan : snippet.lan,
      name : snippet.name,
      user : req.body.user
    })
    snippet.shareCount +=1 ;
    await snippet.save();
    return res.status(200).json({
      success : true,
      message : "Added Successfully!",
      newSnippet
    })
  } catch (error) {
    console.log(error);
  }
}