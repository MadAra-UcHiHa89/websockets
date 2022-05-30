const http = require("http");
const webSocketServer = require("websocket").server; // Returns a websocket class which can be used to create a websocket.
let connection = null;
const httpserver = http.createServer((req, res) => {
  console.log("Request Received");
});

const webSocket = new webSocketServer({
  httpServer: httpserver, // The http server that the websocket server will be attached to. Thus we need a traditional http server since the initial handshake is done on the http server using the http protocol and then protocol is switched/ upgraded to websocket.
});
// Creating a websocket server  which will be attcahed to out http server we created & the socket will emit events when someone wants to use / connect to the websocket and we can respsond accordingly

webSocket.on("request", (request) => {
  console.log("Request Received");
  connection = request.accept(null, request.origin);
  // ONCE THE CONNECTION IS ACCEPTED THE PROTOOCOL IS UPGRADED TO WEBSOCKET AND THE CONNECTION IS STORED IN THE CONNECTION VARIABLE
  // This method is used to accept the connection request and that websocket is assigned to that client
  // Method takes in two parameters first is the protocol we want to use (ignore for now) and the second is the origin which is the url of the client.
  // returns a connection object which is used to send and receive data from the client on that websocket.

  // To this connection object we can add event listeners to listen to the events that are emitted by the client.

  //   connection.send("Hello Client!!");
  // This method is used to send data to the client connected to the websocket server

  connection.on("open", () => {
    console.log("Connection Opened"); // Event emitted when the connection is opened and the connection is ready to be used.
  });

  connection.on("close", () => {
    console.log("Connection Closed"); // Event emitted when the connection is closed and the websocket (which is the type of connection used) is no longer usable by the client and the connection is no longer usable by the server.
  });

  connection.on("message", (message) => {
    console.log(`Message Received: ${message.utf8Data}`);
    connection.send(`Message Received from client is: ${message.utf8Data}`);
  });
  // This event is emitted by the websocket instance when the client sends a message to the server.
});
// The request event is emitted by websocket when someone wants to connect to the websocket and in the callback we can decide whether to accept or reject the connection from the client

httpserver.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});

//Used to create a websocket connection request on the client side to the server at the specified url.
// let ws=new WebSocket("ws://localhost:8080")
// If the server accpets it then we have a websocket connection object which we can use to send and receive data from the client.

// We can store all websocket connections to our websocket server & then when & if we waant to build a group chat app whenever we recieve a message from any of the client we send ot to all clients
