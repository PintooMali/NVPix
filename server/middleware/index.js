const JWT = require('jsonwebtoken');
module.exports = async (req,res,next)=>{
    const beareToken = req.headers.authorization;
    console.log(beareToken)
    if(!beareToken) 
        return res.status(403).json({
         errors:[
            {
                msg:"Unauthorized"
            }
         ]
    });
    const jwt = beareToken.split("Bearer ")[1];
    if(!jwt) 
    return res.status(403).json({
        errors:[
           {
               msg:"Unauthorized"
           }
        ]
   });;

    let payload
    try {
        payload = JWT.verify(jwt,process.env.JSON_WEB_TOKEN_SECRET);
        req.user = payload
        next()
    } catch (error) {
        return res.status(403).json({
            errors:[
               {
                   msg:"Unauthorized"
               }
            ]
       });
    }
}