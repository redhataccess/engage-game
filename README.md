# Engage

A game.

## Setup

    npm install

## Development commands

Start a development environment:

    npm start

BrowserSync will automatically reload your browser when files change.  No more
manual refreshing!  You can open the game in multiple browsers and they will
all be refreshed together.  Clicks will also be synchronized so you can test
the game in several browsers at the same time.

If you also want to test the leaderboard server, run this in another terminal:

    npm run leader-server-test

NOTE! The above will not persist

If you want to run the game in prod with a persistant leaderboard server you'll first need to install and run mongodb:

    dnf install mongodb mongodb-server mongo-tools
    systemctl start mongod
    systemctl enable mongod

Once mongodb is installed and running you can run the prod leaderboard parse server with:

    npm run leader-server-prod

This will persiste leaderboard data across retarts.
