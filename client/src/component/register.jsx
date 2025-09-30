/* eslint-disable no-unused-vars */
import {
  Input,
  Button,
  FormLabel,
  VStack,
  FormControl,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalBody,
  Center,
  HStack,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import Axios from "axios";
import * as Yup from "yup";
import { Field, ErrorMessage, Formik, Form } from "formik";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";

const url = "https://84j2gl1l-2000.asse.devtunnels.ms/user/register";

export const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const registerSchema = Yup.object().shape({
    password: Yup.string()
      .required("Masukan password anda")
      .min(8, "Password minimal 8 huruf"),
    username: Yup.string()
      .required("Masukan username anda")
      .min(5, "Username minimal 5 huruf"),
    email: Yup.string()
      .email("Email tidak valid")
      .required("Masukan email anda"),
    phoneNumber: Yup.string().required("Masukan nomor telepon anda"),
    age: Yup.string().required("Masukan usia anda"),
  });

  const onRegister = async (data) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const requestData = {
        ...data,
        password: hashedPassword,
      };

      const result = await Axios.post(url, requestData);
      onClose();
      Swal.fire({
        icon: "success",
        title: "Register Sukses",
        text: `${result.data.message}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      onClose();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.name
          ? err.response.data.errors[0].message
          : err.response.data,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <>
      <HStack bg="white">
        <Button
          onClick={onOpen}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"teal.400"}>
          Sign Up
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay zIndex="1000" />
          <ModalContent>
            <ModalHeader>
              <Center>Daftar Sekarang</Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{
                  password: "",
                  username: "",
                  phoneNumber: "",
                  age: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values, action) => {
                  onRegister(values);
                  action.setFieldValue("username", "");
                  action.setFieldValue("password", "");
                  action.setFieldValue("phoneNumber", "");
                  action.setFieldValue("age", "");
                }}>
                {(props) => {
                  return (
                    <>
                      <Form>
                        <VStack spacing={4} align="flex-start">
                          <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Field
                              as={Input}
                              type="text"
                              name="username"
                              variant="filled"
                            />
                            <ErrorMessage
                              style={{ color: "red" }}
                              component="div"
                              name="username"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Field
                              as={Input}
                              type="email"
                              name="email"
                              variant="filled"
                            />
                            <ErrorMessage
                              style={{ color: "red" }}
                              component="div"
                              name="email"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                            <Field
                              as={Input}
                              type="password"
                              name="password"
                              variant="filled"
                            />
                            <ErrorMessage
                              component="div"
                              name="password"
                              style={{ color: "red" }}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="password">
                              Nomor Telepon
                            </FormLabel>
                            <Field
                              as={Input}
                              type="number"
                              name="phoneNumber"
                              variant="filled"
                            />
                            <ErrorMessage
                              component="div"
                              name="phoneNumber"
                              style={{ color: "red" }}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="password">Usia </FormLabel>
                            <Field
                              as={Input}
                              type="number"
                              name="age"
                              variant="filled"
                            />
                            <ErrorMessage
                              component="div"
                              name="age"
                              style={{ color: "red" }}
                            />
                          </FormControl>
                          <Box display="flex">
                            <Button
                              type="submit"
                              bg="teal.400"
                              mr={3}
                              color="white"
                              _hover={{ color: "black", bg: "gray.100" }}>
                              Daftar
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                          </Box>
                        </VStack>
                      </Form>
                    </>
                  );
                }}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
    </>
  );
};
