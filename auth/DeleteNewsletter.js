const {con, mysql} = require("../utility/mysql.js")
const router = require("express").Router()      // npm install express

router.delete("/DeleteNewsletter", (req, res)=>{
    // req:
    //  |- header:
    //  |- body: {email: ...}
    
    // res: 

    const header = req.headers
    const body = req.body

    const email = mysql.escape(body["email"])

    const sql = `DELETE FROM t_newsletter WHERE email= ${email};`
    con.query(sql, (err, result, fields)=>{
        if (err) throw err;
        
        res.status(200).send("/DeleteNewsletter 200")
        console.log("/DeleteNewsletter 200")
    })
})
module.exports = router