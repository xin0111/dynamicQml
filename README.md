## qt-android 的qml部分的两种调试方式
### A：加载网络端qml文件；   
1 使用qmlRegisterSingletonType注册，pragma Singleton声明的qml文件         
2 使用StackView时，因加载网络文件延时，需要等待Component加载完成，所以使用componentCreation.js加载           
3 发送udp信号，重新加载qml文件
### B: 使用rcc工具(apk调用的so文件也可以通过替换，达到修改效果）
1 adb push *.so /data/app-lib/com.package.name/       
2 adb push *.rcc /storage/emulated/0/
