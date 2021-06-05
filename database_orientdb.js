var OrientDB = require('orientjs');

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: '147147',
    useToken: true
});

var db = server.use({
    name: 'O2',
    username: 'root',
    password: '147147'

});

db.query(
    'SELECT FROM topic'
 ).then(
    function(players){
       console.log(players);
    }
 );

// CREATE
// var sql = 'SELECT FROM topic';
// db.query(sql).then(function(res){
//     console.log(res);
// });

