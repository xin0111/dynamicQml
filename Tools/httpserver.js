var http = require("http");
var fs = require("fs");
var myUtil = require("./myutil.js");

//本机地址
// http://192.168.1.113/

var server= http.createServer(function(request,response){
    
    console.log(myUtil.getCurentTime() +" request");
    // response.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
    response.writeHead(200,{"Content-Type":'application/json',   'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});

    var  str = fs.readFileSync('httpdata.txt');    
    response.write(str);
    response.end();

}).listen(80);

