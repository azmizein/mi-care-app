/* eslint-disable react/prop-types */
import { Box, Image, Heading, Text, Flex } from "@chakra-ui/react";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function ReadBlog() {
  const params = useParams();
  const [data, setData] = useState();
  const { username } = useSelector((state) => state.adminSlice.value);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:2000/post/getPost/${params.id}`
      );
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/post/delete/${id}`);
      navigate("/blog");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Post Berhasil Dihapus.",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the post.",
      });
    }
  };

  return (
    <Box>
      <Box maxW="1024px" mx="auto" p="20px">
        <Box
          mt={{ base: "20px", md: "50px" }}
          className="content"
          flex="5"
          display="flex"
          flexDirection="column"
          gap="30px">
          <Image
            src={`http://localhost:2000/Public/${data?.image}`}
            w="100%"
            h={{ base: "200px", md: "300px" }}
            objectFit="cover"
          />
          <Flex className="user" alignItems="center" fontSize="14px" gap="10px">
            <Image
              src="https://i.postimg.cc/nVykNj1r/Pngtree-beautiful-admin-roles-line-vector-5272906.png"
              alt=""
              w={{ base: "40px", md: "50px" }}
              h={{ base: "40px", md: "50px" }}
              borderRadius="50%"
              objectFit="cover"
            />
            <Box className="info">
              <Text fontWeight="bold">{data?.Admin?.username}</Text>
              <Text>Postingan {moment(data?.updatedAt).fromNow()}</Text>
            </Box>
            {username === data?.Admin?.username && (
              <Flex
                className="edit"
                gap="5px"
                as={Link}
                to={`/writeBlog?=2`}
                state={data}>
                <Image src={Edit} alt="" w="20px" h="20px" cursor="pointer" />
                <Image
                  src={Delete}
                  alt=""
                  w="20px"
                  h="20px"
                  cursor="pointer"
                  onClick={() => onDelete(data?.id)}
                />
              </Flex>
            )}
          </Flex>
          <Heading fontSize={{ base: "28px", md: "42px" }} color="#333">
            {data?.title}
          </Heading>

          <Text
            textAlign="justify"
            lineHeight={{ base: "24px", md: "30px" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.description),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
