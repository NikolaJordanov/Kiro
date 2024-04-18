const {con, mysql} = require("../utility/mysql.js")
const {signEmail} = require("./utility/jwst.js")
const {addNewsletter} = require("./utility/newsletterAdd.js")

const router = require("express").Router()  // npm install express
const Joi = require("joi");                 // npm install joi


const schema = Joi.object({
    email: Joi.string().email().required(),
}) 

router.post("/PostNewsletter", (req, res)=>{
    // req:
    //  |- header {}
    //  |- payload {email}
    //
    // res: 
    //  |- {token: ...} 

    const body = req.body
    const header = req.headers

    var valid = schema.validate(body)
    if (valid.error){
        res.status(400).send(valid.error.details)
        return
    }
    if (addNewsletter(body["email"]) === true){
        res.status(200).send("/PostNewsletter 200")
        console.log("/PostNewsletter 200")
    } else {
        res.status(400).send("/PostNewsletter 400")
        console.log("/PostNewsletter 400")
    }
})

module.exports = router