import React from "react";
import Loader from 'react-loader-spinner'

export default function Waiting() {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    return (
        <>
            <div style={style}>
                <Loader
                    type="Grid"
                    color="#00BFFF"
                    height={300}
                    width={300}
                    timeout={30000} //3 secs
                />

            </div>
        </>
    );

}
