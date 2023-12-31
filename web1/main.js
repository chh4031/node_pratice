let http = require("http");
let fs = require("fs");
let url = require("url");
const { template } = require("underscore");

let templateHTML = (title, list, body) => {
  return `
  <!doctype html>
<html>
<head>
<title>WEB2 - ${title}</title>
<meta charset="utf-8">
</head>
<body>
<h1><a href="/">WEB</a></h1>
  ${list}
  ${body}
</body>
</html>`;
};

let templeteList = (filelist) => {
  let list = "<ul>";
  let i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + `</ul>`;
  return list;
};

let app = http.createServer(function (request, response) {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("../data", (error, filelist) => {
        let title = "Welcome";
        let description = "Hello, Node js";
        let list = templeteList(filelist);
        let template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>${description}`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("../data", (error, filelist) => {
        fs.readFile(`../data/${queryData.id}`, "utf8", (err, description) => {
          let title = queryData.id;
          let list = templeteList(filelist);
          let template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>${description}`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
