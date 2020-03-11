import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);

let players = {};
let invokeMagicNumber = () => {
  const result: number = Math.floor(Math.random() * (1337 - 0 + 1)) + 0;
  return result;
}
let magicNumber: number = invokeMagicNumber();

app.get("/", (_, res) => {
  res.send("Hi guys !");
});

io.on("connection", socket => {
  let currentUser: any;


  socket.on("event::initialize", payload => {
    const playerSize = Object.keys(players).length

    if (playerSize >= 2) {
      socket.emit("event::gameFull");
      return;
    }

    players[socket.id] = {
      ...payload
    }
    console.log("A new player joined the party ", payload.nickname);


    if (playerSize === 2) {
      console.log("GAME STARTED");

      io.emit("event::gameStarted");
      // initialisation du nombre a trouver

    }
  });

  // lorsqu'un joueur tente
  socket.on("event::try", payload => {
    console.log("tried");

    players[socket.id] = {
      ...payload
    }
    console.log(players);

    if (trys.length > 2) {
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
    }

  });
})

server.listen(PORT, () => {
  console.log("Server ready at ...");
});
