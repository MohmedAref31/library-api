

export default (req, res, next)=>{
    res.jsonSuccess = (data)=>{
        return res.status(200).json({success:true, data:data});
    }

    res.jsonError = (message, code = 500)=>{
        return res.status(code).json({success:false, message:message})
    }

    next();
}