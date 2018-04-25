#!/bin/env node
//  Sample Node.js WebSocket Client-Server application
let http            = require('http');
let express         = require('express');

// Patch console.x methods in order to add timestamp information
require("console-stamp")(console, {pattern: "mm/dd/yyyy HH:MM:ss.l"});

/**
 *  Define the sample server.
 */
let MainServer = function () {

    //  Scope.
    let self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server env variables/defaults.
     */
    self.setupVariables = function () {
        //  Set the environment variables we need.
        self.port = process.env.PORT || 3000;
    };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     */
    self.terminator = function (sig) {
        if (typeof sig === "string") {
            console.log('Received %s - terminating sample server ...', sig);
            process.exit(1);
        }
        console.log('Node server stopped.');
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(0); });

        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Endpoint for receiving the GET request from bcard browser with badge data in query string
     */
    self.createRoutes = function () {
        self.routes = {};

        self.routes['/bscan'] = function (req, res) {
            console.log('received badge scan', req.query);

            if (self.clientSocket && self.clientSocket.connected) {
                // Notify the client to launch the game with the players badge data
                self.clientSocket.emit('launch_game', req.query);

                console.log('Sent launch message to client');
            }

            res.setHeader('Content-Type', 'application/json');
            res.send(req.query);
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function () {
        self.createRoutes();
        self.app = express();
        self.httpServer = http.Server(self.app);
        self.io = require('socket.io')(self.httpServer);

        // Initialize the socket.io messages
        self.initializeSocketIo();


        // Set up express static content root
        self.app.use(express.static(__dirname + '/../' + (process.argv[2] || 'client')));

        //  Add handlers for the app (from the routes).
        for (let r in self.routes) {
            if (self.routes.hasOwnProperty(r)) {
                self.app.get(r, self.routes[r]);
            }
        }
    };


    self.initializeSocketIo = function () {
        self.io.on('connection', function (socket) {

            self.clientSocket = socket;

            console.log('Client connected headers:', JSON.stringify(socket.handshake));

            self.io.emit('client_joined', "Client connection received");

            socket.on('disconnect', function () {
                self.io.emit('client_left', "Client disconnected");
                console.log('Client connection closed');
            });

        });
    };


    /**
     *  Initializes the server
     */
    self.initialize = function () {
        self.setupVariables();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server
     */
    self.start = function () {
        //  Start the app on the specific interface (and port).
        self.httpServer.listen(self.port, function () {
            console.log('Node server started on localhost:%d ...', self.port);
        });
    };
};


/**
 *  main():  Main code.
 */
let mainServer = new MainServer();
mainServer.initialize();
mainServer.start();

