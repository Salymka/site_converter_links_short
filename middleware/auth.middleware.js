const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]

        if(!token){
           return  res.status(401).json({massage: "No authorize"})

        }

        req.user = jwt.verify(token, config.get('jwtSecretKey'))
        console.log(req.user);

        next()
    }catch (e) {
        res.status(401).json({massage: "No authorize"})
    }
}