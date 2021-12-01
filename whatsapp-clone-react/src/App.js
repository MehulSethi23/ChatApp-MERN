import "./App.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("498d1831849f0e6348aa", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    //clean up function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  const [{ user }, dispatch] = useStateValue();
  return (
    // <div className="app">
    //   {!user ? (
    //     <Login />
    //   ) : (
    //     <div className="app_body">
    //       <Router>
    //         <Sidebar />
    //         <Switch>
    //           <Route path="/rooms/:roomId">
    //             <Chat />
    //           </Route>
    //           <Route path="/">
    //             <Chat />
    //           </Route>
    //         </Switch>
    //       </Router>
    //     </div>
    //   )}
    // </div>
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
