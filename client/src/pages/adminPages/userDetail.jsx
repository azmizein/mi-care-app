/* eslint-disable react/jsx-key */
import {
  Box,
  Text,
  Image,
  useColorModeValue,
  Flex,
  Avatar,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/react";
import Chart from "../../component/chart";
import Sidebar from "../../component/sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TableOrdersUsers from "../../component/tableOrdersUser";

export default function UserDetail() {
  const params = useParams();
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const trans = await axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/transaction/trans/${params.id}`
      );
      setData(trans.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const dataUser = data?.[0];
  return (
    <Box display="flex" width="100%" className="single">
      <Sidebar />
      <Box flex={6} className="singleContainer">
        <Box display="flex" gap={10} className="top" p={5}>
          <>
            <Box display="flex" mb="20px">
              <Box
                w="400px"
                bg={useColorModeValue("white", "gray.800")}
                boxShadow="md"
                rounded={"md"}
                overflow={"hidden"}>
                <Image
                  h={"120px"}
                  w={"full"}
                  src={
                    "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  }
                  objectFit="cover"
                  alt="#"
                />
                <Flex justify={"center"} mt={-12}>
                  <Avatar
                    size={"xl"}
                    src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${dataUser?.User.images}`}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>

                <Box p={3}>
                  <Stack spacing={0} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}>
                      {dataUser?.User.username}
                    </Heading>
                    <Text color={"gray.500"}>{dataUser?.User.email}</Text>
                  </Stack>

                  <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                      <Text fontWeight={600}>{dataUser?.User.age}</Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Age
                      </Text>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                      <Text fontWeight={600}>{dataUser?.User.phoneNumber}</Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Phone Number
                      </Text>
                    </Stack>
                  </Stack>

                  <Button
                    w={"full"}
                    mt={8}
                    bg={"#7451f8"}
                    color={"white"}
                    rounded={"md"}>
                    Verified
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box flex={2}>
              <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            </Box>
          </>
        </Box>
        <Box boxShadow="lg" padding={10} margin="10px 20px" className="bottom">
          <Text fontSize="16px" color="lightgray" mb={3}>
            Last Transactions
          </Text>
          <TableOrdersUsers userData={data} />
        </Box>
      </Box>
    </Box>
  );
}
