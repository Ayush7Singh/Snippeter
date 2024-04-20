const Snippet =  require('../models/Snippet');

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


exports.getSnippet = async (req, res) => {
  try {
    const { id } = req.body;
    const getSnippet =await Snippet.findById(id);
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

exports.updateSnippet =async(req,res)=>{
  try{
    const {id , ntext} = req.body();
    const updatedSnippet = await Snippet.findById(id);
    updatedSnippet.code=ntext;
    await updatedSnippet.save();
    console.log("updated sucesss");
  }catch(error){
      console.log(error);
      res.status(500).json({
          success:false,
          message:error
      })
  }
};

exports.dropSnippet =async(req,res)=>{
  try{
    const {id} = req.body();
    const dSnippet = await Snippet.DeleteOne(id);
    console.log("deleted sucesss");
  }catch(error){
      console.log(error);
      res.status(500).json({
          success:false,
          message:error
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




