import {
  Box,
  Button,
  Image,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteUser, syncDataUser } from "../redux/userAdminSlice";
import Swal from "sweetalert2";

export default function TableUsers() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.userAdminSlice.value);

  const onDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://84j2gl1l-2000.asse.devtunnels.ms/user/delete/${id}`
      );
      dispatch(deleteUser());
      dispatch(syncDataUser(res.data));
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "User Berhasil Dihapus.",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the user.",
      });
    }
  };

  return (
    <Table variant="simple" className="table">
      <TableCaption>Users List</TableCaption>
      <Thead>
        <Tr>
          <Th>id</Th>
          <Th>Username</Th>
          <Th>Email</Th>
          <Th>Phone Number</Th>
          <Th>Status</Th>
          <Th>Age</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{item.id}</Td>
            <Td>
              <Box display="flex" alignItems="center">
                <Image
                  src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${item.images}`}
                  alt=""
                  className="image"
                  borderRadius="full"
                  boxSize="32px"
                  mr="2"
                />
                {item.username}
              </Box>
            </Td>
            <Td>{item.email}</Td>
            <Td>{item.phoneNumber}</Td>
            <Td>{item.status}</Td>
            <Td>{item.age}</Td>
            <Td>
              <Box display="flex" alignItems="center" gap="15px">
                <Box
                  as={Link}
                  to={`/userDetail/${item.id}`}
                  textDecoration="none">
                  <Button colorScheme="teal" variant="outline" size="sm">
                    View
                  </Button>
                </Box>
                <Button
                  className="deleteButton"
                  padding="2px 5px"
                  borderRadius="5px"
                  color="crimson"
                  border="1px dotted rgba(220, 20, 60, 0.6)"
                  cursor="pointer"
                  size="sm"
                  onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
