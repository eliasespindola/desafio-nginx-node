const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)
connection.end()

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config);
    const sql = 'SELECT name FROM people';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro interno do servidor');
        } else {
            const names = results.map((row) => row.name);
            res.send(`<h1>Full Cycle</h1><p>${names.join(', ')}</p>`);
        }
        connection.end();
    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})