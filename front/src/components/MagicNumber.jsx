import React, { useState } from "react";

const MagicNumber = () => {
    <span> Magic </span>;
    const AskNumber = ({ io }) => {
        const [number, setNumber] = useState("");

        const handleNumber = event => {
            setNumber(event.target.value);
        };

        const sendNumber = () => {
            io.emit("event::try", { number });
        };

        return (
            <div className="field">
                <div className="control">
                    <input placeholder="Type your name" type="number" className="input" onChange={handleNumber} value={number} />
                </div>
                <div className="control">
                    <a className="button is-info" onClick={sendNumber}>
                        Try
            </a>
                </div>
            </div>
        );
    }
}
export default MagicNumber;
