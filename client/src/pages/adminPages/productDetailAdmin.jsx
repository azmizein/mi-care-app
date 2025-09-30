import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../../component/sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetailAdmin() {
  const params = useParams();
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const result = await axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/product/list/${params.id}`
      );
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formatIDRCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Flex className="home">
      <Sidebar />
      <Box className="homeContainer" flex="6">
        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${data?.images}`}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  color="black">
                  {data?.name}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}>
                  {formatIDRCurrency(data?.price)}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }>
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}>
                    {data?.description}
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color="#7451f8"
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}>
                    Detail Produk
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Komposisi:
                      </Text>{" "}
                    </ListItem>
                    {data?.composition}
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Dosis:
                      </Text>{" "}
                      {data?.dosis}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Kontra Indikasi:
                      </Text>{" "}
                      {data?.contra}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Efek Samping:
                      </Text>{" "}
                      {data?.effect}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Kemasan:
                      </Text>{" "}
                      {data?.sachet}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Manufaktur:
                      </Text>{" "}
                      {data?.manufacture}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        No. Registrasi:
                      </Text>{" "}
                      {data?.registration}
                    </ListItem>
                  </List>
                </Box>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </Flex>
  );
}
