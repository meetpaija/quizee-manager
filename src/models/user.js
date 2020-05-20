import mongoose from 'mongoose'
import validator from 'validator'

const User = mongoose.model('User', {
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 4
    }
})

export default User;