

import QtQuick 2.2
import QtQuick.Window 2.1
import QtQuick.Particles 2.0
import QtQuick.Controls 1.2

import MYColorTab 2.0


import "./CustomItem"

import "componentCreation.js" as MyScript

Item {
    id: root
    visible: true

    anchors.fill: parent

    property var featuresWin: undefined
    property url uPicPath: "http://192.168.1.113:8080/Picture.qml"
    StackView {
        id: mainArea
        clip: true
        anchors.fill: parent
        Component.onCompleted: {
            //mainArea.push({item: uPicPath, properties:{root: mainArea}})
            MyScript.push({item: uPicPath, properties:{root: mainArea}})
        }
    }

    Text{
        id: centralText
        anchors.bottom: root.verticalCenter
        anchors.bottomMargin: 20
        anchors.horizontalCenter: root.horizontalCenter
        color: "white"
        maximumLineCount: 5
        width: 500
        elide: Text.ElideRight
        text: " UDP Message"
        wrapMode: Text.Wrap
        font.pixelSize:55
    }
    Component.onCompleted: {
        console.log(QColorTab.colMain)
    }
    CustomItem{
        id: randomItem
    }

}

