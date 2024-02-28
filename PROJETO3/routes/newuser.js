var express = require('express');
var router = express.Router();
var database = require('../database')

router.get("/", function(request, response, next){

	response.render("newuser", {msg: ''});

});
router.post("/", function(request, response, next){

	var email = request.body.emailejs;
	var senha = request.body.senhaejs;

	if(email == '' || senha == '')
    {
        response.render('newuser', {msg: 'Missing required entries'})
    }
    else
    {

	var query = `
	INSERT INTO mitproject.usuarios
	(email, senha) 
	VALUES ("${email}", "${senha}");
	`;
	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.render('index', {msg: 'New user created!'});
		}

	})};

});

module.exports = router;