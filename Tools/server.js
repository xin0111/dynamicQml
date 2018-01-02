var http = require('http');
var fs = require('fs');//引入文件读取模块
var pathVars = require('./common.js');
var colors = require( "colors");
var xml = require("node-xml-lite");
var myUtil = require("./myUtil.js");

//需要访问的文件的存放目录
var documentRoot =pathVars.sQmlPath;
var currentPath = pathVars.currentPath;
var sOemQrcPath = pathVars.sOemQrcPath;

console.log('访问文件目录:'+documentRoot.yellow);

var changReg = /.*\/{2,}.*/
var mainReg = /.*main.qml/

var aliasMap = [];
var requireNameMap = [];

function getReuestAlias(filename){
	if(filename == ''){
		return;
	}
   var parser =  xml.parseFileSync(filename);
   var dataArray = parser.childs[1].childs;
   var data = undefined;
	for	(var i=0;i<dataArray.length;i++){
        data =dataArray[i];
		if(data instanceof Object){
			if(data.attrib !== undefined){
                aliasMap.push("/" + data.childs[0]);
                requireNameMap.push("/" + data.attrib.alias);
			}
		}
	}
}
getReuestAlias(sOemQrcPath);
var server= http.createServer(function(req,res){

	var url = req.url;
	var curTime = myUtil.getCurentTime();
	
	if(mainReg.test(url)){
		console.log(curTime +": "+(documentRoot+url).yellow);

	}else{
		console.log(curTime +": "+url);
	}
	var alaisIndex = requireNameMap.indexOf(url);
	if(alaisIndex > -1){
		url = aliasMap[alaisIndex];
		console.log(curTime +"  alais: "+url.green);		
	}
	var file = documentRoot + url;
	fs.exists(file, function(result) { 
		if(result)
		{		
			fs.readFile( file , function(err,data){
			/*
				一参为文件路径
				二参为回调函数
					回调函数的一参为读取错误返回的信息，返回空就没有错误
					二参为读取成功返回的文本内容
			*/
				if(err){
					res.writeHeader(404,{
						'content-type' : 'text/html;charset="utf-8"'
					});
					res.write('<h1>404错误</h1><p>你要找的页面不存在</p >');
					res.end();
				}else{
					res.writeHeader(200,{
						'content-type' : 'text/html;charset="utf-8"'
					});
					res.write(data);//将index.html显示在客户端
					res.end();
				}

			});
			
			
		}else{
			 console.log('文件不存在：'+file);
		}

	});



}).listen(8080);

