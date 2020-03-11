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
  let currentUser: any = null;

  socket.on("event::initialize", payload => {
    console.log("initiliaze")
    if (players.length >= 2) {
      socket.emit("event::gameFull");
      return;
    }

    players.push({ nickname: payload.nickname, score: 0 });

    currentUser = payload.nickname;

    if (players.length === 2) {
      io.emit("event::gameStarted", { players });
      console.log(`game started`);
      console.log(players)
    }
  });

  // lorsqu'un joueur tente
  socket.on("event::try", payload => {
    const sentNumber = payload.number
    console.log(`${currentUser} try ${sentNumber}`);
    console.log(magicNumber);
    if (sentNumber < magicNumber) {
      socket.emit("event::tryHigher");
      console.log("Its higher bro !");
    }
    else if (sentNumber > magicNumber) {
      socket.emit("event::tryLower");
      console.log("Its lower bro !");

    }
    else if (sentNumber == magicNumber) {
      console.log("cas win")
      console.log(currentUser)
      console.log(players[0])
      const winner = players.find(player => player.nickname == currentUser);
      console.log(winner)
      winner.score += 1; 2
      winner.score !== 3 ? io.emit("event::nextStage", { players }) : socket.emit("event::endOfStage", { winner })

    }
  });


  socket.on("disconnect", () => {
    console.log("disconnect");
    if (currentUser !== undefined) {
      players = players.filter((player: any) => player.nickname !== currentUser);
      console.log(`Player ${currentUser} left game`);
      io.emit("event::waitingPlayer");
      magicNumber = invokeMagicNumber();
    }
  });


});


server.listen(PORT, () => {
  console.log(`Server is Online ✔️  on Port ${PORT}`);
});
