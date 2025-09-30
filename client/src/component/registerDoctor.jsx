import { useRef } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterDoctor() {
  const inputImages = useRef(null);
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputSpecialist = useRef(null);

  const signUp = async () => {
    try {
      const formData = new FormData();

      if (inputImages.current.files[0]) {
        formData.append("images", inputImages.current.files[0]);
      }

      formData.append("firstName", inputName.current.value);
      formData.append("email", inputEmail.current.value);
      formData.append("password", inputPassword.current.value);
      formData.append("specialist", inputSpecialist.current.value);

      const RegisterDoctor = await axios.post(
        "https://84j2gl1l-2000.asse.devtunnels.ms/doctor/register",
        formData
      );

      console.log(RegisterDoctor);

      Swal.fire({
        icon: "success",
        title: "Berhasil ",
        text: "Berhasil Mendaftarkan Dokter",
        timer: 2000,
      });
      inputName.current.value = "";
      inputEmail.current.value = "";
      inputPassword.current.value = "";
      inputSpecialist.current.value = "";
      inputImages.current.value = null;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign up your doctor partner</Heading>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input ref={inputName} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" ref={inputEmail} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" ref={inputPassword} />
          </FormControl>
          <FormControl id="specialist">
            <FormLabel>Specialist</FormLabel>
            <Select ref={inputSpecialist}>
              <option value="Dr Penyakit Dalam">Dr Penyakit Dalam</option>
              <option value="Dr Mata">Dr Mata</option>
              <option value="Dr Umum">Dr Umum</option>
              <option value="Dr Jantung">Dr Jantung</option>
              <option value="Dr Kecantikan">Dr Kecantikan</option>
              <option value="Dr Oral">Dr Oral</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Gambar Produk</FormLabel>
            <Input type="file" ref={inputImages} />
          </FormControl>
          <Stack spacing={6}>
            <Button colorScheme={"blue"} variant={"solid"} onClick={signUp}>
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
