var express = require('express');
var router = express.Router();
var database = require('../database')

router.get('/', function(req, res, next) {
    res.render('index', { title: 'TMIT', session: req.session, msg: ''});
});


router.post('/login', function(request, response, next){

    var email = request.body.emailejs;

    var senha = request.body.senhaejs;

    if(email && senha)
    {
        query = `
        SELECT * FROM mitproject.usuarios
        WHERE email = "${email}"
        `;

        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].senha == senha)
                    {
                        request.session.id = data[count].id;

                        response.redirect("/sample_data");
                    }
                    else
                    {   
                        response.render('index', {msg: 'Email or Password Incorrect'});
                    }
                }
            }
            else
            {
                response.render('index', {msg: 'Email or Password Incorrect'});
            }
            response.end();
    });
    }
    else
    {
        response.render('index', {msg: 'Insert needed'});
        response.end();
    }

});

router.get('/logout', function(request, response, next){

    request.session.destroy();
    response.redirect("/");

});

module.exports = router;
