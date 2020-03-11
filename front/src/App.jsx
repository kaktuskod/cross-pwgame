import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import AskNickname from "./components/AskNickname";
import MagicNumber from "./components/MagicNumber";
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  io.on("event::gameFull", () => {
    setGameStarted(true);
    console.log("Player 2 found the game is full Now. Please wait game will start in few second");

  });

  io.on("event::gameStarted", () => {
    setGameStarted(true);
    console.log("Game started");
  });

  io.on("event::waitingPlayer", () => {
    setGameStarted(false);
    setIsWaiting(true);
  });

  io.on("event::gameStart", payload => {
    setGameStarted(true);
    toast.success("Ready ? Go !!! ", {
      id: "start"
    });
    setPlayers(payload.players);
  });




  return (
    <section className="hero is-fullheight is-light">
      <div className="hero-head">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>PWA Games</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hero-body">
        <div className="container">
          <header className="bd-index-header">
            {!isGameStarted ? <AskNickname io={io} /> :
              <MagicNumber
                io={io}
                players={players}
                setPlayers={setPlayers}
                setGameStarted={setGameStarted}
                setIsWaiting={setIsWaiting} />}
          </header>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>Let's Rock!</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
