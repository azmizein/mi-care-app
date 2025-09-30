/* eslint-disable react/prop-types */
"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Card = ({ heading, description, icon, to }) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderColor="white"
      borderRadius="lg"
      overflow="hidden"
      bg={`rgba(255, 255, 255, 0.5)`}
      p={5}
      _hover={{ boxShadow: "xl" }}
      boxShadow="base">
      <Stack align={"center"} spacing={2} as={Link} to={to}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
          alignItems={"center"}>
          {icon}
        </Flex>
        <Box mt={2} textAlign="center">
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function Home() {
  return (
    <Box
      p={4}
      bg={`url("https://png.pngtree.com/background/20210710/original/pngtree-medical-health-poster-background-picture-image_1059837.jpg")`}
      backgroundSize="cover">
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading
          fontSize={{ base: "2xl", sm: "4xl" }}
          fontWeight={"bold"}
          paddingTop={"40px"}>
          Solusi Kesehatan Tangerang
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Chat dokter, beli obat, update informasi seputar kesehatan, semua bisa
          di Mi Care!
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center" mb="100px">
          <Card
            heading={"Chat Dengan Dokter"}
            icon={<Image src="https://i.postimg.cc/BbgsrgQv/download-1.webp" />}
            description={
              "Chat dengan dokter pilihan anda sesuai gejala yang ditimbulkan"
            }
            to="/addDoctor"
          />
          <Card
            heading={"Toko Kesehatan"}
            icon={<Image src="https://i.postimg.cc/tRPsSQ3r/download.webp" />}
            description={
              "Beli obat dimana saja dan kapan saja tanpa harus datang ke Apotek"
            }
            to="/"
          />
          <Card
            heading={"Baca Artikel"}
            icon={
              <Image src="https://i.postimg.cc/dtM7Qjr1/mental-health-v2-1.webp" />
            }
            description={
              "Baca artikel terbaru yang membahas tentang seputar anda"
            }
            to="/blog"
          />
        </Flex>
      </Container>
    </Box>
  );
}
