/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Icon,
  Text,
  Image,
  Flex,
  Center,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/bookSlice";
import { cartSync } from "../redux/cartSlice";
import { addCart } from "../redux/userSlice";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";

export default function ProductCard() {
  const url = `https://84j2gl1l-2000.asse.devtunnels.ms/product/list`;
  const data = useSelector((state) => state.bookSlice.value);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userSlice.value);
  const userCart = useSelector((state) => state.cartSlice.value);
  const getData = useCallback(async () => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      dispatch(syncData(data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, url]);

  useEffect(() => {
    getData();
  }, [getData]);

  const [sortOrder, setSortOrder] = useState("ascName");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredAndSortedData = (() => {
    let currentFiltered = data.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const price = item.price;
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;

      const matchesPriceRange = price >= min && price <= max;

      return matchesSearch && matchesPriceRange;
    });

    currentFiltered.sort((a, b) => {
      if (sortOrder === "ascName") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "descName") {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === "ascPrice") {
        return a.price - b.price;
      } else if (sortOrder === "descPrice") {
        return b.price - a.price;
      }
      return 0;
    });

    return currentFiltered;
  })();

  const formatIDRCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredAndSortedData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSortOrder("ascName");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const onAddCart = async (ProductId) => {
    try {
      if (!id) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Anda harus login terlebih dahulu",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }

      const isProductInCart = userCart.some(
        (item) => item.Product.id === ProductId
      );

      if (isProductInCart) {
        return Swal.fire({
          icon: "info",
          title: "Sudah Ada!",
          text: "Produk ini sudah Anda tambahkan ke dalam keranjang, silahkan pilih produk lain atau anda bisa pencet tombol selengkapnya didalam keranjang untuk melanjutkan pembayaran atau menambahkan jumlah barang yg sudah anda pilih Terimakasih.",
          timer: 3000,
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
        title: "Berhasil",
        text: `${result.data.message}`,
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

  const lightGreen = useColorModeValue("teal.200", "teal.700");
  const darkGreen = useColorModeValue("teal.400", "teal.600");

  const filterBoxBg = useColorModeValue("gray.50", "gray.800");
  const filterBoxBorderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <>
      <Center mt="30px" id="products" flexDirection="column">
        {/* Box Filter dan Urutkan */}
        <Box
          m="10px"
          mb="20px"
          borderWidth="1px"
          boxShadow="lg"
          borderRadius="lg"
          w={{ base: "95%", md: "600px", lg: "800px", xl: "900px" }}
          p={4}
          bg={filterBoxBg}
          borderColor={filterBoxBorderColor}
          color={textColor}>
          {/* Header dengan Judul dan Tombol Reset */}
          <Flex
            align="center"
            justify="space-between"
            pb={3}
            mb={3}
            borderBottom="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}>
            <Flex align="center">
              <Icon boxSize="5" as={BsFilterLeft} mr={2} color={darkGreen} />
              <Text fontWeight="extrabold" fontSize="lg" color={darkGreen}>
                Filter & Urutkan
              </Text>
            </Flex>
            <Button
              onClick={handleResetFilters}
              size="sm"
              variant="ghost"
              leftIcon={<Icon as={BiReset} />}
              colorScheme="red"
              _hover={{ bg: "red.50", color: "red.600" }}>
              Reset
            </Button>
          </Flex>

          {/* Kontainer Flex untuk Membuat Dua Kolom */}
          <Flex
            flexWrap="wrap"
            justifyContent={{
              base: "center",
              md: "space-between",
              lg: "space-around",
            }}
            gap={4}>
            {/* Kontrol Pengurutan Nama */}
            <FormControl
              w={{ base: "100%", md: "48%" }}
              mb={{ base: 4, md: 0 }}>
              <FormLabel
                fontSize="sm"
                fontWeight="semibold"
                mb={2}
                color={textColor}>
                Urutkan Nama Produk
              </FormLabel>
              <Stack direction={{ base: "column", sm: "row" }} spacing={2}>
                <Button
                  onClick={() => {
                    setSortOrder("ascName");
                    setCurrentPage(1);
                  }}
                  variant={sortOrder === "ascName" ? "solid" : "outline"}
                  colorScheme="teal"
                  size="sm"
                  leftIcon={<BsSortAlphaDown />}
                  flex="1">
                  A-Z
                </Button>
                <Button
                  onClick={() => {
                    setSortOrder("descName");
                    setCurrentPage(1);
                  }}
                  variant={sortOrder === "descName" ? "solid" : "outline"}
                  colorScheme="teal"
                  size="sm"
                  leftIcon={<BsSortAlphaUp />}
                  flex="1">
                  Z-A
                </Button>
              </Stack>
            </FormControl>

            {/* Kontrol Pengurutan Harga */}
            <FormControl
              w={{ base: "100%", md: "48%" }}
              mb={{ base: 4, md: 0 }}>
              <FormLabel
                fontSize="sm"
                fontWeight="semibold"
                mb={2}
                color={textColor}>
                Urutkan Harga
              </FormLabel>
              <Stack direction={{ base: "column", sm: "row" }} spacing={2}>
                <Button
                  onClick={() => {
                    setSortOrder("ascPrice");
                    setCurrentPage(1);
                  }}
                  variant={sortOrder === "ascPrice" ? "solid" : "outline"}
                  colorScheme="teal"
                  size="sm"
                  leftIcon={<Icon as={FaSortNumericDown} />}
                  flex="1">
                  Harga Terendah
                </Button>
                <Button
                  onClick={() => {
                    setSortOrder("descPrice");
                    setCurrentPage(1);
                  }}
                  variant={sortOrder === "descPrice" ? "solid" : "outline"}
                  colorScheme="teal"
                  size="sm"
                  leftIcon={<Icon as={FaSortNumericUp} />}
                  flex="1">
                  Harga Tertinggi
                </Button>
              </Stack>
            </FormControl>

            {/* Filter Rentang Harga */}
            <FormControl
              w={{ base: "100%", md: "48%" }}
              mb={{ base: 4, md: 0 }}>
              <FormLabel
                fontSize="sm"
                fontWeight="semibold"
                mb={2}
                color={textColor}>
                Rentang Harga
              </FormLabel>
              <Flex>
                <NumberInput
                  value={minPrice}
                  onChange={(valueString) => {
                    setMinPrice(valueString);
                    setCurrentPage(1);
                  }}
                  min={0}
                  w="full"
                  mr={2}>
                  <NumberInputField
                    placeholder="Min Harga"
                    borderRadius="md"
                    borderColor={useColorModeValue("gray.300", "gray.600")}
                    _focus={{
                      borderColor: darkGreen,
                      boxShadow: `0 0 0 1px ${darkGreen}`,
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize="md" alignSelf="center" mr={2}>
                  -
                </Text>
                <NumberInput
                  value={maxPrice}
                  onChange={(valueString) => {
                    setMaxPrice(valueString);
                    setCurrentPage(1);
                  }}
                  min={0}
                  w="full">
                  <NumberInputField
                    placeholder="Max Harga"
                    borderRadius="md"
                    borderColor={useColorModeValue("gray.300", "gray.600")}
                    _focus={{
                      borderColor: darkGreen,
                      boxShadow: `0 0 0 1px ${darkGreen}`,
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </FormControl>

            {/* Input Pencarian */}
            <FormControl w={{ base: "100%", md: "48%" }} mb={0}>
              <FormLabel
                fontSize="sm"
                fontWeight="semibold"
                mb={2}
                color={textColor}>
                Cari Produk
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.400" />}
                />
                <Input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  size="md"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={useColorModeValue("gray.300", "gray.600")}
                  _focus={{
                    borderColor: darkGreen,
                    boxShadow: `0 0 0 1px ${darkGreen}`,
                  }}
                  _placeholder={{
                    color: useColorModeValue("gray.500", "gray.400"),
                  }}
                />
              </InputGroup>
            </FormControl>
          </Flex>
        </Box>

        {/* Kartu Produk */}
        <Flex flexWrap={"wrap"} justifyContent="center" mt="0px" w={"72vw"}>
          {currentData.length > 0 ? (
            currentData.map((item) => {
              return (
                <Box
                  key={item.id}
                  w="180px"
                  h="293px"
                  borderWidth="1px"
                  m="10px"
                  _hover={{ boxShadow: "xl" }}
                  boxShadow="base"
                  borderRadius="13px"
                  overflow="hidden">
                  <Box
                    h="155px"
                    w="full"
                    _hover={{ cursor: "pointer" }}
                    borderTopRadius="13px"
                    overflow="hidden">
                    <Image
                      objectFit="cover"
                      src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${item.images}`}
                      width="180px"
                      height="155px"
                      alt={item.name}
                    />
                  </Box>
                  <Box px="10px" h="90px" py={2}>
                    <Box h="50px" as={Link} to={`/detail/${item.id}`}>
                      <Text
                        _hover={{ cursor: "pointer", color: darkGreen }}
                        fontWeight="bold"
                        fontSize="md">
                        {item.name.substring(0, 25)}
                        {item.name.length >= 25 ? "..." : null}
                      </Text>
                    </Box>
                    <Box display="flex" fontSize="sm">
                      <Text
                        fontWeight="extrabold"
                        color={useColorModeValue("black", "white")}
                        mr="5px">
                        {formatIDRCurrency(item.price)}
                      </Text>
                    </Box>
                  </Box>
                  <Box pb="12px" px="10px" h="40px">
                    <Button
                      onClick={() => onAddCart(item.id)}
                      _hover={{
                        cursor: "pointer",
                        bg: darkGreen,
                        color: "white",
                      }}
                      w="full"
                      borderRadius="9px"
                      size="sm"
                      my="5px"
                      colorScheme="teal"
                      variant="outline"
                      _active={{ bg: "teal.600" }}>
                      <Icon boxSize="4" as={IoCartOutline} mr="5px" />
                      Keranjang
                    </Button>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Text fontSize="lg" color="gray.500" mt="50px">
              Tidak ada produk yang ditemukan.
            </Text>
          )}
        </Flex>
      </Center>

      {/* Kontrol Paginasi */}
      <Flex justifyContent="center" alignItems="center" mt="40px" mb="40px">
        <Button
          width="100px"
          mr="2"
          colorScheme="teal"
          variant="outline"
          _hover={{ bg: lightGreen, color: "white" }}
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}>
          Sebelumnya
        </Button>
        {filteredAndSortedData.length > 0 && (
          <Text>
            Halaman {currentPage} dari {totalPages}
          </Text>
        )}
        <Button
          width="100px"
          ml="2"
          colorScheme="teal"
          variant="outline"
          _hover={{ bg: lightGreen, color: "white" }}
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages || totalPages === 0}>
          Selanjutnya
        </Button>
      </Flex>
    </>
  );
}
