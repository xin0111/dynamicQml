TEMPLATE = app

QT += qml quick widgets
CONFIG += c++11


SOURCES += main.cpp \
    dynamicQMLWindow.cpp

HEADERS += \
    dynamicQMLWindow.h

DISTFILES += main.qml \
    MyGrid.qml \
    CustomItem/CustomItem.qml \
    Picture.qml

# Additional import path used to resolve QML modules in Qt Creator's code model
QML_IMPORT_PATH =

# Default rules for deployment.
include(deployment.pri)

RESOURCES += \
    qml.qrc

