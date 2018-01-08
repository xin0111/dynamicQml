var program = require('commander');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var fs = require('fs');

var exports = module.exports = {};

exports.getCmdArgv = function(index){
    var cmdargv = program.parse(process.argv);
    program.parse(process.argv);
    var sCmd =cmdargv.args[index];
    if(sCmd==undefined){
        sCmd = "";
    }
    if(sCmd != ""){      
        console.log("cmd argument " +index+" : "+sCmd);
    }
    return sCmd;  
};
exports.getCmdArgvByKey = function(key){
    var cmdargv = program.parse(process.argv);
    program.parse(process.argv);
    cmdargv.forEach(function(element) {
        
    }, this);
    var sCmd =cmdargv.args[index];
    if(sCmd==undefined){
        sCmd = "";
    }
    if(sCmd != ""){      
        console.log("cmd argument " +index+" : "+sCmd);
    }
    return sCmd;  
};

exports.getCurentTime = function ()
{
	var myDate = new Date(); 
	return myDate.toLocaleTimeString();
};

exports.execCmd = function(cmd) {
    var argFunc = arguments[1] !== undefined ? arguments[1]:callback
    console.log("exec cmd : " + cmd);       
    exec(cmd, argFunc);
    function callback(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    }
};
exports.execCmd2 = function(cmd) {
    var onCloseFunc = arguments[1];
    console.log("exec cmd : " + cmd);
    var child = exec(cmd);
    child.stdout.on('data', (data) => {
        console.log( data);
      });
      
    child.stderr.on('data', (data) => {
     console.log(data);
    });      
    // child.on("exit")
    child.on('close', (code) => {
       if(onCloseFunc != undefined)
            onCloseFunc();       
    });
    
};


exports.execCmdSync = function(cmd) {
    console.log("execSync cmd : " + cmd);
    var child = execSync(cmd);
    console.log("-----------");
};

exports.randomNum =  function(minNum,maxNum){
	switch(arguments.length){
		case 1:
			return parseInt(Math.random()*minNum);//+1 排除 0
		break;
		case 2:
			return parseInt(Math.random()*(maxNum-minNum+1)+minNum);
		break;
		default:
			return 0;
		break;
	}
}
exports.copyFile = function(src,dest) {
    console.log("copy file from " + src+" to "+dest)
    var readStream = fs.createReadStream(src);
    var writeStream = fs.createWriteStream(dest);
    readStream.pipe(writeStream);
}
exports.pushFile = function(src,dest){
    fs.exists(src, function(exists){
        if(exists){
            exports.execCmdSync("adb push " +src+ ' ' +dest);
        }
    });
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
