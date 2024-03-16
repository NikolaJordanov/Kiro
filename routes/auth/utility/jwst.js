const jwt = require('jsonwebtoken');    // npm install jsonwebtoken
const dotenv = require("dotenv");       // npm install dotenv
const cookieParser = require('cookie-parser');  // npm install cookie-parser
router.use(cookieParser());
dotenv.config()

function encodeKey(_input, key){
    return jwt.sign(_input, key)
}
function decodeKey(_input, key){
    var n = jwt.verify(_input, key)
    if (!n){throw err}
    return n
}
function signToken(_input){
    return encodeKey(_input, key=process.dotenv.JSWT_SECRET)
}
function authToken(header){
    const token = header["token"]
    if (!token){
        return res.status(400)
    }
    try{
        return decodeKey(_input, key=process.dotenv.JSWT_SECRET)
    }catch{
        throw err
    }
}
function signSalt(_input){
    return encodeKey(_input, key=process.dotenv.SALT_SECRET)
}
function decodeSalt(_input){
    return decodeKey(_input, key=process.dotenv.SALT_SECRET)
}

function signEmail(_input){
    return encodeKey(_input, key=process.dotenv.EMAIL_SECRET)
}
function decodeEmail(_input){
    return decodeKey(_input, key=process.dotenv.EMAIL_SECRET)
}

function signName(_input){
    return encodeKey(_input, key=process.dotenv.EMAIL_SECRET)
}
function decodeName(_input){
    return decodeKey(_input, key=process.dotenv.EMAIL_SECRET)
}

function sendJWT(res, id_){
    const options = {
        /*"maxAge": 100*60*5,    // last number tells minuits*/
        "httpOnly": true,
        "signed": true
    }
    res.status(200).cookie("token", signToken(id_), options)
}

module.exports = {signToken, authToken, signSalt, decodeSalt, signEmail, decodeEmail, signName, decodeName, sendJWT}