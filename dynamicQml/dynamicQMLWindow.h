#ifndef QMLENGINEMANAGER_H
#define QMLENGINEMANAGER_H

#include <QQmlEngine>
#include <QQuickView>
#include <QString>

#include <QWindow>
#include <QDebug>
#include <QShortcut>

#include <QFileSystemWatcher>
#include <QQmlContext>
#include <QUdpSocket>
#include <QQmlComponent>

class DynamicQMLWindow : public QObject
{
    Q_OBJECT
public:
    explicit DynamicQMLWindow(QObject *parent=0);
    DynamicQMLWindow(QQuickView* view);
    ~DynamicQMLWindow();

    /**
     * This method allows to display the view
     **/
    void show();

    /**
     * This method sets a view source file to the QQmlEngine
     **/
    void setViewSource(QUrl& source);

    /**
     * This method will look for changes made in _mdirsToMonitor and ask reloadQml() if something changed
     * in the sources
     **/
    void startMonitoring();

    void initSocket();


    QQmlEngine* _mengine;
    QQuickView* _mview;

private:
    QUdpSocket *_udpSocket;
    QFileSystemWatcher* _mwatcher;
    QStringList _mdirsToMonitor;
    QQmlComponent *_mcomponent;

signals:
    void askReload();

public slots:
    void reloadQml();
    void readPendingDatagrams();

};

#endif // QMLENGINEMANAGER_H
