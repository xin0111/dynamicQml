var path = require('path');

var currentPath =  path.join(__dirname, '/');
/*qml 本地文件目录*/
var  sQmlPath= "D:\\xin\\dynamicQml\\dynamicQml";
/* 安卓设备或本机地址 */
// var sUdpSendTo = '192.168.1.168';
var sUdpSendTo = '127.0.0.1';
/*qrc 中使用alias时处理 ,为空则不处理*/
var sOemQrcPath = "";
// var sOemQrcPath =sQmlPath + "/qml.qrc" ;

exports.sQmlPath = sQmlPath;
exports.currentPath = currentPath;
exports.sUdpSendTo = sUdpSendTo;
exports.sOemQrcPath = sOemQrcPath;