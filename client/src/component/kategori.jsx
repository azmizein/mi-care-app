/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Text,
  Image,
  Center,
  SimpleGrid,
  HStack,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
  Flex, // Import Flex for the slider container
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { syncCategory } from "../redux/categorySlice";
import { syncData } from "../redux/bookSlice";
import allProducts from "../assets/semua_product.png"; // Logo Semua Produk
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

export default function Category() {
  const dispatch = useDispatch();
  const apiCategories = useSelector((state) => state.categorySlice.value);
  const scrollRef = useRef(null);

  const [displayCategories, setDisplayCategories] = useState([]);
  const [showSlider, setShowSlider] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Helper function to determine image source based on whether it's a full URL or a local path
  const getImageSrc = (imagePath) => {
    if (typeof imagePath === "string" && imagePath.startsWith("http")) {
      return imagePath;
    }
    return `http://localhost:2000/public/${imagePath}`;
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://84j2gl1l-2000.asse.devtunnels.ms/product/list"
      );
      const data = res.data;
      dispatch(syncData(data));
    } catch (err) {
      console.error("Error fetching all products:", err); // Use console.error for errors
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://84j2gl1l-2000.asse.devtunnels.ms/product/category"
      );
      const data = res.data;
      dispatch(syncCategory(data));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const allCategory = {
      id: "all",
      categoryName: "Semua Produk",
      images: allProducts,
    };

    if (apiCategories.length > 0) {
      const categories = [allCategory, ...apiCategories];
      setDisplayCategories(categories);
      setShowSlider(categories.length > 6); // Adjusted threshold for better responsiveness
    } else {
      setDisplayCategories([allCategory]);
      setShowSlider(false);
    }
  }, [apiCategories]);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const handleScroll = () => {
      if (scrollElement) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    if (showSlider && scrollElement) {
      handleScroll();
      scrollElement.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [showSlider, displayCategories]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleCategoryClick = async (CategoryId) => {
    try {
      if (CategoryId === "all") {
        await getAllProducts();
      } else {
        const res = await axios.get(
          `https://84j2gl1l-2000.asse.devtunnels.ms/product/listCat/${CategoryId}`
        );
        const data = res.data;
        dispatch(syncData(data));
      }
    } catch (err) {
      console.error("Error fetching products by category:", err);
    }
  };

  const lightGreen = useColorModeValue("teal.200", "teal.700");
  const defaultTextColor = useColorModeValue("#285430", "gray.200");
  const categoryBgColor = useColorModeValue("#fafafa", "gray.700");
  const categoryImageBg = useColorModeValue("#ebf5e9", "gray.600");
  const semuaProdukBg = useColorModeValue("#f5f5f5", "gray.50");

  const columns = useBreakpointValue({ base: 2, sm: 3, md: 4, lg: 5 });

  const CategoryCard = ({ item }) => (
    <Box
      key={item.id}
      minW={{ base: "140px", md: "160px", lg: "180px" }}
      maxW={{ base: "full", sm: "180px", md: "200px" }}
      h="80px"
      borderRadius="10px"
      bg={categoryBgColor}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      _hover={{ bg: lightGreen, color: "white" }}
      p="2"
      onClick={() => handleCategoryClick(item.id)}
      cursor="pointer"
      flexShrink={0}
      flexGrow={1}>
      <Center flex="none" mr="2">
        {" "}
        <Image
          src={getImageSrc(item.images)}
          w={{ base: "50px", md: "60px" }}
          h={{ base: "50px", md: "60px" }}
          cursor="pointer"
          bg={item.id === "all" ? semuaProdukBg : categoryImageBg}
          rounded="full"
          objectFit="cover"
        />
      </Center>
      <Center flex="1">
        {" "}
        <Text
          fontSize={{ base: "xs", sm: "sm", md: "md" }}
          color={defaultTextColor}
          align="center"
          fontWeight="bold">
          {item.categoryName}
        </Text>
      </Center>
    </Box>
  );

  return (
    <>
      <Center py={{ base: 4, md: 8 }}>
        {" "}
        <Text
          fontWeight="bold"
          color={useColorModeValue("#555", "gray.300")}
          fontSize={{ base: "xl", md: "2xl" }}>
          {" "}
          Belanja Sesuai Kategori
        </Text>
      </Center>

      <Center px={{ base: 4, md: 8 }}>
        {" "}
        {showSlider ? (
          <Flex
            position="relative"
            w="100%"
            maxW="1200px"
            align="center"
            justify="center">
            {" "}
            {/* Left Arrow */}
            {canScrollLeft && (
              <IconButton
                icon={<BiLeftArrowAlt />}
                position="absolute"
                colorScheme="teal"
                left={{ base: "-5px", sm: "-10px", md: "-30px" }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                borderRadius="full"
                shadow="md"
                size={{ base: "sm" }}
                onClick={scrollLeft}
                aria-label="Scroll left"
              />
            )}
            <Box
              ref={scrollRef}
              flexGrow={1}
              overflowX="auto"
              overflowY="hidden"
              mx={{ base: 2, md: 4 }}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
                "scroll-behavior": "smooth",
              }}>
              <HStack spacing={{ base: 2, md: 4 }} pb="2">
                {" "}
                {displayCategories.map((item) => (
                  <CategoryCard key={item.id} item={item} />
                ))}
              </HStack>
            </Box>
            {/* Right Arrow */}
            {canScrollRight && (
              <IconButton
                icon={<BiRightArrowAlt />}
                position="absolute"
                colorScheme="teal"
                right={{ base: "-5px", sm: "-10px", md: "-30px" }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                borderRadius="full"
                shadow="md"
                size={{ base: "sm" }}
                onClick={scrollRight}
                aria-label="Scroll right"
              />
            )}
          </Flex>
        ) : (
          <SimpleGrid
            columns={columns}
            spacing={{ base: 2, md: 4 }}
            w="100%"
            maxW="1200px">
            {" "}
            {displayCategories.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))}
          </SimpleGrid>
        )}
      </Center>
    </>
  );
}
