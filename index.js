const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.listen(3000, function() {
    console.log('Node server running @ http://localhost:3000')
});

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lonelyhl99",
    database: "dataytb"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// ------------------------------

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
});

app.get('/', function(req, res) {
    let sql = "SELECT * FROM video";
    con.query(sql, function(err, results) {
        if (err) throw err;
        res.render("index.ejs", { results })
    })
});

app.post('/add-video', function(req, res) {
    let sql = `INSERT INTO video (link, img, title, channel, view) VALUES ('${req.body.link}', '${req.body.img}', '${req.body.title}', '${req.body.channel}', '${req.body.view}')`;
    con.query(sql, function(err, results) {
        if (err) throw err;
    });
});

app.post('/fix-video', function(req, res) {
    let sql = `UPDATE video SET title = '${req.body.fixTitle}' WHERE title = '${req.body.title}'`;
    con.query(sql, function(err) {
        if (err) throw err;
    });
});

app.post('/del-video', function(req, res) {
    let sql = `DELETE FROM video WHERE channel = '${req.body.channel}' OR title = '${req.body.title}'`;
    con.query(sql, function(err) {
        if (err) throw err;
    });
});