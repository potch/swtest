// Tiny dumb server framework

var fs = require('fs');
var pathLib = require('path');
var urlLib = require('url');

var routes = [];

function route(method, path, handler) {
  routes.push({
    method: method.toUpperCase(),
    path: path,
    handler: handler
  });
}

function serveStatic(path, mime) {
  mime = mime || 'text/plain';
  return function (req, res) {
    var body = fs.readFileSync(path).toString();
    res.writeHead(200, {'Content-type': mime});
    res.end(body);
  };
}

function handler(req, res) {
  var url = urlLib.parse(req.url);
  var path = url.pathname;
  var method = req.method.toUpperCase();
  for (var i = 0; i < routes.length; i++) {
    if (path === routes[i].path && method === routes[i].method) {
      console.log(method + ' ' + path);
      routes[i].handler(req, res);
      return;
    }
  }
  console.log(method + ' ' + path + ' Not Found');
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('url not found:' + req.url);
}

module.exports = {
  route: route,
  static: serveStatic,
  handler: handler
};
