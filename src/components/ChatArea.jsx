import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IconButton, TextField, Box, Typography, Avatar, Skeleton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import { io } from "socket.io-client";
import '../App.css'
import { useSelector } from 'react-redux';
import { SOCKET_API as scket , API_URL as api, } from "../config/variable";


const ChatArea = ({ chatUser }) => {

 const socket = io( `${scket}` ,{
   withCredentials: true
 });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  // console.log(dyParams);
  const [chat_id, chat_user] = dyParams.id?.split('&');
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData"));
  // Scroll to the bottom of the messages when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // console.log("message ynha hai guru", messages);


  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = { content: newMessage, chatId: chat_id };
    const msg={ content: newMessage, chatId: chat_id, sender:{firstName : userData?.user?.firstName, lastName:userData?.user?.lastName, _id:userData?.user?._id } }
    setMessages((prevMessages) => [...prevMessages, msg]);
    setNewMessage('');
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    axios.post(`${api}/message/`,  message , config).then((response) => {
      // console.log("Message sent successfully", response.data);
      socket.emit("newMessage", response.data);
    });
  };

  //Initialization
  useEffect(() => {
    socket.on("connect", () => {
      // console.log("connected", socket.id);
  
    });
    // console.log("userData through socket", userData);
    socket.emit("setup", userData?.user?._id);
  }, []);
  
  useEffect(() => {
    socket.on("new message", (newMessage) => {
      // console.log("new message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // return () => {
    //   socket.off("new message");
    // };
  },[socket]);


  //FETCH CHAT DURING COMPONENT LOAD
  useEffect(() => {
    // const socket = io( 'http://localhost:3000' ,{
    //   withCredentials: true
    // });
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    };
    axios.get(`${api}/message/` + chat_id, config).then(({ data }) => {
      // console.log("data", data);
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", chat_id);
    }).catch((error) => {
      // console.log("Error fetching messages:", error);
    });
  }, []);
  const nav = useNavigate();
  const [chatView, setChatView] = useState(true);


  return (
    <div className={`fixed top-30 right-4 z-auto ${chatView ? "slide-in-right" : "slide-out-right"}`}>

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '500px', width: '400px', border: '1px solid #ccc', borderRadius: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#6C63FF', padding: 2, color: '#fff', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}>
          <Avatar
          // src={chatUser.profilePhoto} alt={chatUser.name} sx={{ marginRight: 2 }} 
          />
          <Typography variant="h6" className='w-45'>
            {chat_user}
          </Typography>
          <IconButton sx={{ marginLeft: "230px", color: "whitesmoke" }} onClick={() => {
            setChatView((state) => !state);
            setTimeout(() => { nav(-1); }, 500)

          }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Messages Section */}
        <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, backgroundColor: '#f9f9f9' }}>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ marginLeft: 1, flexGrow: 1 }}>
                  <Skeleton variant="rectangular" height={20} width="80%" sx={{ marginBottom: 1 }} />
                  <Skeleton variant="rectangular" height={20} width="60%" />
                </Box>
              </Box>
            ))
          ) : (
            messages.map((msg, index) => (
             
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: msg?.sender?._id === userData?.user?._id ? 'flex-end' : 'flex-start',
                  marginBottom: 2,
                }}
              >
                {msg?.sender?._id !== userData?.user?._id && <Avatar />}
                <Box
                  sx={{
                    backgroundColor: msg?.sender?._id === userData?.user?._id ? '#6C63FF' : '#E0E0E0',
                    color: msg?.sender?._id === userData?.user?._id ? '#fff' : '#000',
                    padding: 1,
                    borderRadius: 2,
                    maxWidth: '70%',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {msg?.sender?.firstName + " " + msg?.sender?.lastName}
                  </Typography>
                  <Typography variant="body1">
                    {msg?.content}
                  </Typography>
                </Box>
                {msg?.sender?._id === userData?.user?._id && <Avatar />}
              </Box>
            ))
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Input Field */}
        <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #ccc', padding: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            sx={{ borderRadius: 2 }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            sx={{ marginLeft: 1, backgroundColor: '#6C63FF', color: '#fff', '&:hover': { backgroundColor: '#5a54e0' } }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );

};

export default ChatArea;


