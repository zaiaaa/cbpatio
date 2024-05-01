require('dotenv').config()
const mysql = require('mysql2')

let conn = ''

try{
    conn = mysql.createConnection({
        host:"roundhouse.proxy.rlwy.net",
        port:"11731",
        user: "root",
        password:process.env.DATABASE_PASSWORD,
        database: "railway"
    })
}catch(e){
    conn = 'erro -> ', e.message, 'wdadwd'
}


module.exports = conn