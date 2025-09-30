import {
  Box,
  Input,
  Flex,
  Text,
  Button,
  Heading,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

const WriteBlog = () => {
  const inputTitle = useRef(null);
  const inputDescription = useRef(null);
  const inputImage = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const lightGray = useColorModeValue("lightgray", "gray.600");
  const data = useSelector((state) => state.adminSlice.value);

  console.log(data.id, "asd");

  const onCreate = async () => {
    try {
      const formData = new FormData();
      if (inputImage.current && inputImage.current.files[0]) {
        formData.append("file", inputImage.current.files[0]);
      }
      formData.append("title", inputTitle.current.value);
      formData.append("description", inputDescription.current.value);
      formData.append("AdminId", data.id);

      let response;

      if (state) {
        response = await axios.post(
          `https://84j2gl1l-2000.asse.devtunnels.ms/post/editPost/${state.id}`,
          formData
        );
      } else {
        response = await axios.post(
          `https://84j2gl1l-2000.asse.devtunnels.ms/post/addPost`,
          formData
        );
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: `${response.data.message}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });

      navigate("/blog");
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Masukan Data Dengan Lengkap",
      });
    }
  };

  return (
    <Box
      width={{ base: "100%", md: "1024px" }}
      margin="auto"
      p={{ base: "4", md: "0" }}>
      <Box
        className="add"
        mt="20px"
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        gap="20px">
        <Box
          className="content"
          flex="5"
          display="flex"
          flexDirection="column"
          gap="20px">
          <Input
            type="text"
            placeholder="Title"
            padding="10px"
            borderColor={lightGray}
            ref={inputTitle}
            defaultValue={state ? state.title : ""}
          />
          <Box
            className="editorContainer"
            height="300px"
            overflow="scroll"
            border={`1px solid ${lightGray}`}>
            <ReactQuill
              className="editor"
              theme="snow"
              style={{ height: "100%", border: "none" }}
              ref={inputDescription}
              defaultValue={state ? state.description : ""}
            />
          </Box>
        </Box>
        <Box className="menu" flex="2" display="flex" flexDirection="column">
          <Box
            className="item"
            border={`1px solid ${lightGray}`}
            padding="10px"
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            fontSize="12px"
            color="#555">
            <Heading fontSize="20px">Publish</Heading>
            <Text>
              <b>Status: </b> Draft
            </Text>
            <Text>
              <b>Visibility: </b> Public
            </Text>
            <FormControl as="fieldset" id="file">
              <FormLabel cursor="pointer">Upload Image</FormLabel>
              <Input type="file" id="file" name="image" ref={inputImage} />
              <FormHelperText>Choose an image to upload</FormHelperText>
            </FormControl>
            <Flex className="buttons" justifyContent="space-between">
              <Button
                cursor="pointer"
                color="white"
                backgroundColor="teal"
                borderWidth="1px"
                borderColor="teal"
                padding="3px 5px"
                onClick={onCreate}>
                Publish
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WriteBlog;
