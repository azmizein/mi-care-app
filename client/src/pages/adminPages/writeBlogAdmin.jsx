import { Box, Flex, Text } from "@chakra-ui/react";
import Sidebar from "../../component/sidebar";
import WriteBlog from "../../component/writeBlog";

export default function WriteBlogAdmin() {
  return (
    <Flex className="home">
      <Sidebar />
      <Box className="homeContainer" flex="6">
        <Box
          className="listContainer"
          boxShadow="2px 4px 10px 1px rgba(0, 0, 0, 0.47)"
          padding={4}
          margin={4}>
          <Text
            display="flex"
            gap="2px"
            className="listTitle"
            fontWeight="500"
            color="gray">
            Lists - <Text color="#6439ff">{"  "} Write Blog</Text>
          </Text>
          <WriteBlog />
        </Box>
      </Box>
    </Flex>
  );
}
