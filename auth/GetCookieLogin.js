const {authToken} = require("./utility/jwst.js")
const {checkSessionDevice, updateStartSession} = require("./utility/sessionControl.js")
const {generalDataIdSession} = require("./utility/sendGeneralData.js")
const {hashDevice} = require("./utility/password.js")

const router = require("express").Router()  // npm install express

router.get("/GetCookieLogin", async (req, res)=>{
    // req:
    //  |- header: {token: ..., device: ...}

    // res: 
    //  |- {token: ...}

    const header = req.headers
    
    const idSession_old = authToken(header)
    
    if (!idSession_old){
        res.status(400)
        return
    }
    const device = hashDevice(header["device"])
    if (await checkSessionDevice(idSession_old, device) === true){
        const idSession_new = await updateStartSession(idSession_old)
        generalDataIdSession(res, idSession_new)
    } else {
        console.log("/GetCookieLogin - 400")
        res.status(404).send("/GetCookieLogin - 400")
    }
})
module.exports = router