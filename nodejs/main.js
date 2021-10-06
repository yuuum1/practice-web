var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}
function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list +  `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/') {
      if(queryData.id === undefined){
        
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          
        //   var list = `<ul>
        //   <li><a href="/?id=HTML">HTML</a></li>
        //   <li><a href="/?id=CSS">CSS</a></li>
        //   <li><a href="/?id=JavaScript">JavaScript</a></li>
        // </ul>`
          // var list = '<ul>';
          // var i = 0;
          // while(i < filelist.length){
          //   list = list +  `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          //   i = i + 1;
          // }
          // list = list + '</ul>';

          // var template = `
          // <!doctype html>
          // <html>
          // <head>
          //   <title>WEB1 - ${title}</title>
          //   <meta charset="utf-8">
          // </head>
          // <body>
          //   <h1><a href="/">WEB</a></h1>
          //   ${list}
          //   <h2>${title}</h2>
          //   <p>${description}</p>
          // </body>
          // </html>
          // `;
          var list = templateList(filelist);
          var template = templateHTML(title, list, 
            `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        })

      } else {
        fs.readdir('./data', function(error, filelist){          
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, 
              `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          // console.log(__dirname + url); // 화면으로 나타나는 현재 경로 출력
          //response.end(fs.readFileSync(__dirname + url));  
          });
        });
      }
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
    
 
});
app.listen(3000);