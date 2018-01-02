#include "dynamicQMLWindow.h"

DynamicQMLWindow::DynamicQMLWindow(QObject* parent) : QObject(parent)
{
    QObject::connect(this, SIGNAL(askReload()), this, SLOT(reloadQml()));
    _mview = new QQuickView();
    _mengine = _mview->engine();
    _mdirsToMonitor = QStringList(".");
}

DynamicQMLWindow::DynamicQMLWindow(QQuickView *view) :
    _mview(view), _mdirsToMonitor(QStringList(""))
{
    QObject::connect(this, SIGNAL(askReload()), this, SLOT(reloadQml()));
    _mengine = _mview->engine();
//    startMonitoring();
    initSocket();
}

DynamicQMLWindow::~DynamicQMLWindow()
{

}


void DynamicQMLWindow::show()
{
    _mview->show();
}

void DynamicQMLWindow::startMonitoring()
{
    _mwatcher = new QFileSystemWatcher();
    _mdirsToMonitor<<".";
    _mwatcher->addPaths(_mdirsToMonitor);

    QObject::connect(_mwatcher, SIGNAL(directoryChanged(const QString&)), this, SLOT(reloadQml()) );
}
void DynamicQMLWindow::initSocket()
{
    _udpSocket = new QUdpSocket(this);
    _udpSocket->bind(45454, QUdpSocket::ShareAddress);

    connect(_udpSocket, SIGNAL(readyRead()),
            this, SLOT(readPendingDatagrams()));
}
void DynamicQMLWindow::setViewSource(QUrl &source)
{
    _mengine = _mview->engine();
    _mengine->clearComponentCache();
    _mview->setSource(source);
}
void DynamicQMLWindow::readPendingDatagrams()
{
    while (_udpSocket->hasPendingDatagrams()) {
        QByteArray datagram;
        datagram.resize(_udpSocket->pendingDatagramSize());
        QHostAddress sender;
        quint16 senderPort;

        _udpSocket->readDatagram(datagram.data(), datagram.size(),
                                &sender, &senderPort);
        qDebug()<<"receive data...";
        reloadQml();
    }
}
void DynamicQMLWindow::reloadQml()
{
    QUrl tmp = _mview->source(); //we save current source
    qDebug()<<"reloadQml: " <<tmp;
    _mview->setSource(QUrl()); //we set an empty source
    setViewSource(tmp); //we load old source
}

