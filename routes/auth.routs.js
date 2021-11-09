const {Router} = require('express')
const User = require('../models/User')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = Router()


//registration
router.post(
    '/registration',
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'easy password').isLength({min:6})

    ],
    async (req, res) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data of registration'
            })
        }
        const {email, password} = req.body
        const parson = await User.findOne({email})
        if(parson){
            return res.status(400).json({message:"User already exists"})

        }
        const hashPassword = await bcrypt.hash(password,12)
        const newUser = new User({email, password: hashPassword})
        await newUser.save()
        res.status(201).json({massage:"create new user"})

    }catch (e){
        res.status(500).json({message:" its bad"})
    }
})
//Login
router.post('/login',
    [
        check('email', 'incorrect email').normalizeEmail().isEmail(),
        check('password', 'easy password').exists()

    ],
    async (req, res) =>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data of login'
            })
        }

        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({massage: "this email doesn't exists"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(400).json({massage: 'incorrect password, try again'})
        }


        const token = jwt.sign(
            {userId: user.id},
            config.get("jwtSecretKey"),
            {expiresIn: '1m'}
        )

        res.json({token, userId: user.id})

    }catch (e){
        console.log(e)
        res.status(500).json({message:" its bad"})
    }

})
router.get('/hello', (req, res) =>{
    console.log("it's all ok!")
    return res.status(200).json({massage: "it's all ok!"})
})

module.exports = router
