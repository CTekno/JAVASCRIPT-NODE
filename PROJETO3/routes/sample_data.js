var express = require('express');
var sequelize = require('sequelize')
var router = express.Router();
var database = require('../database');
router.get("/", function(request, response, next){

	var counts = request.params.nome
	var query4 = "SELECT * FROM palavras ORDER BY id";

	var query = `SELECT nome, COUNT(*) AS CONTAGEM
	FROM mitproject.palavras
	GROUP BY nome
	HAVING COUNT(*) >= 1
	ORDER by COUNT(*) DESC;
`

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'TMIT', action:'list', sampleData:data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("sample_data", {title:'', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){

	var nome = request.body.nome;
	var nome2 = nome.toLowerCase()

	var descricao = request.body.descricao;

	if(nome2 == '')
    {
		var query = `
		INSERT INTO palavras
		(nome, descricao) 
		VALUES ("Nothing", "Nothing");
		`;
    }
    else
    {

	var query = `
	INSERT INTO palavras
	(nome, descricao) 
	VALUES ("${nome2}", "${descricao}");
	`;}
	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			request.flash('success', 'Sample Data Inserted');
			response.redirect("/sample_data");
		}

	})

});

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM palavras WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('sample_data', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var nome = request.body.nome;

	var descricao = request.body.descricao;

	var query = `
	UPDATE palavras 
	SET nome = "${nome}", 
	descricao = "${descricao}",  
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Updated');
			response.redirect('/sample_data');
		}

	});

});

router.get('/delete/:nome', function(request, response, next){

	var nome = request.params.nome; 

	var query = `
	DELETE FROM palavras WHERE nome = "${nome}" LIMIT 1
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Deleted');
			response.redirect("/sample_data");
		}

	});

});


module.exports = router;