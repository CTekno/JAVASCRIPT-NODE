var express = require('express');
var router = express.Router();
var database = require('../database');

// Exibe o formulário de novo usuário
router.get("/", function(request, response, next) {
	response.render("newuser", {msg: ''});
});

// Insere novo usuário no banco de dados
router.post("/", function(request, response, next) {
	var email = request.body.emailejs;
	var senha = request.body.senhaejs;

	// Verifica se email ou senha estão vazios
	if (email == '' || senha == '') {
		response.render('newuser', {msg: 'Dados incompletos acima'});
	} else {
		// Query com placeholders para evitar SQL Injection
		var query = `
		INSERT INTO usuarios (email, senha) 
		VALUES (?, ?);
		`;

		// Executa a query usando o método `run` do SQLite
		database.run(query, [email, senha], function(error) {
			if (error) {
				throw error;
			} else {
				response.render('index', {msg: 'Novo usuário criado!'});
			}
		});
	}
});

module.exports = router;
