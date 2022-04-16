"use strict";

var http = require("http");

var path = require("path");

var fs = require("fs");

var mimeTypes = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg3"
};
var port = 3000;

function handleRequest(request, response) {
  console.log("request : ", request.url);
  var lookup = request.url === "/" ? "/index.html" : decodeURI(request.url);
  var file = lookup.substring(1, lookup.length);
  fs.access(file, fs.constants.R_OK, function (err) {
    console.log(err ? "".concat(lookup, " doesn't exist") : "".concat(lookup, " ' is there"));

    if (!err) {
      fs.readFile(file, function (error, data) {
        if (error) {
          response.writeHead(500);
          response.end("Server Error!");
        } else {
          var headers = {
            "Content-type": mimeTypes[path.extname(lookup)]
          };
          response.writeHead(200, headers);
          response.end(data);
        }
      });
    } else {
      response.writeHead(404);
      response.end();
    }
  });
}

http.createServer(handleRequest).listen(port, function () {
  console.log("Server is listening on port ".concat(port));
});
//# sourceMappingURL=server.dev.js.map
