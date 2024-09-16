var express = require('express');
var router = express.Router();
var supabase = require('../supabaseclient');

// Listagem de dados
router.get("/", async function(request, response, next) {
    try {
        // Consulta RPC personalizada para obter dados agrupados e ordenados
        const { data, error } = await supabase
            .rpc('get_aggregated_data'); // Certifique-se de que a função está configurada corretamente no Supabase

        if (error) {
            throw error;
        } else {
            response.render('sample_data', {
                title: 'TMIT',
                action: 'list',
                sampleData: data,
                message: request.flash('success')
            });
        }
    } catch (error) {
        next(error);
    }
});

// Adicionar dados
router.get("/add", function(request, response, next) {
    response.render("sample_data", {title: '', action: 'add'});
});

router.post("/add_sample_data", async function(request, response, next) {
    var nome = request.body.nome.toLowerCase();
    var quantidade = parseInt(request.body.quantidade, 10); // Converte para número inteiro
    var descricao = request.body.descricao.toLowerCase();

    if (nome === '') {
        nome = "Nada";
        descricao = "Nada";
    }

    const insertData = Array(quantidade).fill({ nome, descricao });

    try {
        const { error } = await supabase
            .from('palavras')
            .insert(insertData);

        if (error) {
            throw error;
        } else {
            request.flash('success', 'Produtos Adicionados');
            response.redirect("/sample_data");
        }
    } catch (error) {
        next(error);
    }
});

// Editar dados
router.get('/edit/:id', async function(request, response, next) {
    var id = request.params.id;

    try {
        const { data, error } = await supabase
            .from('palavras')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        } else {
            response.render('sample_data', {
                title: 'Edit SQLite Table Data',
                action: 'edit',
                sampleData: data
            });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/edit/:id', async function(request, response, next) {
    var id = request.params.id;
    var nome = request.body.nome;
    var descricao = request.body.descricao;

    try {
        const { error } = await supabase
            .from('palavras')
            .update({ nome, descricao })
            .eq('id', id);

        if (error) {
            throw error;
        } else {
            request.flash('success', 'Sample Data Updated');
            response.redirect('/sample_data');
        }
    } catch (error) {
        next(error);
    }
});

// Deletar dados
router.get('/delete/:nome', async function(request, response, next) {
    var nome = request.params.nome;

    try {
        const { error } = await supabase
            .from('palavras')
            .delete()
            .eq('nome', nome);

        if (error) {
            throw error;
        } else {
            request.flash('success', 'Dados deletados');
            response.redirect("/sample_data");
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
