![Engage](https://github.com/redhataccess/engage-game/raw/master/engageTitle.png)

# Engage

A Customer Portal game for Red Hat Summit 2017 in Boston, and 2018 in San Francisco.

## Basic setup

(This game requires Node.js to run; if on Fedora, install it with `sudo dnf install nodejs`, or [download it](https://nodejs.org/en/)).

    npm install
    npm start

## Setting up the Leap Motion controller

The game can be played with a mouse, but for extra fun, set up a Leap motion device as follows.

  1. Go to https://www.leapmotion.com/setup/desktop/linux and follow the instructions there (unpack box, plug in Leap, download driver)
  2. The Leap driver is packaged for Ubuntu/Debian.  We use Fedora, so they must be converted to `rpm`s, like so:
     1. Install alien: `sudo dnf install alien`
     2. Extract the `Leap_Motion_Setup_Linux_x.x.x.tgz` file
     3. cd into the extracted directory
     4. cd into the `Leap_Motion_Installer_Packages_release_public_linux` directory
     5. Convert debs to rpms: `sudo alien -rv --scripts Leap-*x64.deb`
     6. Install rpms: `sudo rpm -ivh --nodeps --force leap*.rpm`
  3. Start the leap driver: `sudo leapd`
  4. Install dependancy for Visualizer: `sudo dnf install mesa-libGLU`
  4. Once the Leap is plugged in and the driver is installed, try launching the Leap visualizer to verify it's working.  To do that, run `Visualizer`  NOTE: Visualizer only works in X11,  not Wayland
  5. Spend a few minutes playing with the Visualizer :)
  6. Now that the Leap is working, you can start Engage normally.  It will automatically connect to the Leap.  (Note: the mouse still works even when the Leap is active)

## Setting up the leaderboard

While the game *can* be run without a leaderboard (no server, no database), you can follow these instructions to enable the leaderboard.

After running `npm start`, BrowserSync will automatically reload your browser
when files change.  No more manual refreshing!  You can open the game in
multiple browsers and they will all be refreshed together.  Clicks will also be
synchronized so you can test the game in several browsers at the same time.

If you also want to test the leaderboard server, run this in another terminal:

    npm run leader-server-test

Once that's running, in another terminal run `bash populate_leaders.sh` to inject some placeholder leaders.  NOTE! This database does not persist.  It's only for testing.

If you want to run the game in prod with a persistant leaderboard server you'll first need to install and run mongodb:

    dnf install mongodb mongodb-server mongo-tools
    systemctl start mongod
    systemctl enable mongod

Once mongodb is installed and running you can run the prod leaderboard parse server with:

    npm run leader-server-prod

This will persist leaderboard data across retarts.

To enable sending notifications to top score bumps, you must have a engage-server-running
and the client configured to point to it. Example:

    ENGAGE_SERVER_URL: 'http://localhost:8000'

Get the engage game server here: https://github.com/redhataccess/engage-game-server

## Configuration

There are a ton of configuration options in src/js/config.js  most of them are well documented in the code.

If the game seems too hard to avoid the Shellshock you can turn the values of these to settings:

    // Vuln difficulty.  Tune these to make shellshocks easier to avoid
    VULN_ACCEL: 1200,
    VULN_TRACKING: 0.016,

## Badge Scanner Setup (Optional if using ITN badge vendor)

1. Install dependancies

```
    sudo dnf install nodejs gcc-c++ pcsc-lite-devel pcsc-lite pcsc-tools libXScrnSaver libusb
```

2. Install driver
https://support.identiv.com/scl010-scl011/
Restart the pcscd service after the drivers are installed.

```
    sudo systemctl restart pcscd
    sudo systemctl enable pcscd
```

3. Test

```
    pcsc_scan # to do some test reads from the cmdline
```

4. In src/client/js/config.js  set `LAUNCH_MODE: 'badge'`
5. Download and `chmod +x on bcard-browser-0.3.8-x86_64.AppImage`  and run this program it is saved uploaded to utils/ directory.
6. In the BCARD Browser app, go to options and set 'post page' to http://localhost:3000/bscan
7. Then launch the game with `npm start`
8. To test playing the game scan a badge, or if you don't have a badge scanner use this GET request in another browser to simulate a scan request to launch the game:

http://localhost:3000/bscan/?AccountId=123456&EventId=2081&Salutation=Mr.&Firstname=John&Lastname=Smith&Middlename=A&Suffix=Esq.&Title=Executive+Supervising+Bartender&Company=Acme+Inc.&Division=IT+Department&Address1=123+Any+Street&Address2=Block+2&Address3=Apartment+3&City=Bethesda&State=MD&Zip=90210&Country=USA&TelCountryCode=64&Phone1=111+555+1111&Phone2=111+555+2222&Fax=111+555+33333&Email=jsmith%40acmeinc.com&URL=www.acmeinc.com&PubCodes=A4%2CB1%2CC8&PrivCodes=AT%2CEX%2CEO&EncodeAux1=Aux+1&EncodeAux2=Aux+2&EncodeAux3=Aux+3&EncodeAux4=Aux+4&EncodeAux5=Aux+5&Friendly=Jeff+Test

