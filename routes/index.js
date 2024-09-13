var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Estoque', session: req.session, msg: '' });
});

router.post('/login', function(request, response, next) {

    var email = request.body.emailejs;
    var senha = request.body.senhaejs;

    if (email && senha) {
        var query = `SELECT * FROM usuarios WHERE email = ?`;

        // Usando placeholders para prevenir SQL Injection
        database.all(query, [email], function(error, data) {
            if (error) {
                throw error;
            }

            if (data.length > 0) {
                for (var count = 0; count < data.length; count++) {
                    if (data[count].senha === senha) {
                        request.session.id = data[count].id;
                        response.redirect("/sample_data");
                        return;
                    } else {
                        response.render('index', { msg: 'Email ou senha incorretos' });
                    }
                }
            } else {
                response.render('index', { msg: 'Email ou senha incorretos' });
            }

            response.end();
        });
    } else {
        response.render('index', { msg: 'Insira os dados necessários' });
        response.end();
    }
});

router.get('/logout', function(request, response, next) {
    request.session.destroy();
    response.redirect("/");
});

module.exports = router;
