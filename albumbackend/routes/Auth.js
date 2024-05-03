const express=require('express')
const { v4: uuidv4 } = require('uuid');
const { generateTokens } = require('../src/utils/jwt');

const{
    addRefreshTokenToWhitelist,
}=require('../controllers/authServices')

const router = express.Router();
const{
    findUserByEmail,
    createUserByEmailandPassword,
}=require('../controllers/UserController')

router.post('/register',async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        if(!email || !password){
            res.status(400);
            throw new Error("You must provide an email and a password")
        }

        const existingUser=await findUserByEmail(email);
            if(existingUser){
                res.status(400);
                throw new error("Email already in use.");

            }

            const user= await createUserByEmailandPassword({email,password})
            const jti=uuidv4();
            const{accessToken,refreshToken}=generateTokens(user,jti);
            await addRefreshTokenToWhitelist({jti,refreshToken,userId:user.id});

            res,json({
                accessToken,
                refreshToken,
            });
    } catch (err) {
        next(err)
    }
})


module.exports = router;