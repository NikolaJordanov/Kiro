import {con} from "./utility/mysql.js"
import { authToken } from "./utility/jwst.js"
import {checkUserDevice, updateStartSession} from "./utility/sessionControl.js"


const router = require("express").Router()  // npm install express

router.get("/GetCookieLogin", (req, res)=>{
    // req:
    //  |- header: {token: ..., device: ...}

    // res: 
    //  |- {token: ...}

    const header = req.headers
    
    const session_id = authToken(header)
    if (!session_id){
        return
    }
    const device = header["device"]
    
    if (checkUserDevice(session_id, device) === true){
        const new_session_id = updateStartSession(session_id)
        sendJWT(header, new_session_id)
    } else {
        res.status(404)
    }
})