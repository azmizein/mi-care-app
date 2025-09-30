import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Divider, Flex, Image, Text, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function OrderUser() {
  const [data, setData] = useState([]);
  const params = useParams();

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/transaction/getTransactionDetail/${params.id}`
      );
      const transactionData = res.data;
      console.log(transactionData);
      setData(transactionData);
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
    <Center>
      <Box
        minW="370px"
        w="40vw"
        h="auto"
        mt="10px"
        mb="20px"
        p="25px"
        px="20px"
        boxShadow="md"
        borderWidth="1px"
        borderRadius="10px">
        {data?.map((item, index) => (
          <div key={index}>
            <Flex justifyContent="space-between">
              <Box display="flex">
                <Box
                  minW="100px"
                  minH="100px"
                  overflow="hidden"
                  borderWidth="1px">
                  <Box h="50px">
                    <Image
                      objectFit="cover"
                      src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${item["Product.images"]}`}
                      width="100px"
                      height="100px"
                    />
                  </Box>
                </Box>
                <Box
                  ml={{ base: "15px", md: "30px" }}
                  w={{ base: "100%", md: "200px" }}
                  alignItems={{
                    base: "flex-start",
                    md: "center",
                  }}
                  display="flex">
                  <Box h="50px">
                    <Text>Nama Produk</Text>
                    <Text fontWeight="semibold" fontSize="small">
                      {item["Product.name"]}
                    </Text>
                  </Box>
                </Box>
                <Box
                  ml={{ base: "15px", md: "30px" }}
                  w={{ base: "100%", md: "200px" }}
                  alignItems={{
                    base: "flex-start",
                    md: "center",
                  }}
                  display="flex">
                  <Box h="50px">
                    <Text>Harga Produk</Text>
                    <Text
                      fontWeight="semibold"
                      fontSize="small"
                      color="pink.400">
                      {formatIDRCurrency(item["Product.price"])}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Flex>
            {index < data.length - 1 && <Divider my="20px" />}
          </div>
        ))}
      </Box>
    </Center>
  );
}
