const router = require("express").Router()      // npm install express

/* DATABASE infrastructure used in AUTHROUTER.js
    -------------------------------------------
    
    Overall:
    - t_user
    - t_session
    - t_newsletter

    |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | t_user:                                                                                                                                                               |
    |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | id_user   | INT          | Primary key | Not Null | Unique | Code Generated                       | ./utility/password.js - {createId})                               |
    | id_public | INT          | Key         | Not Null | Unique | Code Generated                       | ./utility/password.js - {createId})                               |
    | salt      | INT          |             | Not Null |        | Code Generated, JWSTEncrypted        | ./utility/password.js - {createSalt}, ./utility/jwst.js{signSalt} |                
    | name      | VARCHAR(255) |             | Not Null |        | User Generated (Joi)                 |                                                                   |
    | email     | VARCHAR(255) |             | Not Null | Unique | User Generated (Joi), JWST Encrypted | ./utility/jwst.js, {signEmail})                                   |
    | pass      | VARCHAR(255) |             | Not Null |        | User Generated (Joi), Hashed         | ./utility/jwst.js, {createPass})                                  |
    | timestamp | VARCHAR(255) |             |          |        | Coded Generated                      | ./PostRegister                                                    |
    |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|

    API routes of effect:
     - /DeleteAccount  [DELETE] 
     - /GetCookieLogin [SELECT] 
     - /GetLogin       [SELECT]
     - /PostRegister   [INSERT, SELECT]

    Usage:
     - stores information accessible only to the user
    
    |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | t_session:                                                                                                                                                              |
    |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | id_session | INT          | Primary key | Not Null | Unique | Code Generated         | ./utility/password.js - {createId}                                               |
    | id_user    | INT          | Key         | Not Null | Unique | Code Generated         | Inherited from t_user                                                            |   
    | active     | BOOL         |             | Not Null |        | Code Generated         | ./utility/sessionControl.js - {addSession, updateStartSession, updateEndSession} |                                                                 |                
    | device     | VARCHAR(255) |             | Not Null | Unique | User Generated, Hashed | ./utility/jwst.js, {createPass})                                                 |
    |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|                        
    
    API routes of effect:
    - /DeleteAccount  [DELETE] 
    - /DeleteSession  [DELETE]
    - /GetCookieLogin [SELECT] 
    - /GetLogin       [INSERT, SELECT]
    - /PostRegister   [INSERT]

    Usage:
    - stores information about session and devices accessible only to user. Gateway from backend to frontend

    |---------------------------------------------------------------------------------------------------------------------------------|
    | t_newsltter:                                                                                                                    |
    |---------------------------------------------------------------------------------------------------------------------------------|
    | id        | INCREMENT ID INT   | Primary key  | Not Null | Unique | Code Generated         | ./utility/password.js - {createId} |
    | email     | VARCHAR(255)       |              | Not Null | Unique | User Generated, Hashed | ./utility/jwst.js, {createPass})   |
    | timestamp | VARCHAR(255)       |              |          |        | Code Generated         | ./PostNewsletter                   |
    |---------------------------------------------------------------------------------------------------------------------------------|

    API routes of effect:
    - /DeleteAccount    [DELETE]
    - /DeleteNewsletter [DELETE]    
    - /PostNewsletter   [INSERT]

    Usage:
    - stores emails for newsltter
*/


const DeleteAccount = require("./DeleteAccount")
/* Implementation of "/DeleteAccount"

    DELETE

    input_params:
        req:
         |- header: {
                     token: STRING (encrypted)
                    }

        res: 
         |- status codes:
                | - 200 - success
                | - 404 - id_session not valid

    Tables of effect:
        - SELECT
            |- t_session

        - DELETE
            |- t_session
            |- t_user

    Raw Functionality:
        - Deletes from tables with a given id_user (from token)

    Usage:
        - Deletion an account 
    
    Status:
     - FUCK
*/

const DeleteSession = require("./DeleteSession")
/* Implementation of "/DeleteSession"

    DELETE

    input_params:
        req:
         |- header: {
                     token: STRING (encrypted)
                    }

        res: 
         |- status codes:
                |- 200 succes
                |- 400 - id_session not valid

    Tables of effect:
        - DELETE
            |- t_session

    Raw Functionality:
        - Deletes from t_session with a given id_session (from token)
    
    Usage:
        - Remove a logged in device
    
    Status:
     - FUCK
*/

const GetCookieLogin = require("./GetCookieLogin")
/* Implementation of "/GetCookieLogin" 

    GET

    input_params:
        req:
         |- header: {
                     token: STRING (encrypted), 
                     device: STRING
                    }

        res:
         |- status codes:
                |- 200 succes
                |- 400 id_session not valid
                |- 404 device not valid
         
        |- JSON
            - {
                token: STRING (encrypted id_session from t_session)
                name: VARCHAR, 
                user_picture: BLOB,
              }
    
    Tables of effect:
        - SELECT
            |- t_session
            |- t_user
    
    Raw functionality:
        - Checks if id_session tied to device is valid and return general data. The id_session in changed
    
    Usage:
        - Implementation of sessions when a user is logged in
    
    Status:
     - FUCK
*/

const GetLogin = require("./GetLogin")
/* Implementation of "/GetLogin"

   GET

   input_params:
       req:
        |- header: {
                    device: STRING
                    }
                    
        |- payload: {
                     email: STRING, 
                     pass: STRING
                    } 

       res:
        |- status codes:
               |- 200 succes
               |- 400 user not found
               |- 404 incorrect credentials
        
        |- JSON
            - {
                token: STRING (encrypted id_session from t_session)
                name: VARCHAR, 
                user_picture: BLOB,
              }
    
    Tables of effect:
        - SELECT
            |- t_session
            |- t_user
        
        - UPDATE
            |- t_session
        
        - INSERT
            | - t_session
    
    Raw functionality:
        - Gets salt from email and checks if user / hashed(pass + salt) is valid. If valid it inserts into t_session new device or updated id_session of old one
    
    Usage:
        - Implementation of Login with user and password
    
    Status:
     - FUCK

*/
const PostRegister = require("./PostRegister")
/* Implementation of "/PostRegister" 
    
    POST

    input_params:
        req:
         |- header {
                    device: STRING
                   }

         |- payload {
                     name: STRING, 
                     email: STRING, 
                     password: STRING, 
                     repeatPassword: STRING, 
                     newsletter: BOOL
                    }
        
        res: 
         |- status codes
                |- 200 succes
                |- 400 requirements not met
                |- 402 email is used

         |- JSON
            - {
                token: STRING (encrypted id_session from t_session)
               }
    
    Tables of effect:
        - SELECT
            |- t_user
            |- t_session

        - INSERT
            |- t_user
            |- t_session
    
    Raw functionality:
        - Given in input checks if valid using JOI, checks if email in t_user and adds. Inserts into t_user data (password is hashed and salted, others is encrypted) and to t_session. If body[newsltter] == true: redirect to "./PostNewsletter"

    Usage:
        - Used to register new users
    
    Status:
     - FUCK
*/

const PostNewsletter = require("./PostNewsletter")
/* Implementation of "/PostNewsletter" 

    POST

    input_params: 
        req: 
         |- header: {}
         |- payload: {
                      email: STRING
                     }

        res:
         |- status codes
                |- 200 succes
                |- 400 requirement not met
                |- 402 email is used
    
    Tables of effect:
       - SELECT
           |- t_newsletter

       - INSERT
           |- t_newsletter
    
    Raw functionality:
        - The given email is checked if in t_newsltter and if not is added in 
    
    Usage:
        - Used to adding an user to newsletter

    Status:
     - WORKING 
*/

const DeleteNewsletter = require("./DeleteNewsletter")
/* Implementation of "/DeleteNewsletter" 
    
    DELETE

    input_params:
        req:
         |- header: {}
         |- payload: {
                      email: STRING
                     }
        
        res:
         |- status codes
                |- 200 succes
    
     Tables of effect:
       - DELETE
           |- t_newsletter
    
    Raw functionality:
        - Row with a given email is deleted from t_newsletter
    
    Usage:
        - Used for unsubscribing user from newsletter
    
    Status:
     - WORKING 
*/

router.use(DeleteAccount)
router.use(DeleteSession)
router.use(GetCookieLogin)
router.use(GetLogin)
router.use(PostRegister)
router.use(PostNewsletter)
router.use(DeleteNewsletter)


module.exports = router