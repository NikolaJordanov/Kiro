import {con} from "../auth/utility/mysql.js"
import {authToken} from "../auth/utility/jwst.js"

const router = require("express").Router()  // npm install express

router.post("/PostAddMessage", (req, res)=>{
    // req:
    //  |- header {id_session: ...}
    //  |- payload {room_id: ..., message: ...} - t_user_friend id
    //
    // res: 
    const body = req.body
    const header = req.headers

    const session_id = authToken(header)
    
    const sql = `INSERT INTO `

})