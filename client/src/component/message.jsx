import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  useColorModeValue,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import InputChat from "./formInputChat";
import Conversation from "./conversation";
import { useSelector } from "react-redux";
import io from "socket.io-client";

export default function Message() {
  const data = useSelector((state) => state.userSlice.value);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const lightGreen = useColorModeValue("teal.200", "teal.700");
  const socket = io("http://localhost:8900");

  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [message]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `https://84j2gl1l-2000.asse.devtunnels.ms/conversation/getConversation/${data.id}`
        );
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [data.id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `https://84j2gl1l-2000.asse.devtunnels.ms/message/getMessage/${currentChat}`
        );
        setMessage(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);

  useEffect(() => {
    socket.on("newMessage", (messageData) => {
      setMessage([...message, messageData]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messages = {
      sender: data.id,
      text: newMessage,
      ConversationId: currentChat,
    };
    try {
      const res = await axios.post(
        `https://84j2gl1l-2000.asse.devtunnels.ms/message/addMessage`,
        messages
      );
      setMessage([...message, res.data]);
      setNewMessage("");
      socket.emit("message", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex flexDir="space-between" width="100%" h="590px">
      <Box
        bg={lightGreen}
        width="30%"
        style={{
          overflowY: "auto",
          height: "590px",
        }}
        ref={messageContainerRef}>
        <Text fontSize="18px" p="5px" color="white">
          Daftar Dokter Yang Anda Dapat Hubungi
        </Text>
        <Flex flexDir="column">
          {conversation.map((item, index) => (
            <Box
              key={index}
              onClick={() => setCurrentChat(item.id)}
              className="conversation-item">
              <Conversation conversation={item} />
            </Box>
          ))}
        </Flex>
      </Box>
      <Box width="70%" mt="20px">
        {currentChat ? (
          <Box
            width="100%"
            borderRadius="10px"
            style={{
              overflowY: "auto",
              height: "570px",
            }}
            ref={messageContainerRef}>
            {message.map((item) => (
              <InputChat
                message={item}
                key={item.id}
                own={item.sender == data.id}
              />
            ))}
            <Box
              className="chatBoxBottom"
              display="flex"
              alignItems="center"
              padding="10px">
              <Input
                h="50px"
                className="chatMessageInput"
                placeholder="Tulis Sesuatu..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                borderRadius="md"
                border="1px solid grey"
                padding="10px"
                marginRight="10px"
                flex="1"
              />
              <Button
                h="50px"
                className="chatSubmitButton"
                onClick={handleSubmit}
                colorScheme="blue"
                borderRadius="md"
                paddingX="20px"
                fontWeight="bold">
                Kirim
              </Button>
            </Box>
          </Box>
        ) : (
          <span>klik chat disebelah</span>
        )}
      </Box>
    </Flex>
  );
}
