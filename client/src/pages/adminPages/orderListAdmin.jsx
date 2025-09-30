import { Box, Flex, Text } from "@chakra-ui/react";
import Order from "../../component/orderDetail";
import Sidebar from "../../component/sidebar";

export default function HomeAdminOrder() {
  return (
    <Flex className="home">
      <Sidebar />
      <Box className="homeContainer" flex="6">
        <Box className="listContainer" boxShadow="md" padding={4} margin={4}>
          <Text
            display="flex"
            gap="2px"
            className="listTitle"
            fontWeight="500"
            color="gray">
            Lists - <Text color="#6439ff">{"  "} Orders</Text>
          </Text>
          <Order />
        </Box>
      </Box>
    </Flex>
  );
}
