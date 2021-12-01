import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import axios from "./axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");
  // const [seed, setSeed] = useState("");
  // const {roomId} = useParams();
  // const [roomName, setRoomName] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [{user}, dispatch] = useStateValue();

  // useEffect(()=>{
  //     if(roomId){
  //         db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
  //             setRoomName(snapshot.data().name);
  //         });

  //         db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
  //             setMessages(snapshot.docs.map(doc => doc.data()))
  //         });

  //     }
  // },[roomId])

  // useEffect(() => {
  //     setSeed(Math.floor(Math.random() * 5000));
  // }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Mehul, but from the other side",
      timestamp: "Somewhere in the past",
      received: false, //set true to change sides
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3 className="chat-room-name"></h3>
          <p className="chat-room-last-seen">
            Last seen{" "}
            {/* {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()} */}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.received && "chat_receiver"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestemp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
