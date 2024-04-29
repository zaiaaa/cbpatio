const mysql = require('mysql2')
let conn = ''

try{
    conn = mysql.createConnection({
        host:"viaduct.proxy.rlwy.net",
        port:"56251",
        user: "root",
        password:"jEJnWWPzIatNXfPCrwyIIamBbAyiClCp",
        database: "railway"
    })
}catch(e){
    conn = 'erro -> ', e.message, 'wdadwd'
}


module.exports = conn