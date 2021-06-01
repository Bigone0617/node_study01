var express = require('express');
var app = express();
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