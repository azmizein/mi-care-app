import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncDataPost } from "../redux/postSlice";

export default function Blog() {
  const url = `https://84j2gl1l-2000.asse.devtunnels.ms/post/getPost`;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.value);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getData = async () => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      dispatch(syncDataPost(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getText = (html, maxLength) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let text = doc.body.textContent;

    if (maxLength && text.length > maxLength) {
      text = text.substring(0, maxLength) + "...";
    }

    return text;
  };

  const lightGreen = useColorModeValue("teal.200", "teal.700");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box margin="auto" maxW="1200px" px={{ base: "4", lg: "0" }}>
      <Box mt="50px">
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          flexWrap="wrap"
          justifyContent="center"
          gap={{ base: "20px", lg: "50px" }}>
          {currentData.map((item, index) => (
            <Flex
              key={item.id}
              flexDirection={{
                base: "column",
                lg: index % 2 === 0 ? "row" : "row-reverse",
              }}
              alignItems="center"
              mb="20px"
              maxWidth={{ base: "100%", lg: "800px" }}
              p="20px"
              boxShadow="md"
              borderRadius="md">
              <Box
                flex={{ base: 1, lg: 2 }}
                position="relative"
                mb={{ base: "20px", lg: "0" }}>
                <Box
                  w="100%"
                  h="100%"
                  bgColor={lightGreen}
                  pos="absolute"
                  top="20px"
                  left="-20px"
                  zIndex={-1}></Box>
                <Image
                  src={`https://84j2gl1l-2000.asse.devtunnels.ms/Public/${item.image}`}
                  alt=""
                  w="100%"
                  maxH="400px"
                  objectFit="cover"
                />
              </Box>
              <Box
                flex={{ base: 1, lg: 3 }}
                ml={{ base: "0", lg: index % 2 === 0 ? "20px" : "0" }}>
                <Box>
                  <Heading fontSize={{ base: "24px", lg: "36px" }} w="100%">
                    {item.title}
                  </Heading>
                </Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  mt="10px"
                  color="gray.600"
                  w="90%">
                  {getText(item.description, 100)}
                </Text>
                <Button
                  as={Link}
                  to={`/readBlog/${item.id}`}
                  width="max-content"
                  mt="20px"
                  padding="10px 20px"
                  borderWidth="1px"
                  borderColor="teal.200"
                  color="teal.200"
                  _hover={{ bg: lightGreen, color: "black" }}>
                  Baca Selengkapnya
                </Button>
              </Box>
            </Flex>
          ))}
        </Flex>
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
            Halaman {currentPage} dari {Math.ceil(data.length / itemsPerPage)}
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
    </Box>
  );
}
