import {con} from "./utility/mysql.js"
import {createId, createPass, createSalt} from "./password.js"
import {signSalt, decodeSalt} from "./utility/jwst.js"

const dotenv = require("dotenv");       // npm install dotenv

function addSession(id, device){   // id_user new
    const sql = "INSERT INTO t_session (id_session, id, active, device, salt) \
                 VALUES (:id_session, :id, TRUE, :device, :salt);"
    const session_id = createId("id_session", "t_session")
    const salt = createSalt()
    const preparedStatement = {"id_session": session_id, "id": id, "device": createPass(device, salt), "salt": signSalt(salt)}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
    return session_id
}

function checkSessionDevice(id_session, device){
    const sql = "SELECT salt FROM t_session WHERE id_session=:id_session;"        // IF
    const preparedStatement = {"id_session": id_session}

    var salt;
    con.query(sql, preparedStatement, (err, result, fields)=>{
        salt = fields[0]["salt"]
        if (err) throw err;
    })
    if (salt == null){
        return false
    }
    salt = decodeSalt(salt)
    {
    const sql = "SELECT * FROM t_session WHERE id_session=:id_session AND device=:device;"        // IF
    const preparedStatement = {"id_session": id_session, "device": createPass(device, salt)}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
        if (fields[0]["id"] == null){
            return false
        }
        return true
    })
    }
}
function checkUserDevice(id, device){
    const sql = "SELECT salt FROM t_session WHERE id_session=:id_session;"        // IF
    const preparedStatement = {"id_session": id}

    var salt;
    con.query(sql, preparedStatement, (err, result, fields)=>{
        salt = fields[0]["salt"]
        if (err) throw err;
    })
    if (salt == null){
        return false
    }
    salt = decodeSalt(salt)
    {
    const sql = "SELECT * FROM t_session WHERE id=:id AND device=:device;"        // IF
    const preparedStatement = {"id": id, "device": createPass(device, salt)}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
        if (fields[0]["id"] == null){
            return false
        }
        return true
    })
    }
}

function updateStartSession(id){    // id_session old
    const sql = "UPDATE t_session SET \
                id_session=:session_id, active=TRUE WHERE id_session=:id;"
    const session_id = createId("id_session", "t_session")
    const preparedStatement = {"id": id, "session_id": session_id}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
    return session_id
}

function updateEndSession(id){     // id_session old
    const sql = "UPDATE t_session SET id_session=:session_id, active=FALSE WHERE id_session=:id;"
    const session_id = createId("id_session", "t_session")
    const preparedStatement = {"session_id": session_id, "id": id}
    con.query(sql, preparedStatement, (err, result, fields)=>{
        if (err) throw err;
    })
    return session_id
}

module.exports = {addSession, 
                  checkSessionDevice, 
                  checkUserDevice, 
                  updateStartSession ,
                  updateEndSession, 
                }
// this code is quite redundant and possibly useless

