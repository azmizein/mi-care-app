import { useEffect, useRef, useState } from "react";
import { Box, Button, useColorModeValue, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import InputChat from "./formInputChat";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import ConversationDoctor from "./conversationDoctor";

export default function MessageDoctor() {
  const socket = io("http://localhost:8900");
  const data = useSelector((state) => state.userSlice.value);
  const { id } = useSelector((state) => state.doctorSlice.value);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const lightGreen = useColorModeValue("teal.200", "teal.700");
  const messageContainerRef = useRef(null);

  console.log(id);

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
          `https://84j2gl1l-2000.asse.devtunnels.ms/conversation/getConversationDoctor/${id}`
        );
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `https://84j2gl1l-2000.asse.devtunnels.ms/message/getMessage/${currentChat?.id}`
        );
        setMessage(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat?.id]);

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
      sender: conversation.id,
      text: newMessage,
      ConversationId: currentChat?.id,
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
    <>
      <Flex flexDir="space-between" gap="5px" width="100%">
        <Box bg={lightGreen} width="30%">
          <Flex flexDir="column">
            {conversation.map((item) => (
              <Box key={item.id} onClick={() => setCurrentChat(item)}>
                <ConversationDoctor conversation={item} currentUser={data} />
              </Box>
            ))}
          </Flex>
        </Box>
        <Box width="70%" mt="20px">
          {currentChat ? (
            <Box
              width="90%"
              borderRadius="10px"
              margin="auto"
              style={{
                overflowY: "auto",
                height: "500px",
              }}
              ref={messageContainerRef}>
              {message.map((item) => (
                <InputChat
                  message={item}
                  key={item.id}
                  own={item.sender == conversation.id}
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
                  placeholder="Tulis sesuatu..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  borderRadius="md"
                  border="1px solid grey"
                  padding="10px"
                  marginRight="10px"
                  flex="1"
                />
                <Button
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
    </>
  );
}
