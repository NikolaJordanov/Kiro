import {con} from "./utility/mysql.js"
import { authToken } from "./utility/jwst.js"

const router = require("express").Router()      // npm install express

router.delete("/DeleteSession", (req, res)=>{
    // req:
    //  |- header: {token: ...}
    
    // res: 
    
    const header = req.headers
    const session_id = authToken(header)
    if (!session_id){
        return
    }

    const sql = "DELETE FROM t_session WHERE id_session = :idSession;"
    const preparedStatement = {"idSession": session_id}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
    res.status(200)
})