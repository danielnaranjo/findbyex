var socket = io.connect('/');
var sentData = {};
var connects = {};
var markers = {};
var active = false;

socket.on('load:coords', function(data) {
if (!(data.id in connects)) {
  setMarker(data);
}

connects[data.id] = data;
connects[data.id].updated = $.now(); // shothand for (new Date).getTime()
});

var emit = $.now();
// send coords on when user is active
doc.on('mousemove', function() {
        active = true;

        sentData = {
                id: userId,
                active: active,
                coords: [{
                        lat: miubicacion[0],
                        lng: miubicacion[1]
                }]
        };

        if ($.now() - emit > 30) {
                socket.emit('send:coords', sentData);
                emit = $.now();
        }
});