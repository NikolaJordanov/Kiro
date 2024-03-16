const bcrypt = require("bcrypt")    // npm install bcrypt
const dotenv = require("dotenv")    // npm install dotenv

import {con} from "./utility/mysql.js"

dotenv.config()

function createPass(input_, salt){
    const hashPass = bcrypt.hash(input_ + salt)
    return hashPass
}

function createSalt(size=process.dotenv.SIZE_SALT, base=64){    
    return crypto.randomBytes(size).toString(base);
}
function createId(identifier, table){           // not optimal and pseudo safe
    while (n < 10){
        let n = createSalt(process.dotenv.ID_SIZE, 64)
        const sql = "SELECT :identifier FROM :table WHERE id=n"   //IF
        const preparedStatement = {"identifier": identifier, "table": table}

        con.query(sql, preparedStatement, (err, result, fields)=>{
            if (err) throw err;
            if (fields == null){
                return n
            }
        })
    }
    throw err
}

module.exports = {createPass, createSalt, createId}