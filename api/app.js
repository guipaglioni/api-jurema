const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaCategorias = require('./routes/categorias');

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    if ('OPTIONS' === req.method) {
        res.status(204).send();
    }
    else {
        next();
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

app.use('/produtos', rotaProdutos);
app.use('/categorias', rotaCategorias);









app.use((req,res,next) => {
   const erro = new Error('Não encontrado');
   erro.status(404);
   next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});


module.exports = app;