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