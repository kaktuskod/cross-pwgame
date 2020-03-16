import React, { useState } from "react";



const MagicNumber = ({ io, setGameStarted, setIsWaiting, players, setPlayers }) => {
    <span> Magic </span>;

    const [number, setNumber] = useState("");
    const [previousNumber, setPreviousNumber] = useState("");
    const [hint, setHint] = useState("");
    const [stage, setStage] = useState(1);



    const handleNumber = event => {
        setNumber(event.target.value);
        setPreviousNumber(event.target.value);
    };
   
    const sendNumber = () => {
        io.emit("event::try", { number: number });
        console.log(number)
        setNumber("");
    };

    const exitGame = () => {
        io.emit("event::disconnect");

    };

    io.on("event::tryHigher", () => {
        setHint(`More than ${previousNumber}`);
    });

    io.on("event::tryHigher", () => {
        setHint(`More than ${previousNumber}`);
    });

    io.on("event::tryLower", () => {
        setHint(`Less than ${previousNumber}`);
    });

    io.on("event::nextStage", payload => {
        setStage(stage + 1);
        setPlayers(payload.players);
    });

    io.on("event::endOfStage", payload => {
        toast.success(`${payload.winner.nickname} win the game`, {
            id: "end",
        });
        setGameStarted(false);
        setIsWaiting(false);
    });

    return (
        <div className="field">
            <div>Stage {stage}</div>
            <div>
                {players.length === 2 ? `${players[0].nickname} ${players[0].score} - ${players[1].score} ${players[1].nickname}` : null}
            </div>
            <div className="control">
                <input placeholder="Try a number" type="number" className="input" onChange={handleNumber} value={number} />
            </div>
            <div>{hint}</div>
            <div className="control">
                <a className="button is-info" onClick={sendNumber}>Try</a>
                <a className="button is-info" onClick={exitGame}>Leeave</a>
                <a className="button is-info" onClick={notify}>Notify</a>
              
            </div>

        </div>
    );
}

export default MagicNumber;
