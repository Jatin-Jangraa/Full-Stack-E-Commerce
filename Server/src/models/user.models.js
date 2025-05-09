import mongoose from 'mongoose'
import validator from 'validator'

const userschima =new mongoose.Schema({

    // id:{
    //     type:Number,
    //     required:true,
    //     unique:true,
    
    // },

    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        validate:validator.default.isEmail,
    },

    passward:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        default:"user"
    },

    gender:{
        type:String,
        enum: ["Male", "Female"],
    }

},{timestamps:true})

const Userdata=mongoose.model("Userdata",userschima);

export default Userdata;
