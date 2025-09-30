import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
} from "@chakra-ui/react";

import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartSync } from "../redux/cartSlice";
import { addCart } from "../redux/userSlice";

export default function DetailComp() {
  const params = useParams();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userSlice.value);
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

  const onAddCart = async (ProductId) => {
    try {
      if (!id) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Login First",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }

      const result = await axios.post(
        "https://84j2gl1l-2000.asse.devtunnels.ms/cart/add",
        {
          UserId: id,
          ProductId,
        }
      );

      const res = await axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/cart/${id}`
      );
      dispatch(cartSync(res.data));
      dispatch(addCart());
      getData();

      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const formatIDRCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const lightGreen = useColorModeValue("teal.200", "teal.700");

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex flexDir={"column"}>
          <Image
            rounded={"md"}
            src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${data?.images}`}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
            border="1px solid black"
          />
          <Box as={"header"}>
            <Heading mt="10%" fontWeight={400} fontSize="2xl">
              {data?.name}
            </Heading>
            <Text
              marginTop="5%"
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}>
              {formatIDRCurrency(data?.price)}
            </Text>
          </Box>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
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
                fontWeight={"300"}
                textAlign={"left"}>
                Deskripsi
              </Text>
              <Text as={"span"}>{data?.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                Indikasi
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <Text as={"span"}>{data?.name}</Text>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                Komposisi
              </Text>

              <List spacing={2}>
                <Text as={"span"}>{data?.composition}</Text>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                Dosis
              </Text>

              <List spacing={2}>
                <Text as={"span"}>{data?.dosis}</Text>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                Kontra Indikasi
              </Text>

              <List spacing={2}>
                <Text as={"span"}>{data?.contra}</Text>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                Efek Samping
              </Text>

              <List spacing={2}>
                <Text as={"span"}>{data?.effect}</Text>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                Kemasan
              </Text>

              <List spacing={2}>
                <Text as={"span"}>{data?.sachet}</Text>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                Manufaktur
              </Text>

              <List spacing={2}>
                <Text as={"span"}>{data?.manufacture}</Text>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}>
                No. Registrasi
              </Text>

              <List spacing={2}>
                <Text as={"span"}>{data?.registration}</Text>
              </List>
            </Box>
          </Stack>

          <Button
            onClick={() => onAddCart(data?.id)}
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            borderRadius="9px"
            textTransform={"uppercase"}
            _hover={{ cursor: "pointer", bg: lightGreen }}>
            Keranjang
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 Hari Kerja Pengiriman</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
