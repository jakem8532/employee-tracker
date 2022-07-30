const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'charlotte',
        database: 'company'
    }
)

module.exports = db