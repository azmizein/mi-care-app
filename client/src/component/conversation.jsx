/* eslint-disable react/prop-types */
import { Box, Text, useColorModeValue, Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Conversation({ conversation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.DoctorId;

    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://84j2gl1l-2000.asse.devtunnels.ms/user/getDoctor/${friendId}`
        );

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <Flex
      className="conversation"
      alignItems="center"
      padding="10px"
      cursor="pointer"
      borderTop="1px solid white"
      borderBottom="1px solid white"
      _hover={{ backgroundColor: useColorModeValue("gray.100", "gray.800") }}>
      <Image
        src={
          "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
        }
        alt=""
        className="conversationImg"
        boxSize="40px"
        borderRadius="50%"
        objectFit="cover"
        marginRight="20px"
      />
      <Box display="flex" flexDir="column">
        <Text fontWeight="500" className="conversationName" color="white">
          {user?.firstName}
        </Text>
        <Text fontWeight="500" className="conversationName" color="black">
          {user?.specialist}
        </Text>
      </Box>
    </Flex>
  );
}
