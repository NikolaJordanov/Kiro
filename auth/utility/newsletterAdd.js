const { override } = require("joi");
const {con, mysql} = require("../../utility/mysql.js")
const {signEmail} = require("./jwst.js")

function addNewsletter(encoded_email, timestamp=Date.now()){
    const sql = `SELECT COUNT(*) FROM t_newsletter WHERE email=${mysql.escape(encoded_email)}`
    con.query(sql, (err, result, fields)=>{
        if (err) throw err;
        if (result[0]['COUNT(*)'] == 1){
            return false
        } else {
            const sql = `INSERT INTO t_newsletter (email, timestamp) VALUES (${mysql.escape(encoded_email)}, ${mysql.escape(timestamp)})`
            con.query(sql, (err, result, fields)=>{
                if (err) throw err;
            })
            return true
        }
    })
}


module.exports = {addNewsletter}