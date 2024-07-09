const mongoose = require( "mongoose");
const validator = require( "validator");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "firstname is required"],
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"],
    },
    username: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique : true,
        validate : validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength : [6, "Password Must Be Atleast 6 characters"],
    },

    pic: {
        type: String,
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' // Default image URL
    },
    status: {
        type: String,
        default: 'Offline'
    },
    lastSeen: {
        type: Date
    }

    
},{
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
