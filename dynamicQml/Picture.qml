import QtQuick 2.0

Rectangle {
    width: 100
    height: 62
    property var root: null   //mainArea
    property string sTest: ""

    Image{
        id: image
        source: "ressources/fox.jpg"
        anchors.centerIn:parent
    }


     MouseArea {
         anchors.fill: parent
         onClicked: {
             if(!root.busy){
                 console.log ("click root : "+root)
             }
         }
     }
     Component.onCompleted: {
        console.log ("Picture.qml ok !")
        console.log ("root : "+root) 
     }
}

