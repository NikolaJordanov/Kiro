const {con, mysql} = require("../utility/mysql.js")
const {createPass, createSalt, createId, hashDevice} = require("./utility/password.js")
const {signSalt, signEmail, signToken} = require("./utility/jwst.js")
const {addSessionHashedDevice} = require("./utility/sessionControl.js")
const {addNewsletter} = require("./utility/newsletterAdd.js")
////const {generalDataIdUser} = require("./utility/sendGeneralData.js")

const router = require("express").Router()  // npm install express
const Joi = require("joi");                 // npm install joi

const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeatPassword: Joi.any().equal(Joi.ref('password')).required(),
    newsletter: Joi.boolean(),
})

router.post("/PostRegister", (req, res)=>{
    // req:
    //  |- header {device: ...}
    //  |- payload {name: ... email: ... , password: ..., repeatPassword: ..., updates: ...}
    //
    // res: 
    //  |- {token: ...} 

    const body = req.body
    const header = req.headers

    let valid = schema.validate(body)

    if (valid.error){
        res.status(400).send(valid.error.details)
        return
    }

    const encoded_email = signEmail(body.email)             // jwst.js
    
    const sql = `SELECT COUNT(*) FROM t_user WHERE email=${mysql.escape(encoded_email)}`
    con.query(sql, async (err, result, fields)=>{
        if (err) throw err;
        if (result[0]['COUNT(*)'] == 1){
            res.status(402).send("An account is made with this email")
            console.log("/PostRegister - 402")
        } else {

            const idUser = await createId("id_user", "t_user")            // password.js
            const idPublic = await createId("id_public", "t_user")        // password.js
            const name = body["name"]
            const salt = createSalt()                               // password.js
            const signedSalt = signSalt(salt)
            const pass = createPass(body["password"], salt)         // password.js
            const timestamp = Date.now()
            
            const sql = `INSERT INTO t_user (id_user, id_public, email, pass, salt, timestamp) VALUES (${mysql.escape(idUser)}, ${mysql.escape(idPublic)}, ${mysql.escape(encoded_email)}, ${mysql.escape(pass)}, ${mysql.escape(signedSalt)}, ${mysql.escape(timestamp)});`

            con.query(sql, (err, result, fields)=>{
                if (err) throw err;
                const sql = `INSERT INTO t_user_general (id_public, name) VALUES (${mysql.escape(idPublic)}, ${mysql.escape(name)});`

                con.query(sql, async (err, result, fields)=>{
                    if (body["newsletter"] === true){
                        addNewsletter(encoded_email, timestamp)
                    }
                    const idSession = await addSessionHashedDevice(idUser, idPublic, hashDevice(header["device"]))
                    let out = {"token": signToken(idSession), "name": name}
    
                    res.status(200).send(out)
                    console.log("/PostRegister - 200")
                })
            })
        }
    })
})

module.exports = router