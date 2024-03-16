import {con} from "../auth/utility/mysql.js"

const router = require("express").Router()  // npm install express

router.post("/PostAddUserToRoom", (req, res)=>{
    // req:
    //  |- header {id_session: ...}
    //  |- payload {room_id: ... , users: [], all_admin: bool} - t_user_friend id
    //
    // res: 

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
    insertUser(body["room_id"], people_id_list, body["admin"])
    res.status(200)
})
