import {con} from "../auth/utility/mysql.js"
import {createRoom} from "./utility/roomCreation.js"
import {authToken} from "../auth/utility/jwst.js"


const router = require("express").Router()  // npm install express

router.post("/PostCreateRoomUser", (req, res)=>{
    // req:
    //  |- header {id_session: ...}
    //  |- payload {users: [], admin: []} - t_user_friend id
    //
    // res: 

    const body = req.body
    const header = req.headers

    const session_id = authToken(header)
    

    var people_id_list = [];
    const sql = `SELECT (id_friend) FROM t_session
                 Right JOIN t_user_friend
                 ON t_session.id_user = t_user_friend.id_user;
                 WHERE t_session.id_session =:idSession AND t_user_friend.id_connection in :people_list;`

    const preparedStatement = {"idSession": session_id, "peopleList": body["users"]}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
        people_id_list = result
    })
    createRoom(people_id_list, body["admin"])
    res.status(200)
})
