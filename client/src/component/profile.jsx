import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  Avatar,
  Text,
  Box,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function Profile() {
  const { id, username, email, phoneNumber, age, images } = useSelector(
    (state) => state.userSlice.value
  );

  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const inputName = useRef("");
  const inputEmail = useRef("");
  const inputPhoneNumber = useRef("");
  const inputAge = useRef("");
  const inputImage = useRef(null);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9]{10,15}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const editProfile = async () => {
    try {
      const phoneNumberValue = inputPhoneNumber.current.value;

      const formData = new FormData();

      if (inputImage.current.files[0]) {
        formData.append("images", inputImage.current.files[0]);
      }

      formData.append("name", inputName.current.value);
      formData.append("email", inputEmail.current.value);
      formData.append("phoneNumber", phoneNumberValue);
      formData.append("age", inputAge.current.value);

      if (!validatePhoneNumber(inputPhoneNumber.current.value)) {
        setValidationErrors({
          phoneNumber: "Please enter a valid phone number.",
        });
        return;
      }

      const resultEdit = await axios.patch(
        `https://84j2gl1l-2000.asse.devtunnels.ms/user/editProfile/${id}`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile Berhasil Diubah",
        timer: 2000,
      });
      closeEditModal();
      setValidationErrors({});
      window.location.reload(resultEdit);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex
      minH={"50vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("teal.50", "gray.800")}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile
        </Heading>
        <Avatar
          size="xl"
          src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${images}`}
          alignSelf="center"></Avatar>
        <FormControl id="userName" isRequired>
          <FormLabel>Nama</FormLabel>
          <Text fontWeight="bold">{username}</Text>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Alamat Email</FormLabel>
          <Text>{email}</Text>
        </FormControl>
        <FormControl id="phoneNumber" isRequired>
          <FormLabel>Nomor Telepon</FormLabel>
          <Text>{phoneNumber}</Text>
        </FormControl>
        <FormControl id="age" isRequired>
          <FormLabel>Usia</FormLabel>
          <Text>{age}</Text>
        </FormControl>
        <Spacer />
        <Box textAlign="center">
          <Button colorScheme="teal" onClick={openEditModal}>
            Edit Profile
          </Button>
        </Box>
      </Stack>

      <Modal isOpen={isEditing} onClose={closeEditModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ubah Profil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nama</FormLabel>
              <Input defaultValue={username} ref={inputName} />
            </FormControl>
            <FormControl>
              <FormLabel>Alamat Email</FormLabel>
              <Input defaultValue={email} ref={inputEmail} />
            </FormControl>
            <FormControl>
              <FormLabel>Nomor Telepon</FormLabel>
              <Input defaultValue={phoneNumber} ref={inputPhoneNumber} />
              {validationErrors.phoneNumber && (
                <Text color="red">{validationErrors.phoneNumber}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Usia</FormLabel>
              <Input defaultValue={age} ref={inputAge} />
            </FormControl>
            <FormControl>
              <FormLabel>Foto Profil</FormLabel>
              <Input type="file" ref={inputImage} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={editProfile}>
              Save
            </Button>
            <Button variant="ghost" onClick={closeEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
