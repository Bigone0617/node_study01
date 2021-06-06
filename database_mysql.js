var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '147147',
    database : 'o2'
});

connection.connect();

//? SELECT 
// var sql = 'SELECT * FROM topic';
// connection.query(sql, function(err, rows, fields){
//     if(err) {
//         throw err;
//     }else {
//         for(var i = 0; i < rows.length; i++){
//             console.log(rows[i].title);
//         }
//     }
// });

//? INSERT
// var sql = 'INSERT INTO topic (title, decription, author) VALUES(?, ?, ?)';
// var params = ['Supervisior', 'watcher', 'use params'];

// connection.query(sql, params, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(rows);
//     }
// });


//? UPDATE
// var sql = 'UPDATE topic SET title=?, decription=?, author=? WHERE id=?';
// var params = ['Supervisior!', 'build watcher', 'update params', '6'];

// connection.query(sql, params, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(rows);
//     }
// });

//? DELETE
// var sql = 'DELETE FROM topic WHERE id=?';
// var params = ['6'];

// connection.query(sql, params, function(err, rows, fields){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(rows);
//     }
// });


connection.end();