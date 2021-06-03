var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.locals.pretty = true;

app.use(express.static('/views_file'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('views','views_file');
app.set('view engine', 'jade');

//! express 실행하기 위해서는 listen 함수가 실행되어야 한다.
app.listen(3000, function(){
    console.log('connection 3000 port! : app_files');
})

// 글 저장
app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            showErr(err);
        }

        fileRead(res);
    });
});

// get방식으로 list 화면 불었을때
app.get('/topic', function(req, res){
    fileRead(res);
});

// 새로운 글 작성 화면
app.get('/topic/new', function(req, res){
    res.render('new');
});

// 글 상세 내용
app.get('/topic/:id', function(req, res){
    var id = req.params.id;
    fs.readdir('data', function(err, files){
        if(err){
            showErr(err);
        }

        fs.readFile('data/'+id, 'utf-8', function(err, data){
            if(err){
                showErr(err);
            }
    
            res.render('view', {topics: files, title: id, description: data});
        });
    })
});

//========================== custom function ====================

// 파일 목록 가져와서 list 만들어 주는 함수
var fileRead = function(res) {
    fs.readdir('data', function(err, files){
        if(err){
            showErr(err);
        }

        res.render('view', {topics: files});
    })
};

// error 발생 시 출력 함수
var showErr = function(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
}

