var fs = require('fs');
var path = require('path');

const exec = require('child_process').exec;
var pathVars = require('./common.js');


var sQmlPath=pathVars.sQmlPath;


function  createQmldirFile(file) {
    fs.open(file,"a",0644,function(e,fd){
        if(e) throw e;
        //存在则清空内容
        fs.write(fd,"",0,'utf8',function(e){
            if(e) throw e;
            fs.closeSync(fd);
        })
    });
}
var sigPathRegex = /.*Singleton(\/)?$/;
function findExecDir(root) {
    if(root === undefined){
        return false;
    }
    //Singleton 目录下不做处理
    if( sigPathRegex.test(root)){
        return false;
    }
    var imgDir = /.*img$/;
    var qmlReg =/.*\.qml$/;
    var sqmldirPath = root+"/qmldir";
    
    createQmldirFile(sqmldirPath);
    var sData ="";

    var files = fs.readdirSync(root);
    files.forEach(function(file){
        var pathname = root+'/'+file;
        var dirpath = fs.lstatSync(pathname);
        //为目录
        if (dirpath .isDirectory() && !imgDir.test(pathname)){
            findExecDir(pathname);
        }else{
            if(qmlReg.test(file))
            {
              var names =  file.split('.');
              sData += names[0] + ' ' + file + '\n';
            }
        }
    });
    fs.writeFileSync(sqmldirPath, sData);
}


findExecDir(sQmlPath);
console.log("qmldir  OK");
