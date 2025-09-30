/* eslint-disable react/prop-types */
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { CreditCard, Store, AccountCircleOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

function StatsCard(props) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      boxShadow="md"
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}>
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function StatsComp() {
  const data = useSelector((state) => state.userAdminSlice.value);
  const data1 = useSelector((state) => state.productAdminSlice.value);
  const data2 = useSelector((state) => state.orderSlice.value);

  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        // py={10}
        fontWeight={"bold"}></chakra.h1>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Users"}
          stat={data.length}
          icon={
            <AccountCircleOutlined
              style={{ fontSize: "50px", color: "#7451f8" }}
            />
          }
        />
        <StatsCard
          title={"Products"}
          stat={data1.length}
          icon={<Store style={{ fontSize: "50px", color: "#7451f8" }} />}
        />
        <StatsCard
          title={"Orders"}
          stat={data2.length}
          icon={<CreditCard style={{ fontSize: "50px", color: "#7451f8" }} />}
        />
      </SimpleGrid>
    </Box>
  );
}
