const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias-controller');

router.get('/lista-categorias', categoriasController.listaCategorias);
router.post('/cadastra-categoria', categoriasController.cadastraCategoria);


module.exports = router;