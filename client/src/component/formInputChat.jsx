/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function InputChat({ message, own }) {
  const flexDirection = own ? "row-reverse" : "row";

  return (
    <Box
      className={own ? "message own" : "message"}
      display="flex"
      flexDirection="column"
      marginTop="20px">
      <Flex className="messageTop" flexDirection={flexDirection}>
        <Image
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
          borderRadius="50%"
          objectFit="cover"
          marginRight="10px"
          marginLeft="10px"
          width="32px"
          height="32px"
        />
        <Text
          className="messageText"
          padding="10px"
          borderRadius="20px"
          backgroundColor={own ? "gray.300" : "#1877f2"}
          color={own ? "black" : "white"}
          maxWidth="300px">
          {message.text}
        </Text>
      </Flex>
    </Box>
  );
}
