var express = require('express');
var router = express.Router();
var database = require('../database');

// Listagem de dados
router.get("/", function(request, response, next) {

	var query = `
		SELECT nome, descricao, COUNT(*) AS CONTAGEM
		FROM palavras
		GROUP BY nome, descricao
		HAVING COUNT(*) >= 1
		ORDER BY CONTAGEM DESC;
	`;

	database.all(query, [], function(error, data) {
		if (error) {
			throw error;
		} else {
			response.render('sample_data', {title: 'TMIT', action: 'list', sampleData: data, message: request.flash('success')});
		}
	});
});

// Adicionar dados
router.get("/add", function(request, response, next) {
	response.render("sample_data", {title: '', action: 'add'});
});

router.post("/add_sample_data", async function(request, response, next) {
	var nome = request.body.nome.toLowerCase();
	var quantidade = request.body.quantidade;
	var descricao = request.body.descricao.toLowerCase();

	// Valor padrão se o campo de nome estiver vazio
	if (nome === '') {
		nome = "Nada";
		descricao = "Nada";
	}

	var query = `
		INSERT INTO palavras (nome, descricao) 
		VALUES (?, ?);
	`;

	for (let i = 0; i < quantidade; i++) {
		try {
			await new Promise((resolve, reject) => {
				database.run(query, [nome, descricao], function(error) {
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				});
			});
		} catch (error) {
			throw error;
		}
	}

	request.flash('success', 'Produtos Adicionados');
	response.redirect("/sample_data");
});

// Editar dados
router.get('/edit/:id', function(request, response, next) {
	var id = request.params.id;

	var query = `SELECT * FROM palavras WHERE id = ?`;

	database.get(query, [id], function(error, data) {
		if (error) {
			throw error;
		} else {
			response.render('sample_data', {title: 'Edit SQLite Table Data', action: 'edit', sampleData: data});
		}
	});
});

router.post('/edit/:id', function(request, response, next) {
	var id = request.params.id;
	var nome = request.body.nome;
	var descricao = request.body.descricao;

	var query = `
		UPDATE palavras 
		SET nome = ?, descricao = ?
		WHERE id = ?
	`;

	database.run(query, [nome, descricao, id], function(error) {
		if (error) {
			throw error;
		} else {
			request.flash('success', 'Sample Data Updated');
			response.redirect('/sample_data');
		}
	});
});



// Deletar dados
router.get('/delete/:nome', function(request, response, next) {
    var nome = request.params.nome;

    // Query para deletar apenas um registro com o nome especificado
    var query = `
        DELETE FROM palavras
        WHERE id = (
            SELECT id FROM palavras
            WHERE nome = ?
            LIMIT 1
        )
    `;

    database.run(query, [nome], function(error) {
        if (error) {
            throw error;
        } else {
            request.flash('success', 'Dados deletados');
            response.redirect("/sample_data");
        }
    });
});




module.exports = router;
