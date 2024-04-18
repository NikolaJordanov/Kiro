const {con, mysql}  = require("../../utility/mysql.js")
const {createId, createPass, createSalt, hashDevice} = require("./password.js")
const {signSalt, decodeSalt} = require("./jwst.js")

const dotenv = require("dotenv");       // npm install dotenv


async function addSessionHashedDevice(idUser, idPublic, device){
    const idSession = await createId("id_session", "t_session")
    const hashed_device = hashDevice(device)
    const sql = `INSERT INTO t_session (id_session, id_user, id_public, active, device) VALUES (${mysql.escape(idSession)}, ${mysql.escape(idUser)}, ${mysql.escape(idPublic)}, ${mysql.escape(true)}, ${mysql.escape(hashed_device)});`
        
    con.query(sql, (err, result, fields)=>{
        if (err) throw err;
    })
    return idSession
}

async function updateStartSession(idSession_old){      
    const idSession_new = await createId("id_session", "t_session")

    const sql = `UPDATE t_session \n ` + 
                `SET id_session=${mysql.escape(idSession_new)}, active=${mysql.escape(true)} \n` +
                `WHERE id_session=${mysql.escape(idSession_old)}`
    
    con.query(sql, (err, result, fields)=>{
        if (err) throw err;
    })
    
    return idSession_new
}

async function updateEndSession(idSession_old){     
    const idSession_new = await createId("id_session", "t_session")

    const sql = `UPDATE t_session \n ` + 
                `SET id_session=${mysql.escape(idSession_new)}, active=${mysql.escape(false)} \n ` + 
                `WHERE id_session=${mysql.escape(idSession_old)}`

    con.query(sql, (err, result, fields)=>{
        if (err) throw err;
    })
    return idSession_new
}

function addSessionCheck(idUser, device){
    return new Promise((resolve) =>{
        const hashed_device = hashDevice(device)
        const sql = `SELECT id_session FROM t_session WHERE id_user=${mysql.escape(idUser)} AND device=${mysql.escape(hashed_device)};`     
        con.query(sql, async (err, result, fields)=>{
            if (err) throw err;
            if (result.length === 0){
                resolve(addSessionHashedDevice(idUser, device))
            } else {
                resolve(updateStartSession(result[0]["id_session"]))
            }
        })
    })
}

function checkSessionDevice(idSession, device){
    return new Promise((resolve) =>{
        const hashed_device = hashDevice(device)
        const sql = `SELECT COUNT(*) FROM t_session WHERE id_session=${mysql.escape(idSession)} AND device=${mysql.escape(hashed_device)};`
        con.query(sql, (err, result, fields)=>{
            if (err) throw err;
            if (result[0]["COUNT(*)"] == 0){
                resolve(false)
            }
            resolve(true)
        })
    })
}
function getUserDevice(idUser){
    return new Promise((resolve) =>{
        const sql = `SELECT device FROM t_session WHERE id_user=${mysql.escape(idUser)};`        
        con.query(sql, (err, result, fields)=>{
            resolve(result[0]["device"])
        })
    })
}

function checkUserDevice(idUser, device){
    const hashed_device = hashDevice(device)
    const sql = `SELECT COUNT(*) FROM t_session WHERE id_user=${mysql.escape(idUser)} AND device=${mysql.escape(hashed_device)}`        
    con.query(sql, (err, result, fields)=>{
        if (err) throw err;
        if (result[0]["COUNT(*)"] == 0){
            return false
        }
        return true
    })
}

module.exports = {addSessionHashedDevice, 
                  addSessionCheck,
                  checkSessionDevice,
                  getUserDevice,
                  checkUserDevice, 
                  updateStartSession ,
                  updateEndSession, 
                }
// this code is quite redundant and possibly useless
