var mysql = require('mysql');
var connection;

if (process.env. //ls913o3fgmzziujt:dybm4j1199ffguv3@enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/tlmvsdis5dnunh5j) {
    connection = mysql.createConnection(process.env. //ls913o3fgmzziujt:dybm4j1199ffguv3@enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/tlmvsdis5dnunh5j);
    }
    else {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: config.config.development.password,
            database: 'journaldb'
        });
    };

    connection.connect(); module.exports = connection;