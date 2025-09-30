import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { syncDataProductAdmin } from "../redux/productAdminSlice";

export default function ListProduct() {
  const data = useSelector((state) => state.productAdminSlice.value);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const inputImages = useRef(null);
  const inputName = useRef(null);
  const inputPrice = useRef(null);
  const inputDescription = useRef(null);
  const inputComposition = useRef(null);
  const inputDosis = useRef(null);
  const inputContraIndikasi = useRef(null);
  const inputEfekSamping = useRef(null);
  const inputKemasan = useRef(null);
  const inputManufaktur = useRef(null);
  const inputNoRegistrasi = useRef(null);

  const editProduct = async () => {
    try {
      const formData = new FormData();

      if (inputImages.current.files[0]) {
        formData.append("images", inputImages.current.files[0]);
      }

      formData.append("name", inputName.current.value);
      formData.append("price", inputPrice.current.value);
      formData.append("description", inputDescription.current.value);
      formData.append("composition", inputComposition.current.value);
      formData.append("dosis", inputDosis.current.value);
      formData.append("contra", inputContraIndikasi.current.value);
      formData.append("effect", inputEfekSamping.current.value);
      formData.append("sachet", inputKemasan.current.value);
      formData.append("manufacture", inputManufaktur.current.value);
      formData.append("registration", inputNoRegistrasi.current.value);

      const editDataProduct = await axios.patch(
        `https://84j2gl1l-2000.asse.devtunnels.ms/product/editProduct/${editingItemId}`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Ubah Data",
        text: "Sukses Ubah Data",
        timer: 2000,
      });
      closeEditModal(editDataProduct);
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (itemId) => {
    setEditingItemId(itemId);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setEditingItemId(null);
    setIsEditing(false);
  };

  const formatIDRCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTimestamp = (timestamp, timeZone) => {
    const options = {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(timestamp)
    );
  };

  const timeZone = "UTC";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://84j2gl1l-2000.asse.devtunnels.ms/product/delete/${id}`
      );
      dispatch(syncDataProductAdmin(res.data));
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Produk Berhasil Di Delete.",
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
    <>
      <Table variant="simple" className="table">
        <Thead>
          <Tr>
            <Th>No Id</Th>
            <Th>Product</Th>
            <Th>price</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData?.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>
                <Box display="flex" alignItems="center">
                  <Image
                    src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${item.images}`}
                    className="image"
                    borderRadius="full"
                    boxSize="32px"
                    mr="2"
                  />
                  {item.name}
                </Box>
              </Td>
              <Td>{formatIDRCurrency(item.price)}</Td>
              <Td>{formatTimestamp(item.updatedAt, timeZone)}</Td>
              <Td>
                <Box display="flex" alignItems="center" gap="15px">
                  <Box
                    as={Link}
                    to={`/productDetail/${item.id}`}
                    textDecoration="none">
                    <Button colorScheme="teal" variant="outline" size="sm">
                      View
                    </Button>
                  </Box>
                  <Button
                    colorScheme="yellow"
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(item.id)}>
                    Update
                  </Button>
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
      <Flex justifyContent="center" alignItems="center" mt="20px" mb="20px">
        <Button
          width="100px"
          mr="2"
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }>
          Sebelumnya
        </Button>
        {data && (
          <Text>
            Halaman {currentPage} of {Math.ceil(data.length / itemsPerPage)}
          </Text>
        )}
        <Button
          width="100px"
          ml="2"
          onClick={() =>
            handlePageChange(
              currentPage < Math.ceil(data.length / itemsPerPage)
                ? currentPage + 1
                : currentPage
            )
          }>
          Selanjutnya
        </Button>
      </Flex>
      <Modal isOpen={isEditing} onClose={closeEditModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ubah Produk</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Nama</FormLabel>
                <Input
                  placeholder="Nama Produk"
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)?.name || ""
                  }
                  ref={inputName}
                />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>Harga</FormLabel>
                <Input
                  placeholder="IDR"
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)?.price || ""
                  }
                  ref={inputPrice}
                />
              </FormControl>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Deskripsi</FormLabel>
                <Input
                  placeholder="Deskripsi"
                  ref={inputDescription}
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)
                      ?.description || ""
                  }
                />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>Komposisi</FormLabel>
                <Input
                  placeholder="Komposisi"
                  ref={inputComposition}
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)
                      ?.composition || ""
                  }
                />
              </FormControl>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Dosis</FormLabel>
                <Input
                  placeholder="Dosis"
                  ref={inputDosis}
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)?.dosis || ""
                  }
                />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>Kontra Indikasi</FormLabel>
                <Input
                  placeholder="Kontra Indikasi"
                  ref={inputContraIndikasi}
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)?.contra ||
                    ""
                  }
                />
              </FormControl>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Efek Samping</FormLabel>
                <Input
                  placeholder="Efek Samping"
                  ref={inputEfekSamping}
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)?.effect ||
                    ""
                  }
                />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>Kemasan</FormLabel>
                <Input
                  placeholder="Kemasan"
                  ref={inputKemasan}
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)?.sachet ||
                    ""
                  }
                />
              </FormControl>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Manufaktur</FormLabel>
                <Input
                  placeholder="Manufaktur"
                  ref={inputManufaktur}
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)
                      ?.manufacture || ""
                  }
                />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>No Registrasi</FormLabel>
                <Input
                  placeholder="No Registrasi"
                  ref={inputNoRegistrasi}
                  defaultValue={
                    data?.find((item) => item.id === editingItemId)
                      ?.registration || ""
                  }
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel>Gambar Produk</FormLabel>
              <Input type="file" ref={inputImages} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={editProduct}>
              Save
            </Button>
            <Button variant="ghost" border="1px" onClick={closeEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
