import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const IMAGE = "https://bit.ly/sage-adebayo";

export default function AddDoctor() {
  const [data, setData] = useState([]);
  const { id } = useSelector((state) => state.userSlice.value);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const doctorData = await axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/conversation/getDoctor`
      );
      setData(doctorData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addDoctor = async (doctorId) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        `https://84j2gl1l-2000.asse.devtunnels.ms/conversation/addConversation`,
        {
          UserId: id,
          DoctorId: doctorId,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Dokter berhasil ditambahkan",
      });
      navigate("/message");
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Opps ...",
        text: `${err.response.data.error}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <Box>
      <Text textAlign="center" fontSize="xl" fontWeight="bold" mt="20px">
        Pilih Dokter Yang Ingin Ditambahkan
      </Text>
      <Center py={12}>
        <Flex
          flexWrap="wrap"
          justifyContent={{ base: "center", md: "row" }}
          mx={{ base: "0", md: "-20px" }}
          flexDirection={{ base: "column", md: "row" }}>
          {data.map((item, index) => (
            <Box
              role="group"
              p={6}
              maxW="330px"
              w={{ base: "100%", md: "48%" }}
              mb={6}
              bg="gray.100"
              boxShadow="2xl"
              rounded="lg"
              pos="relative"
              zIndex={1}
              key={index}
              ml={{ base: "0", md: "20px" }}
              mt={{ base: "20px", md: "20px" }}>
              <Box
                rounded="lg"
                mt={-12}
                pos="relative"
                height="230px"
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${IMAGE})`,
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(20px)",
                  },
                }}>
                <Image
                  rounded="lg"
                  height={230}
                  width={282}
                  objectFit="cover"
                  src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${item?.images}`}
                  alt="#"
                />
              </Box>
              <Stack pt={10} align="center">
                <Text color="gray.500" fontSize="sm" textTransform="uppercase">
                  2 Tahun Pengalaman
                </Text>
                <Heading fontSize="2xl" fontWeight={500}>
                  {item?.firstName}
                </Heading>
                <Stack direction="column" align="center">
                  <Text fontWeight={800} fontSize="xl">
                    {item?.specialist}
                  </Text>
                  <Button
                    onClick={() => {
                      addDoctor(item.id);
                    }}
                    mt={4}
                    colorScheme="teal">
                    Tambahkan Dokter
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Flex>
      </Center>
    </Box>
  );
}
