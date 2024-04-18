const {con, mysql} = require("../utility/mysql.js")
const {createPass} = require("./utility/password.js")
const {addSessionCheck} = require("./utility/sessionControl.js")
const {generalDataIdPublic} = require("./utility/sendGeneralData.js")
const {decodeSalt, signEmail} = require("./utility/jwst.js")
const router = require("express").Router()      // npm install express


router.get("/GetLogin", (req, res)=>{
    // req:
    //  |- header: {device: ...}
    //  |- payload: {email: ... ,pass: ...} 

    // res: 
    //  |- {token: ...}


    const body = req.body 
    const header = req.headers

    const encoded_email = signEmail(body["email"])
    const sql = `SELECT id_user, id_public, salt, pass FROM t_user WHERE email=${mysql.escape(encoded_email)};`    

    con.query(sql, async (err, result, fields)=>{
        if (err) throw err;
        if (result.length === 0){
            res.status(400).send("/GetLogin 400")
            console.log("/GetLogin - 400")
            return

        } else {
            const salt = decodeSalt(result[0]["salt"])
            const idUser = result[0]["id_user"]
            const pass = result[0]["pass"]
    
            if (createPass(body["password"], salt) === pass){
                const idSession = await addSessionCheck(idUser, header["device"])
                generalDataIdPublic(res, result[0]["id_public"], idSession)
                console.log("/GetLogin - 200")
            } else {
                res.status(404).send("/GetLogin 404")
                console.log("/GetLogin - 404")
            }
        }
        
    })
})

module.exports = router
