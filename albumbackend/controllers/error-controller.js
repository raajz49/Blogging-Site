 const ErrorController = (err,req,res,next)=>{

        console.log(err)
    res.json({success:false,messsage:err.toString()})

}

module.exports =ErrorController