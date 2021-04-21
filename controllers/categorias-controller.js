const mysql = require('../mysql');
const LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch');

exports.listaCategorias = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err){
            return res.status(500).send({ error: err });
        }

        conn.query(`
            SELECT * FROM categorias;
            `, [req.body.email], (error, results) => {
            if (error) {
                return res.status(500).send({ error: error });
            } 
            return res.status(200).send({results})
        })
        conn.release();
    });
}


exports.cadastraCategoria = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err){
            return res.status(500).send({ error: err });
        }
        conn.query(`
            INSERT INTO categorias(nome) values (?)
        `,[
            req.body.nome,
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