const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos-controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload =  multer({ 
    storage: storage,
    limits: {
        fileSize: 1024*1024*5 
    },
    fileFilter: fileFilter
});

router.get('/lista-todos-produtos',produtosController.listaTodosProdutos);
router.get('/lista-todos-produtos-categoria/:idcategoria', produtosController.listaProdutosCategoria);
router.get('/lista-produto/:idproduto', produtosController.listaProduto);
router.post('/cadastra-produto',upload.single('produto_imagem') , produtosController.cadastraProduto);


module.exports = router;