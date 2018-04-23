let NODEJS = typeof module !== 'undefined' && module.exports;

/**
 * This module contains all of the app logic and state,
 * @param io
 * @constructor
 */
let AppServer = function (io) {
    let self = this;

    self.io = io;

    self.io.on('connection', function (socket) {

        console.log('Client connected headers:', JSON.stringify(socket.handshake));

        self.io.emit('client_joined', "Client connection received");

        socket.on('disconnect', function () {
            self.io.emit('client_left', "Client disconnected");
            console.log('Client connection closed');
        });

    });
};

if (NODEJS) module.exports = AppServer;
