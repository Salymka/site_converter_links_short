const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    originLink : {
        type:String,
        required: true
    },
    convertLink : {
        type:String,
        required: true,
        unique: true
    },
    code : {
        type:String,
        required: true,
        unique :true
    },
    data : {
        type: Date,
        default: Date.now
    },
    activeUser : {
        type: Types.ObjectId,
        ref: "User"
    }

})

module.exports = model(' Link', schema)