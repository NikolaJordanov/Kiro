const router = require("express").Router()      // npm install express

router.get("/GetTest", (req, res)=>{
    res.status(200).send({"kiro": "zashef"})
})
module.exports = router