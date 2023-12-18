const mysql = require('mysql')
let conn = ''

try{
    conn = mysql.createConnection({
        host:"localhost",
        port:"3306",
        user: "root",
        password:"",
        database: "cb_patio"
    })
}catch(e){
    conn = 'erro -> ', e.message
}


module.exports = conn