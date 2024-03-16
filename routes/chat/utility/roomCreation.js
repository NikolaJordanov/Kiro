import {con} from "../auth/utility/mysql.js"
import {createId} from "../auth/utility/password.js"

function insertUser(room_id, users_id_list, admin_list){
    const room_list = Array(users_id_list.length).fill(room_id)
    const sql = `INSERT INTO t_chat_room_user_middle (id_room, id_user, admin) 
                 VALUES (:room_list), (:peopleList), (:adminList)`
    const preparedStatement = {"idRoom": (room_list), "peopleList": users_id_list, "adminList": admin_list}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
}

function createRoom(users_id_list, admin_list){
    const room_id = createId("t_chat_room_user_middle", "id_room")
    insertUser(room_id, users_id_list, admin_list)
}

module.exports = {createRoom, insertUser}