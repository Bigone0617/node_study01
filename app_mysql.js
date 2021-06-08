var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '147147',
    database : 'o2'
});
connection.connect();


var app = express();
app.locals.pretty = true;

app.use(express.static('/views_mysql'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('views','views_mysql');
app.set('view engine', 'jade');

//! express 실행하기 위해서는 listen 함수가 실행되어야 한다.
app.listen(3000, function(){
    console.log('connection 3000 port! : app_files');
})

// 글 저장
app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.body.id;

    var insertSql = 'INSERT INTO topic (title, decription, author) VALUES(?, ?, ?)';
    var updateSql = 'UPDATE topic SET title=?, decription=?, author=? WHERE id = ' + id;
    var params = [title, description, author];


    
    connection.query(id? updateSql : insertSql, params, function(err, rows, fields){
        if(err){
            throw err;
        }else {
            connection.query('SELECT id, title FROM topic', function(err, topics, feilds){
                if(err){
                    throw err
                }else{
                    res.render('view', {topics: topics});
                }
            })
        }
    })

});

// 새로운 글 작성 화면 
//! 주의 : topic/:id보다 위에 코딩이 되어 있어아 한다. 왜냐하면 아래에 코딩이 되면 topic/:id를 타서 에러가 발생함
app.get(['/topic/add', '/topic/add/:id'], function(req, res){

    var id = req.params.id;

    if(id){
        // id에 해당하는 데이터 가져오기
        var sql = 'SELECT * FROM topic WHERE id = '+id;
        connection.query(sql, function(err, datas, fields){
            if(err){
                throw err
            }else{
                res.render('add', {datas: datas});
            }
        })
    }else{
        res.render('add');
    }
});

// 삭제 페이지 이동
app.get('/topic/delete/:id', function(req, res){
    var sql = 'SELECT * FROM topic WHERE id = ' + req.params.id;
    connection.query(sql, function(err, rows, fields){
        if(err){
            throw err
        }else {
            if(rows.length === 0){
                console.log('Data is null');
            }else{
                res.render('delete', {topic: rows[0]});
            }
        }
    })
});

// 삭제 페이지에서 yes를 눌렀을 경우
app.post('/topic/delete/:id', function(req, res){
    var id = req.params.id;
    var sql = 'DELETE FROM topic WHERE id=?';

    connection.query(sql, [id], function(err, result){
        if(result.affectedRows > 0){
            res.redirect('/topic/');
        }
    })

});

// get방식으로 list 화면 불었을때
app.get(['/topic', '/topic/:id'], function(req, res){
    var sql = 'SELECT id, title FROM topic';
    connection.query(sql, function(err, topics, feilds){
        if(err){
            throw err
        }else{
            var id = req.params.id;

            if(id) {
                var description = connection.query('SELECT * FROM topic WHERE id = ' + id , function(err, info, fields){
                    if(err){
                        throw err
                    }else{
                        res.render('view', {topics: topics, topic: info[0]})
                    }
                })
            }else {
                res.render('view', {topics: topics, connection: connection});
            }
        }
    });
});

