const {joinPublicSessionId} = require("../../utility/joinId.js")
const {signToken} = require("./jwst.js")
const {con, mysql} = require("../../utility/mysql.js")


function generalDataIdPublic(res, id_public, id_session){
    const sql = `SELECT name FROM t_user_general WHERE id_public = ${mysql.escape(id_public)}`
    con.query(sql, (err, result, fields)=>{
        if (err) throw err;

        const name = result[0]["name"]
        const token = signToken(id_session)
        
        let out = {"token": token, "name": name}
        res.status(200).send(out)
    })
}

function generalDataIdSession(res, id_session){
    const sql = `SELECT name FROM t_user_general WHERE id_public = ${joinPublicSessionId(id_session)}`
    console.log(sql)
    con.query(sql, (err, result, fields)=>{
        if (err) throw err;

        const name = result[0]["name"]
        const token = signToken(id_session)
        
        let out = {"token": token, "name": name}
        res.status(200).send(out)
    })
}

module.exports = {generalDataIdPublic, generalDataIdSession}