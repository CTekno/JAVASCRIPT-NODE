var express = require('express');
var router = express.Router();
var supabase = require('../supabaseclient'); // Importar o cliente Supabase
require('dotenv').config();

// Rota para a página inicial
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Estoque', session: req.session, msg: '' });
});

// Rota para login
router.post('/login', async function(request, response, next) {
    var email = request.body.emailejs;
    var senha = request.body.senhaejs;

    if (email && senha) {
        try {
            // Consultar o Supabase para encontrar o usuário
            const { data, error } = await supabase
                .from('usuarios')
                .select('*')
                .eq('email', email);

            if (error) {
                throw error;
            }

            if (data.length > 0) {
                const user = data[0];
                if (user.senha === senha) {
                    request.session.id = user.id;
                    response.redirect("/sample_data");
                } else {
                    response.render('index', { msg: 'Email ou senha incorretos' });
                }
            } else {
                response.render('index', { msg: 'Email ou senha incorretos' });
            }
        } catch (err) {
            next(err);
        }
    } else {
        response.render('index', { msg: 'Insira os dados necessários' });
    }
});

// Rota para logout
router.get('/logout', function(request, response, next) {
    request.session.destroy();
    response.redirect("/");
});

module.exports = router;
