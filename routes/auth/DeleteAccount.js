import {con} from "./utility/mysql.js"
import {authToken } from "./utility/jwst.js"

const router = require("express").Router()      // npm install express

router.delete("/DeleteRemoveAccount", (req, res)=>{
    // req:
    //  |- header: {token: ...}
    
    // res: 

    const header = req.headers
    const session_id = authToken(header)
    if (!session_id){
        return
    }

    var user_id; 
    const sql = "SELECT id_user WHERE id_session = :idSession"
    const preparedStatement = {"idSession": session_id}

    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
        user_id = fields[0]["id_user"]
    })
    {
    const sql = `DELETE FROM t_session WHERE id_user = :idUser;
                 DELETE FROM t_user WHERE id = :idUser;`
    const preparedStatement = {"idUser": user_id}

    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
    }
    res.status(200)
})