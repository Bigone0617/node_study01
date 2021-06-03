var express = require('express');
// POST방식에서 params 받아오기 위해
var bodyParser = require('body-parser');
var app = express();
// 소스보기 했을때 소스 이쁘게 보기 위해서
app.locals.pretty = true;
// express 와 jade를 연결해주는 부분
app.set('view engine', 'jade');
// views 템플릿이 있는 디렉토리 가져오기
app.set('views', './views');
// 화면을 그리는 부분
app.get('/template', function(req, res) {
    res.render('temp', {_title: "new title", time: Date()});
});
// 정적인 파일 가져오기
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));

/* 
    일반적인 url 라우팅, query string사용법

    app.get('/topic', function(req, res){
        var topics = [
            "JavaScript is ...",
            "Node js is....",
            "exprerss is..."
        ];

        var output = `
            <a href="/topic?id=0">Javascript</a><br>
            <a href="/topic?id=1">node js</a><br>
            <a href="/topic?id=2">express</a><br><br>
            ${topics[req.query.id]}
        `
        res.send(output);
    }
*/

//? 시멘틱 URL => :id는 params객체에 들어가는 키값
app.get('/topic/:id', function(req, res){
    var topics = [
        "JavaScript is ...",
        "Node js is....",
        "exprerss is..."
    ];

    var output = `
        <a href="/topic/0">Javascript</a><br>
        <a href="/topic/1">node js</a><br>
        <a href="/topic/2">express</a><br><br>
        ${topics[req.params.id]}
    `
    res.send(output);
});

//? 시멘틱 URL에서 여러 파라미터를 받고 싶거나, 지금 화면의 값을 다른데로 보내고 싶을때
app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id + ": " + req.params.mode);
});


// get 방식, /는 그냥 url
app.get('/', function(req, res){
    res.send('Hello home page');
});

app.get('/dynamic', function(req, res){
    var output = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <title>static html</title>
    </head>
    <body>
        Hello Dynamic!
    </body>
    </html>
    `;
    res.send(output);
})

app.get('/login', function(req, res){
    res.send('Login please');
});

app.listen(3000, function(){
    console.log('Connnection 3000 port!');
});

//? Post 방식 : form 시작

app.get('/form', function(req, res){
    res.render('form');
});

// POST방식으로는 이렇게 받지 못함(Get방식)
// app.get('/form_receiver', function(req, res){
//     res.send(req.query);
// });

app.post('/form_receiver', function(req, res){
    res.send(req.body);
});

//? POST 방식 : form 끝

/*
! GET과 POST방식의 차이 및 쓰임새
? 1. GET : 공유 및 권한이 필요없는 페이지를 보여줄때
? 2. POST: 아이디+비밀번호 전송(GET, POST 둘다 불안정 : HTTPS OR SSL을 이용해야됨) 및 대규모 데이터를 보낼때(GET방식으로 하면 URL이 짤리는 현상이 발생)
*/