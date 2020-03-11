import React, { useContext, useState } from 'react'
import { SocketContext } from '@core/context'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
    const [nickname, setNickname] = useState('')
    const io = useContext(SocketContext)
    let history = useHistory()

    const handleNickname = event => {
        setNickname(event.target.value)
    }

    const sendNickname = () => {
        io.emit('event::initialize', { nickname })
        setNickname('')

        history.push('/MagicNumber')
    }

    return (
        <div className="field">
            <div className="control">
                <input placeholder="Type your name" className="input" onChange={handleNickname} value={nickname} />
            </div>
            <div className="control">
                <a className="button is-info" onClick={sendNickname}>
                    Send
                </a>
            </div>
        </div>
    )
}

export default LoginPage