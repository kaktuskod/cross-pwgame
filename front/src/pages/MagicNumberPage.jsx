import React, { useState, useContext } from 'react'
import { SocketContext } from '@core/context'
import MagicInformations from '@core/components/MagicInformations';
import WaitScreen from '@core/components/WaitScreen';
import { ToastContainer, toast } from 'react-toastify';



const MagicNumberPage = () => {
    const io = useContext(SocketContext)

    const [number, setNumber] = useState("");
    const [previousNumber, setPreviousNumber] = useState("");
    const [hint, setHint] = useState("");
    const [stage, setStage] = useState(1);
    const [isGameStarted, setGameStarted] = useState(false);
    const [players, setPlayers] = useState([]);

    const notify = () => toast("Wow so easy !");

    const handleNumber = event => {
        setNumber(event.target.value);
        setPreviousNumber(event.target.value);
    };

    const sendNumber = () => {
        io.emit("event::try", { number: number });
        console.log(number)
        setNumber("");
        notify()
    };

    const exitGame = () => {
        io.emit("event::disconnect");
    };

    io.on("event::tryHigher", () => {
        setHint(`More than ${previousNumber}`);
    });

    io.on("event::gameStarted", payload => {
        setGameStarted(true)
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

    if (!isGameStarted) {
        return <WaitScreen />
    } else {
        return (
            <div className="field">
                <MagicInformations
                    setGameStarted={setGameStarted}

                    players={players}
                    setPlayers={setPlayers}
                />

                <div className="control">
                    <input placeholder="Try a number" type="number" className="input" onChange={handleNumber} value={number} />
                </div>

                <div className="control">
                    <a className="button is-info" onClick={sendNumber}>Try</a>
                    <a className="button is-info" onClick={exitGame}>Leave</a>
                </div>
                <ToastContainer
                />
            </div>
        )
    }
}

export default MagicNumberPage