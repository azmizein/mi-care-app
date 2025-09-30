/* eslint-disable react/prop-types */
import { Text, useColorModeValue, Flex, Image, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ConversationDoctor({ conversation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.UserId;

    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://84j2gl1l-2000.asse.devtunnels.ms/user/getUser/${friendId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Flex
        className="conversation"
        alignItems="center"
        padding="10px"
        cursor="pointer"
        marginTop="20px"
        borderTop="1px solid white"
        borderBottom="1px solid white"
        _hover={{ backgroundColor: useColorModeValue("gray.100", "gray.800") }}>
        <Image
          src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${user?.images}`}
          alt=""
          className="conversationImg"
          boxSize="40px"
          borderRadius="50%"
          objectFit="cover"
          marginRight="20px"
        />
        <Box display="flex" flexDir="column">
          <Text fontWeight="500" className="conversationName" color="white">
            {user?.username}
          </Text>
        </Box>
      </Flex>
    </>
  );
}
