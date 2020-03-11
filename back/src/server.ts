import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);


let players: any[] = [];
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

    const playerSize = players.length

    if (playerSize >= 2) {
      socket.emit("event::gameFull");
      return;
    }

    players.push({ nickname: payload.nickname, score: 0 });

    currentUser = payload.nickname;
    console.log(`${payload.nickname} joined the party`);

    playerSize === 2 ? io.emit("event::gameStarted", { players }) : socket.emit("event::waitingPlayer");

  });

  // lorsqu'un joueur tente
  socket.on("event::try", payload => {
    const sentNumber = payload.number

    switch (sentNumber) {

      case (sentNumber < magicNumber):
        socket.emit("event::tryHigher");
        console.log("Its higher bro !");
        break;

      case (payload.number > magicNumber):
        socket.emit("event::tryLower");
        console.log("Its lower bro !");
        break;

      case (payload.number === magicNumber):

        const winner = players.find(player => player.nickname === currentUser);
        winner.score += 1;
        winner.score !== 3 ? io.emit("event::nextStage", { players }) : socket.emit("event::endOfStage", { winner });

        break;

      default:
        break;
    }


  });
})

server.listen(PORT, () => {
  console.log("Server ready at ...");
});
