const mysql = require('mysql2');
var connection = mysql.createConnection({
	host : 'localhost',
	database : 'MITPROJECT',
	user : 'root',
	password : '1234'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('Conectado devidamente.');
	}
});

module.exports = connection;