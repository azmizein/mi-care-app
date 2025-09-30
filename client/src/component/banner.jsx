/* eslint-disable react/prop-types */
import {
  Box,
  IconButton,
  useBreakpointValue,
  Center,
  Text,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner() {
  const [slider, setSlider] = useState(null);

  const side = useBreakpointValue({ base: "10px", md: "20px" });

  const isMobile = useBreakpointValue({ base: true, md: false });

  const slidesToShow = isMobile ? 1 : 3;

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 3500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    infinite: true,
    cssEase: "ease-in-out",
  };

  const cards = [
    "https://d2qjkwm11akmwu.cloudfront.net/banners/128303_24-8-2023_15-53-15.webp",
    "https://d2qjkwm11akmwu.cloudfront.net/banners/306910_2-8-2023_14-16-19.webp",
    "https://d2qjkwm11akmwu.cloudfront.net/banners/831007_2-8-2023_13-41-19.webp",
    "https://d2qjkwm11akmwu.cloudfront.net/banners/527439_24-8-2023_7-42-16.webp",
  ];

  const CustomSlide = ({ url }) => (
    <Box
      key={url}
      height={isMobile ? "153px" : "202px"}
      width={isMobile ? "auto" : "auto"}
      borderRadius="10px"
      position="relative"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={`url(${url})`}
      margin={isMobile ? "0 5px" : "0 10px"}
    />
  );

  return (
    <>
      <Center mt="80px">
        <Text
          fontWeight="bold"
          color="#555"
          fontSize={{ base: "16px", md: "20px" }}>
          Penawaran Menarik
        </Text>
      </Center>
      <Center>
        <Box
          mt="20px"
          position="relative"
          height="auto"
          width="70vw"
          justifyContent="center"
          role="group">
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          {/* Tombol Panah Kiri */}
          <IconButton
            aria-label="left-arrow"
            bg="teal.400"
            color="white"
            borderRadius="full"
            position="absolute"
            left={side}
            top="50%"
            transform="translate(0%, -50%)"
            zIndex={2}
            onClick={() => slider?.slickPrev()}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.3s ease-in-out"
            _hover={{ bg: "teal.500" }}>
            <BiLeftArrowAlt />
          </IconButton>

          {/* Tombol Panah Kanan */}
          <IconButton
            aria-label="right-arrow"
            bg="teal.400"
            color="white"
            borderRadius="full"
            position="absolute"
            right={side}
            top="50%"
            transform="translate(0%, -50%)"
            zIndex={2}
            onClick={() => slider?.slickNext()}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.3s ease-in-out"
            _hover={{ bg: "teal.500" }}>
            <BiRightArrowAlt />
          </IconButton>

          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {cards.map((url, index) => (
              <CustomSlide key={index} url={url} />
            ))}
          </Slider>
        </Box>
      </Center>
    </>
  );
}
