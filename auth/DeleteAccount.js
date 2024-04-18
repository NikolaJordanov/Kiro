const {con, mysql} = require("../utility/mysql.js")
const router = require("express").Router()      // npm install express
const {authToken} = require("./utility/jwst.js")

router.delete("/DeleteAccount", (req, res)=>{
    // req:
    //  |- header: {token: ...}
    
    // res: 

    const header = req.headers
    const idSession = authToken(header)

    if (!idSession){
        res.status(400)
        console.log("/DeleteAccount - 400")
        return
    }
    const sql = `BEGIN TRANSACTION \n` +
                `   @id_user := SELECT id_user FROM t_session WHERE id_session = ${mysql.escape(body["email"])} \n` + 
                `   DELETE FROM t_newsletter WHERE email IN (SELECT email FROM t_user WHERE id=@id_user); \n` + 
                `   DELETE FROM t_session WHERE id_user IN @id_user; \n` + 
                `   DELETE FROM t_user WHERE id_user IN @id_user; \n` +
                `   DELETE FROM t_user_general WHERE id_public IN (SELECT id_public FROM t_user WHERE id=@id_user); \n` +
                `COMMIT` 
                 

    con.query(sql, (err, result, fields)=>{
        if (err) throw err;
        
        res.status(200).send("/DeleteAccount - 200")
        console.log("/DeleteAccount - 200")
    })
})
module.exports = router