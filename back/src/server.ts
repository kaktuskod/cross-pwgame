import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);

let players = [];
let trys = [];

app.get("/", (_, res) => {
  res.send("hello fellows");
});

io.on("connection", socket => {
  console.log("new connection");
  socket.emit("event::hello");

  socket.on("event::initialize", payload => {

    if (players.length >= 2) { socket.emit("event::gameFull"); return; }

    players.push(payload);
    console.log("new name received: ", payload.nickname);

    if (players.length === 2) {
      io.emit("event::gameStarted");
      // initialisation du nombre a trouver
      let randNumber = Math.floor(Math.random() * (1337 - 0 + 1)) + 0;
      // lorsqu'un joueur tente 
      socket.on("event::try", payload => {
        trys.push(payload);

        if (payload.number) {
          switch (payload) {

            case (payload.number > randNumber):
              socket.emit("event::tryAgainHigher");
              console.log("Its higher bro !");
              break;

            case (payload.number < randNumber):
              socket.emit("event::tryAgainLower");
              console.log("Its lower bro !");
              break;

            case (payload.number - randNumber === 1):
              socket.emit("event::tryAgainAlmost");
              console.log("... Damn Almost");
              break;

            case (payload.number === randNumber):
              socket.emit("event::youWin");
              console.log("... Damn Almost");
              break;

            default:
              break;
          }


          socket.emit("event::gameFull");
          return;
        }

      });
    }
  });

  server.listen(PORT, () => {
    console.log("Server ready at ...");
  });
