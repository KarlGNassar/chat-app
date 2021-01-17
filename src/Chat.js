import React, { useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import SendIcon from '@material-ui/icons/Send'
import axios from './axios'

function Chat({ messages }) {
    const [input, setInput] = useState('')
    const sendMessage = async (e) => {
        e.preventDefault()

        await axios.post('/api/v1/messages/new', {
            message: input,
            name: 'Karl Nassar',
            timestamp: 'Just Now',
            received: true,
        })

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {
                    messages.map((message, i) => (
                        <p key={i} className={`chat__message ${message.received === true ? 'chat__receiver' : ' '}`}>
                            <span className="chat__name">
                                {message.name}
                            </span>

                            {message.message}

                            <span className="chat__timestamp">
                                {message.timestamp}
                            </span>
                        </p>
                    ))
                }
                
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)}placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <SendIcon />
            </div>
        </div>
    )
}

export default Chat
