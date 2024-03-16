import {con} from "../auth/utility/mysql.js"
import {authToken} from "../auth/utility/jwst.js"

const router = require("express").Router()  // npm install express

router.delete("/DeleteSelfFromRoom", (req, res)=>{
    // req:
    //  |- header {id_session: ...}
    //  |- payload {room_id: ...} - t_user_friend id
    //
    // res: 

    const body = req.body
    const header = req.headers

    const session_id = authToken(header)
    
    const sql = `DELETE FROM t_chat_room_user_middle
                 LEFT JOIN t_session
                 ON t_session.id_user = t_chat_room_user_middle.id_user;
                 WHERE t_session.id_session =:idSession AND t_chat_room_user_middle.id_room =:idRoom;`

    const preparedStatement = {"idSession": session_id, "idRoom": body["room_id"]}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
    res.status(200)
})