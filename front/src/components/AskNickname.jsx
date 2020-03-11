import React, { useState } from "react";

const AskNickname = ({ io }) => {
  const [nickname, setNickname] = useState("");

  const handleNickname = event => {
    setNickname(event.target.value);
  };

  const sendNickname = () => {
    io.emit("event::initialize", { nickname });
    setNickname("");
  };

  const style = { position: "fixed", bottom: "30%", left: "50%", transform: "translate(-50%, -50%)" }


  return (

    <div className="field">

      <div className="control">
        <input placeholder="Type your name" className="input" onChange={handleNickname} value={nickname} />
      </div>
      <div className="control">
        <a style={style} className="button is-info" onClick={sendNickname}>
          Send
        </a>
      </div>
    </div>
  );
};

export default AskNickname;
