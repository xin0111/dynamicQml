var component;
var sprite;
var mainArea;
var properties;

function push(Item) {
    properties =Item['properties'];
     mainArea = properties['root'];
    component = Qt.createComponent(Item['item']);
    if (component.status === Component.Ready)
    {
        finishCreation();
    }
    else
        component.statusChanged.connect(finishCreation);
}

function finishCreation() {
    if (component.status === Component.Ready) {
        sprite = component.createObject(mainArea, properties);
        mainArea.push(sprite);

    } else if (component.status === Component.Error) {
        // Error Handling
        console.log("Error loading component:", component.errorString());
    }
}


