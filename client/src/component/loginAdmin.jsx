/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
import { useRef, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../redux/adminSlice";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const url = "https://84j2gl1l-2000.asse.devtunnels.ms/admin/login";
  const dispatch = useDispatch();

  const inputUsername = useRef("");
  const inputPASS = useRef("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const admin = {
        username: inputUsername.current.value,
        password: inputPASS.current.value,
      };

      const result = await axios.post(url, admin);

      localStorage.setItem("tokenAdmin", result.data.token);
      dispatch(loginAdmin(result.data));
      navigate("/homeAdmin");

      Swal.fire({
        icon: "success",
        title: "Masuk Berhasil",
        text: "Kamu Berhasil Masuk",
        timer: 1000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        timer: 1000,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">
        <Avatar bg="#7451f8" />
        <Heading color="#7451f8">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={onLogin}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="username"
                    placeholder="username"
                    ref={inputUsername}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    ref={inputPASS}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                bg="#7451f8"
                color="white"
                width="full">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginAdmin;
