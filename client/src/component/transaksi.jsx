import {
  Flex,
  Box,
  Text,
  Image,
  Divider,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { loanSync } from "../redux/loanSlice";

export default function Transaction() {
  const { id } = useSelector((state) => state.userSlice.value);
  const data = useSelector((state) => state.loanSlice.value);
  const dispatch = useDispatch();
  const [data1, setData1] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const dataStatus = useSelector((state) => state.statusSlice.value);

  const getAllStatus = async () => {
    try {
      const response = await Axios.post(
        "https://84j2gl1l-2000.asse.devtunnels.ms/payment/status",
        {
          order_id: dataStatus.transactionId.noInvoice,
        }
      );
      const statusData = response.data;
      setData1(statusData);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  useEffect(() => {
    getAllStatus();
  }, []);

  const updateStatus = async () => {
    try {
      const updt = Axios.post(
        "https://84j2gl1l-2000.asse.devtunnels.ms/transaction/editTransaction",
        {
          noInvoice: dataStatus.transactionId.noInvoice,
          transaction_status: data1.transaction_status,
        }
      );
      console.log(updt);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  useEffect(() => {
    updateStatus();
  }, [data1]);

  const getData = async () => {
    try {
      const trans = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/transaction/trans/${id}`
      );
      dispatch(loanSync(trans.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const formatIDRCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data
    ?.slice()
    .reverse()
    .slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box mt="30px">
      {currentData?.length === 0 ? (
        <Box align="center" mb="50px">
          <Image
            src="https://media.giphy.com/media/2C6v4QD5d3YOO4YhID/giphy.gif"
            objectFit="contain"
            w="400px"
            h="300px"
          />
          <Text textAlign="center" fontWeight="bold">
            Tidak Ada Transaksi Yang Aktif
          </Text>
          <Text
            as={Link}
            to="/"
            textAlign="center"
            fontWeight="bold"
            color="teal.400"
            w="150px"
            _hover={{ cursor: "pointer", textDecoration: "underline" }}>
            Beli Sekarang
          </Text>
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="center" flexWrap={"wrap"}>
            {currentData?.map((i) => {
              return (
                <>
                  <Box
                    h="auto"
                    p="25px"
                    minW="370px"
                    w="22vw"
                    mx="15px"
                    mt="10px"
                    mb="20px"
                    justifyContent={"center"}
                    boxShadow="md"
                    borderWidth="1px"
                    borderRadius="10px">
                    <Text fontWeight="bold" fontSize="lg">
                      Detail Transaksi
                    </Text>
                    <Box display="flex" mt="10px" justifyContent="center">
                      <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${i.noInvoice}`}
                      />
                    </Box>
                    <Box
                      display="flex"
                      mt="10px"
                      justifyContent="space-between">
                      <Text fontWeight="semibold">No Invoice :</Text>
                      <Text fontWeight="semibold">{i.noInvoice}</Text>
                    </Box>
                    <Box
                      display="flex"
                      mt="10px"
                      justifyContent="space-between">
                      <Text fontWeight="semibold">Nama :</Text>
                      <Text fontWeight="semibold">{i.User.username}</Text>
                    </Box>
                    <Box
                      display="flex"
                      mt="10px"
                      justifyContent="space-between">
                      <Text fontWeight="semibold">Email :</Text>
                      <Text fontWeight="semibold">{i.User.email}</Text>
                    </Box>
                    <Box
                      display="flex"
                      mt="10px"
                      justifyContent="space-between">
                      <Text fontWeight="semibold">Status :</Text>
                      <Badge
                        borderRadius="xl"
                        alignSelf="center"
                        bg={i.status === "pending" ? "red" : "teal"}>
                        <Text fontWeight="semibold" color="white">
                          {i.status}
                        </Text>
                      </Badge>
                    </Box>
                    <Box
                      display="flex"
                      mt="10px"
                      justifyContent="space-between">
                      <Text fontWeight="semibold">Total Harga :</Text>
                      <Text fontWeight="semibold">
                        {formatIDRCurrency(i.total)}
                      </Text>
                    </Box>

                    <Divider my="20px" />

                    <Box
                      display="flex"
                      mt="30px"
                      justifyContent="space-between">
                      <Text fontWeight="bold">Jumlah Produk :</Text>
                      <Text fontWeight="bold">
                        {i.Transaction_Details.length}
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    minW="370px"
                    w="55vw"
                    h="auto"
                    mt="10px"
                    mb="20px"
                    p="25px"
                    px="20px"
                    justifyContent={"center"}
                    boxShadow="md"
                    borderWidth="1px"
                    borderRadius="10px">
                    <Box
                      boxShadow="sm"
                      mt="20px"
                      borderWidth="1px"
                      borderRadius="10px"
                      p="10px"
                      _hover={{ boxShadow: "lg" }}>
                      {i.Transaction_Details?.map((item) => {
                        return (
                          <>
                            <Flex justifyContent="space-between">
                              <Box display="flex">
                                <Box
                                  minW="100px"
                                  minH="100px"
                                  overflow="hidden"
                                  borderWidth="1px">
                                  <Box
                                    h="50px"
                                    as={Link}
                                    to={`/detail/${item.Product.id}`}>
                                    <Image
                                      objectFit="cover"
                                      src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${item.Product.images}`}
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
                                  <Box
                                    h="50px"
                                    as={Link}
                                    to={`/detail/${item.Product.id}`}>
                                    <Text>Nama Produk</Text>
                                    <Text
                                      fontWeight="semibold"
                                      fontSize="small">
                                      {item.Product.name}
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
                                      {formatIDRCurrency(item.Product.price)}
                                    </Text>
                                  </Box>
                                </Box>
                              </Box>
                            </Flex>
                            <Divider my="20px" />
                          </>
                        );
                      })}
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
          <Flex justifyContent="center" alignItems="center" mt="20px" mb="20px">
            <Button
              width="100px"
              mr="2"
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }>
              Sebelumnya
            </Button>
            {data && (
              <Text>
                Halaman {currentPage} dari{" "}
                {Math.ceil(data.length / itemsPerPage)}
              </Text>
            )}
            <Button
              width="100px"
              ml="2"
              onClick={() =>
                handlePageChange(
                  currentPage < Math.ceil(data.length / itemsPerPage)
                    ? currentPage + 1
                    : currentPage
                )
              }>
              Selanjutnya
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
}
