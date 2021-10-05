var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    // console.log(__dirname + url); // 화면으로 나타나는 현재 경로 출력
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);