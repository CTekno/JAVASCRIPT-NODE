var express = require('express');
var router = express.Router();
var supabase = require('../supabaseclient'); // Importar o cliente Supabase

// Exibe o formulário de novo usuário
router.get("/", function(request, response, next) {
    response.render("newuser", { msg: '' });
});

// Insere novo usuário no banco de dados
router.post("/", async function(request, response, next) {
    var email = request.body.emailejs;
    var senha = request.body.senhaejs;

    // Verifica se email ou senha estão vazios
    if (email === '' || senha === '') {
        response.render('newuser', { msg: 'Dados incompletos acima' });
    } else {
        try {
            // Inserir novo usuário no Supabase
            const { data, error } = await supabase
                .from('usuarios')
                .insert([{ email: email, senha: senha }]);

            if (error) {
                throw error;
            }

            response.render('index', { msg: 'Novo usuário criado!' });
        } catch (err) {
            next(err);
        }
    }
});

module.exports = router;
