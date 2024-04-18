const {con, mysql} = require("../utility/mysql.js")
const {authToken} = require("./utility/jwst.js")

const router = require("express").Router()      // npm install express

router.delete("/DeleteSession", (req, res)=>{
    // req:
    //  |- header: {token: ... }
    
    // res: 
    
    const header = req.headers
    const idSession = authToken(header)
    if (!idSession){
        res.status(400)
        return
    }

    const sql = `DELETE FROM t_session WHERE id_session = ${mysql.escape(idSession)}`
    con.query(sql, (err, result, fields)=>{
        if (err) throw err;
    })
    res.status(200).send("/DeleteSession 200")
    console.log("/DeleteSession 200")
})
module.exports = router