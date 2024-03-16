import {con} from "../auth/utility/mysql.js"

const router = require("express").Router()  // npm install express

router.delete("/DeleteOtherFromRoom", (req, res)=>{
    // req:
    //  |- payload {room_id:...,}
    //
    // res: 

    const body = req.body    
    const sql = `DELETE FROM t_chat_room_user_middle WHERE id_room = :idRoom;
                 DELETE FROM t_chat_messageseen_middle WHERE id_room = :idRoom; 
                 DELETE FROM t_chat WHERE id_room = :idRoom; `

    const preparedStatement = {"idRoom": body["room_id"]}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
    res.status(200)
})