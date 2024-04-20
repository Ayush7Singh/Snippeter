const Snippet =  require('../models/Snippet');
const mongoose = require('mongoose')

exports.addSnippet = async (req, res) => {
  try {
    const { name,lan, code } = req.body;
  
    const Snip = await Snippet.create({
      name,lan,code
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
    const getSnippet =await Snippet.find();
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
    console.log(resi);
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
    console.log(updatedSnippet)
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
    console.log(resi);
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
    const newSnip = await Snippet.create({
      name, lan : oldSnip.lan, code : oldSnip.code
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







