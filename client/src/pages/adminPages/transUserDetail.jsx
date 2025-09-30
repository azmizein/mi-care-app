import { Box, Flex, Text } from "@chakra-ui/react";
import Sidebar from "../../component/sidebar";
import OrderUser from "../../component/orderUser";

export default function TransUserDetail() {
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
            Detail Transaction
          </Text>

          <OrderUser />
        </Box>
      </Box>
    </Flex>
  );
}
