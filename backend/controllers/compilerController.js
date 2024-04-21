var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);

exports.compilerFunc = async(req,res)=>{

  try {
    const {code,lan,input} = req.body;
    var envData = { OS : "windows"}; 
    compiler.compilePythonWithInput( envData , code , input ,  function(data){
        res.send(data);        
    });
  } catch (error) {
    res.stats(400).json({
      error,
    })
  }

}