const express = require ('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(express.json())
app.use(require('./routes/auth.routs'))
app.use(require('./routes/links.routes'))


const PORT = config.get('port') || 5000
const URL = config.get("url")


async function start(){
    try{
        await mongoose.connect(URL)
    }catch (e){
        console.log(e)
        process.exit(1)
    }

}
app.listen(PORT, () => console.log(`server running... on port: ${PORT}`))

start().then((data) =>{
    // console.log(data)
})






