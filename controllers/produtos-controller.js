const mysql = require('../mysql');
const LocalStorage = require('node-localstorage').LocalStorage
const multer = require('multer');
const upload =  multer({ dest: 'uploads/' })

localStorage = new LocalStorage('./scratch');

exports.listaTodosProdutos = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err){
            return res.status(500).send({ error: err });
        }

        conn.query(`
            SELECT * FROM produtos;
            `, (error, results) => {
            if (error) {
                return res.status(500).send({ error: error });
            } 
            return res.status(200).send({results})
        })
        conn.release();
    });
}

exports.listaProdutosCategoria = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err){
            return res.status(500).send({ error: err });
        }
        conn.query(`
            SELECT produtos.*, categorias.nome FROM produtos INNER JOIN categorias WHERE produtos.idcategoria = ?;
        `,[req.params.idcategoria], (error, results) => {
            if (error) {
                return res.status(500).send({ error: error });
            }
            return res.status(200).send({
                result: results
            })
        });
    });
}

exports.listaProduto = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err){
            return res.status(500).send({ error: err });
        }

        conn.query(`
            SELECT * FROM produtos where idproduto = ?;
            `, [req.params.idproduto], (error, results) => {
            if (error) {
                return res.status(500).send({ error: error });
            } 
            return res.status(200).send({results})
        })
        conn.release();
    });
}

exports.cadastraProduto =  (req, res, next) => {
    console.log(req.file)
    mysql.getConnection((err, conn) => {
        if (err){
            return res.status(500).send({ error: err });
        }
        conn.query(`
            INSERT INTO produtos(nome, descricao, valor, imagem, idcategoria) values ( ?, ?, ?, ?, ?)
        `,[
            req.body.nome,
            req.body.descricao,
            req.body.valor,
            req.file.path,
            req.body.idcategoria
        ], (error, results) => {
            if (error) {
                return res.status(500).send({ error: error });
            }
            return res.status(201).send({
                result: results
            })
        });
    });
}