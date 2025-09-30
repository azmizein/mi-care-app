import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import Table from "../../component/table";
import StatsComp from "../../component/stats";
import Featured from "../../component/featured";
import Chart from "../../component/chart";
import Sidebar from "../../component/sidebar";

export default function HomeAdmin() {
  return (
    <Flex className="home" flexDirection={{ base: "column", md: "row" }}>
      <Sidebar />
      <Box className="homeContainer" flex="6">
        <Box
          display="flex"
          justifyContent="center"
          mt={{ base: "20px", md: "50px" }}>
          <Text fontSize={{ base: "24px", md: "30px" }} fontWeight="bold">
            DASHBOARD ADMIN
          </Text>
        </Box>
        <StatsComp />
        <Grid
          className="charts"
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={4}
          padding={4}
          mt="20px">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </Grid>
        <Box className="listContainer" boxShadow="md" padding={4} margin={4}>
          <Text className="listTitle" fontWeight="500" color="gray">
            Latest Transactions
          </Text>
          <Table />
        </Box>
      </Box>
    </Flex>
  );
}
