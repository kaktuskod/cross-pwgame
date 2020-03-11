import React, { useState, useContext } from 'react'
import { SocketContext } from '@core/context'

const MagicInformations = ({ setGameStarted, players, setPlayers }) => {
    const io = useContext(SocketContext)
    const [previousNumber] = useState("");
    const [hint, setHint] = useState("");
    const [stage, setStage] = useState(1);

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
    });

    return (
        <div className="field">
            <div>Stage {stage}</div>
            <div>
                {players.length === 2 ? `${players[0].nickname} ${players[0].score} - ${players[1].score} ${players[1].nickname}` : null}
            </div>
            <div>{hint}</div>
        </div>
    )
}

export default MagicInformations