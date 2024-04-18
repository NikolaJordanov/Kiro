const crypto = require("crypto")             // npm install bcrypt
const dotenv = require("dotenv").config()    // npm install dotenv
const {con, mysql} = require("../../utility/mysql")

function createPass(input_, salt="", base="hex"){
    const hashPass = crypto.createHash('sha256', input_ + salt).digest(base)
    return hashPass
}
function hashDevice(input_){
    return createPass(input_, process.env.DEVICE_SALT)
}

function createRandomBytes(size){    
    return crypto.randomBytes(parseInt(size, 10)).toString('hex');
}
function createRandomIntSmall(size=process.env.ID_SIZE){
    const buf = createRandomBytes(size)
    return parseInt(buf, 16)
}

function createSalt(size=process.env.SALT_SIZE){
    return createRandomBytes(size)
}

function testId(n, identifier, table){
    return new Promise((resolve) =>{
        let id = createRandomIntSmall()
        const sql = `SELECT COUNT(*) FROM ${table} WHERE ${identifier}=${mysql.escape(id)}`;
        con.query(sql, (err, result, fields)=>{
            if (err) throw err;
            if (result[0]['COUNT(*)'] == 0){
                resolve(id)
            }
            else {
                if (n == 0){
                    resolve(null)
                } else {
                    resolve(testId(n - 1), identifier, table)
                }
            }
        });
    })
}

async function createId(identifier, table){           // not optimal and pseudo safe
    const id = await testId(3, identifier, table)
    if (id == null){
        return null
    } else {
        return id
    }
}

module.exports = {createPass, createSalt, createId, hashDevice}