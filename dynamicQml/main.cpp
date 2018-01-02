#include <QApplication>
#include <QQuickView>
#include <QtQml>

#include "dynamicQMLWindow.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    QString mainAddress = "http://192.168.1.113:8080/main.qml";
    qmlRegisterSingletonType(QUrl("qrc:/Singleton/ColorTabs.qml"), "MYColorTab", 2, 0, "QColorTab");
    QQuickView *view = new QQuickView();
    DynamicQMLWindow* dqw = new DynamicQMLWindow(view);
    dqw->_mview->setMinimumWidth(640);
    dqw->_mview->setMinimumHeight(480);

    dqw->_mview->setSource(QUrl(mainAddress));

    dqw->show();

    return app.exec();
}

