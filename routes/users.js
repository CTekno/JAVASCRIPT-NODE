var express = require('express');
var router = express.Router();

// Definição do endpoint raiz
router.get('/', function(req, res, next) {
  res.send(''); // Envia uma resposta vazia
});

module.exports = router;
