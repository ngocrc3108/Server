const mongoose = require('mongoose')
const { DateTime } = require("luxon");

const Schema  = mongoose.Schema
const usersSchema = new Schema ({
    fullName : {
        type : String        
    },
    username : {
        type : String
    },
    password : {
        type : String
    },
    seasionID : {
        type : String,
        default : ""
    },
    linked : {
        type : Boolean,
        default : false
    },
    balance : {
        type : Number,
        default : 0
    },
    history : {
        type : Array,
        default : []
    }
}, {timestamps:true})

usersSchema.virtual("formattedHistory").get(function () {
    return this.history.map(value => {
        value.time = DateTime.fromJSDate(value.time).setZone('UTC+7').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        value.fee = value.fee == 0 ? "---" : value.fee 
        return value
    })
  })

const usersModel = mongoose.model('Users', usersSchema)

module.exports = usersModel