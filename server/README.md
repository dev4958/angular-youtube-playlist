# Youtube Playlist Resource Server

A one resource REST API using [Node.js](https://github.com/nodejs/node)([Express](https://github.com/expressjs/express)) with read capabilities.  To be used in conjunction with the [AngularJS Youtube Playlist client](https://github.com/dev4958/angular-youtube-playlist/tree/master/client).

### Starting the Server

To use this server, first navigate to this directory inside your console and enter the following command:

$`npm i`

Next, in the same directory, enter this command to start the server (which by default runs on port 5000):

$`node server`

the server should now be up and running.  Alternatively, run:

$`npm start`

to start running the server using [Nodemon](https://nodemon.io/), so if changes are made or the server crashes it will automatically restart.

### Testing the Server

Testing for the resource server uses [Mocha](https://github.com/mochajs/mocha)/[Chai](https://github.com/chaijs/chai) (with [Chai HTTP](https://github.com/chaijs/chai-http)).  To run the tests, navigate to this directory in your console and enter the following command:

$`npm test`

or, if you have installed Mocha globally (via $`npm install -g mocha`)

$`mocha`

the resource server tests should now run.

If you'd like to run the tests with debugging enabled run:

$`npm run test-with-debug`
