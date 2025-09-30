/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  useColorModeValue,
  Divider,
  IconButton,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncDataPost } from "../redux/postSlice";
import { Link } from "react-router-dom";

export default function RecommendedBlog() {
  const url = `https://84j2gl1l-2000.asse.devtunnels.ms/post/getPost`;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.value);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = async () => {
    try {
      const res = await axios.get(url);
      dispatch(syncDataPost(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const lightGreen = useColorModeValue("teal.200", "teal.600");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const slidesToShow = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(data.length / slidesToShow);

  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [data.length, totalSlides]);

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleItems = () => {
    const startIndex = currentIndex * slidesToShow;
    return data.slice(startIndex, startIndex + slidesToShow);
  };

  const BlogCard = ({ item }) => (
    <Box
      key={item.id}
      height="320px"
      width={isMobile ? "280px" : "300px"}
      borderRadius="10px"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      mx="10px"
      flex="0 0 auto">
      <Image
        src={`https://84j2gl1l-2000.asse.devtunnels.ms/Public/${item.image}`}
        alt={item.title}
        h="140px"
        w="100%"
        objectFit="cover"
      />
      <Box p="15px">
        <Text
          fontSize="14px"
          fontWeight="semibold"
          color="#333"
          noOfLines={2}
          mb="15px">
          {item.title}
        </Text>
        <Button
          as={Link}
          to={`/readBlog/${item.id}`}
          size="sm"
          color="teal"
          border="1px solid teal"
          bg="white"
          _hover={{
            bg: lightGreen,
            color: "black",
            borderColor: "white",
          }}>
          Read More
        </Button>
      </Box>
    </Box>
  );

  if (data.length === 0) {
    return (
      <>
        <Divider color="red" mt="50px" />
        <Box mt="5" py={{ base: "20px", md: "50px" }} bgColor={"gray.100"}>
          <Center>
            <Text color="#555" fontSize={{ base: "16px", md: "20px" }}>
              Loading articles...
            </Text>
          </Center>
        </Box>
      </>
    );
  }

  return (
    <>
      <Divider color="red" mt="50px" />
      <Box
        mt="5"
        py={{ base: "20px", md: "50px" }}
        bgColor={"gray.100"}
        h={"60vh"}>
        <Center>
          <Text
            fontWeight="bold"
            color="#555"
            fontSize={{ base: "16px", md: "20px" }}
            mb="20px">
            Baca Artikel Terbaru
          </Text>
        </Center>

        <Center>
          <Box
            position="relative"
            width="70vw"
            maxWidth="1200px"
            overflow="hidden">
            {/* Navigation Arrows */}
            <IconButton
              aria-label="left-arrow"
              bg="teal.400"
              color="white"
              borderRadius="full"
              position="absolute"
              left="10px"
              top="50%"
              transform="translate(0%, -50%)"
              zIndex={2}
              onClick={goToPrev}
              isDisabled={data.length <= slidesToShow}>
              <BiLeftArrowAlt />
            </IconButton>

            <IconButton
              aria-label="right-arrow"
              bg="teal.400"
              color="white"
              borderRadius="full"
              position="absolute"
              right="10px"
              top="50%"
              transform="translate(0%, -50%)"
              zIndex={2}
              onClick={goToNext}
              isDisabled={data.length <= slidesToShow}>
              <BiRightArrowAlt />
            </IconButton>

            {/* Carousel Container */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="350px"
              px="50px">
              <Flex
                gap="20px"
                justifyContent="center"
                alignItems="center"
                wrap="nowrap">
                {getVisibleItems().map((item) => (
                  <BlogCard key={item.id} item={item} />
                ))}
              </Flex>
            </Box>

            {/* Dots Indicator */}
            {totalSlides > 1 && (
              <Flex
                justifyContent="center"
                alignItems="center"
                mt="10px"
                gap="8px">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <Box
                    key={index}
                    width="10px"
                    height="10px"
                    borderRadius="50%"
                    bg={index === currentIndex ? "teal.400" : "gray.300"}
                    cursor="pointer"
                    onClick={() => goToSlide(index)}
                    transition="background-color 0.3s ease"
                    _hover={{
                      bg: index === currentIndex ? "teal.500" : "gray.400",
                    }}
                  />
                ))}
              </Flex>
            )}
          </Box>
        </Center>

        <Center mt="20px" mb="20px">
          <Link
            to="/blog"
            style={{
              textDecoration: "none",
              color: "teal",
              fontWeight: "bold",
            }}>
            Baca Selengkapnya
          </Link>
        </Center>
      </Box>
    </>
  );
}
