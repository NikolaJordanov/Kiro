import {con} from "./utility/mysql.js"
import {createPass, createSalt, createId} from "./utility/password.js"
import {signSalt, signEmail, signName, sendJWT} from "./utility/jwst.js"
import {addSession} from "./utility/sessionControl.js"


const router = require("express").Router()  // npm install express
const Joi = require("joi");                 // npm install joi


const schema = {
    name: Joi.string.min(1).required(),
    email: Joi.string.email.required(),
    password:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeatPassowrd: Joi.ref('password').required(),
} 

router.post("/PostRegister", (req, res)=>{
    // req:
    //  |- header {device: ...}
    //  |- payload {email: ... , pass: ...}
    //
    // res: 
    //  |- {token: ...} 

    const body = req.body
    const header = req.headers

    const encoded_email = signEmail(body.email)     // jwst.js
    
    var valid = Joi.validate(body, schema)
    if (valid === false){
        res.status(400).send(valid.details[0].message)
        return
    }
    const sql = "SELECT * WHERE email= :email;"
    const preparedStatement = {"email": encoded_email}

    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
        if (fields["id"]){
            res.status(400).send("An account is made with this email")
            return
        }
    })
    {
        const id_ = createId("id", "t_user")                // password.js
        const salt = createSalt()                           // password.js

        const sql = "INSERT INTO t_user (id, salt ,name ,email, pass) VALUES (:id, :salt ,:name, :email, :pass);"
        const preparedStatement = {"id": id_, "salt": signSalt(salt), "name": signName(body.name), "pass": createPass(body.pass, salt)}

        con.query(sql, preparedStatement, (err, result, fields)=>{
            if (err) throw err;
            const session_id = addSession(user_id, header["device"])
            sendJWT(res, session_id)
        })
    }
})

module.exports = router