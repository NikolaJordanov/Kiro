import {con} from "../auth/utility/mysql.js"

const router = require("express").Router()  // npm install express

router.delete("/DeleteRoom", (req, res)=>{
    // req:
    //  |- payload {room_id:..., users: [id_share]}
    //
    // res: 

    const body = req.body    
    const sql = `DELETE FROM t_chat_room_user_middle 
                 WHERE id_room = :idRoom AND id_share = :users AND admin != :false`

    const preparedStatement = {"idRoom": body["room_id"], "users": body["users"], ":false": false}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
    res.status(200)
})