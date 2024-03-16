import {con} from "./utility/mysql.js"
import {createPass, createPass} from "./utility/password.js"
import {signToken, decodeSalt, signEmail, sendJWT} from "./utility/jwst.js"

const router = require("express").Router()      // npm install express
const cookieParser = require('cookie-parser');  // npm install cookie-parser
router.use(cookieParser());

router.get("/GetLogin", (req, res)=>{
    // req:
    //  |- header: {device: ...}
    //  |- payload: {name: ..., email: ... ,pass: ...} 

    // res: 
    //  |- {token: ...}


    const body = req.body 
    const header = req.headers

    const email = signEmail(body.email)

    const sql = "SELECT salt, id FROM t_user WHERE email= :email;"
    const preparedStatement = {"email": email}
    
    var salt;
    var id_;
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
        salt = fields[0]["salt"]
        id_ = fields[0]["id"]
    })

    if (salt == null){
        res.status(404)
        return
    } else {
        salt = decodeSalt(salt)
    }

    {
    const sql = "SELECT id FROM t_user WHERE id= :id AND pass= :pass;"      // IF
    const preparedStatement = {"id": id_, "pass": createPass(body.pass, salt)}  // jwst.js; password.js  

    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err
        const user_id = fields[0]["id"]
        if (user_id == null){       // IF
            res.status(404)
            return
        }
        const session_id = addSession(user_id, header["device"])
        sendJWT(res, session_id)
    })
    }
})

module.exports = router
