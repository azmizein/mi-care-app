import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../component/sidebar";
import RegisterDoctor from "../../component/registerDoctor";

export default function RegisterDoctorPage() {
  return (
    <Flex className="home" flexDirection={{ base: "column", md: "row" }}>
      <Sidebar />
      <Box className="homeContainer" flex="6">
        <Box className="listContainer" boxShadow="md" padding={4} margin={4}>
          <RegisterDoctor />
        </Box>
      </Box>
    </Flex>
  );
}
