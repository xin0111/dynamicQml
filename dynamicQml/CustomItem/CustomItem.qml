
import QtQuick 2.0

import MYColorTab 2.0


Item {
    id: root

    anchors.fill: parent

    Rectangle{
        opacity: 0.1
        anchors.fill: parent
        color: QColorTab.colMain
    }

    Component.onCompleted: {
                console.log(QColorTab.colMain)
    }
}

