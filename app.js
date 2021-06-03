var express = require('express');
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