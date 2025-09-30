import {
  Button,
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import Sidebar from "../../component/sidebar";
import ListProduct from "../../component/listProduct";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ListProductAdmin() {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState(null);
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
  const inputCategoryId = useRef(null);
  const editProduct = async () => {
    try {
      if (
        !inputName.current.value ||
        !inputPrice.current.value ||
        !inputDescription.current.value ||
        !inputComposition.current.value ||
        !inputDosis.current.value ||
        !inputContraIndikasi.current.value ||
        !inputEfekSamping.current.value ||
        !inputKemasan.current.value ||
        !inputManufaktur.current.value ||
        !inputNoRegistrasi.current.value ||
        !inputCategoryId.current.value
      ) {
        setFormError("Please fill out all the fields.");
        return;
      }

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
      formData.append("CategoryId", inputCategoryId.current.value);

      const createdData = await axios.post(
        `https://84j2gl1l-2000.asse.devtunnels.ms/product/addProduct`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Ubah Data",
        text: "Sukses Tambah Produk",
        timer: 2000,
      });
      closeEditModal(createdData);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(
        "https://84j2gl1l-2000.asse.devtunnels.ms/product/category"
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };
  return (
    <>
      <Flex className="home">
        <Sidebar />
        <Box className="homeContainer" flex="6">
          <Box className="listContainer" boxShadow="md" padding={4} margin={4}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              marginBottom="2rem">
              <Box display="flex" fontWeight="500" color="gray">
                Lists -
                <Text ml="2px" color="#6439ff">
                  Products
                </Text>
              </Box>
              <Button
                colorScheme="teal"
                size="sm"
                _hover={{ bg: "teal.400" }}
                _active={{ bg: "teal.500" }}
                onClick={openEditModal}>
                Tambah Produk
              </Button>
            </Flex>
            <ListProduct />
          </Box>
        </Box>
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
                <Input placeholder="Nama Produk" ref={inputName} />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>Harga</FormLabel>
                <Input placeholder="IDR" ref={inputPrice} />
              </FormControl>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Deskripsi</FormLabel>
                <Input placeholder="Deskripsi" ref={inputDescription} />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>Komposisi</FormLabel>
                <Input placeholder="Komposisi" ref={inputComposition} />
              </FormControl>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Dosis</FormLabel>
                <Input placeholder="Dosis" ref={inputDosis} />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>Kontra Indikasi</FormLabel>
                <Input
                  placeholder="Kontra Indikasi"
                  ref={inputContraIndikasi}
                />
              </FormControl>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Efek Samping</FormLabel>
                <Input placeholder="Efek Samping" ref={inputEfekSamping} />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>Kemasan</FormLabel>
                <Input placeholder="Kemasan" ref={inputKemasan} />
              </FormControl>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" gap="20px">
              <FormControl flex="1">
                <FormLabel>Manufaktur</FormLabel>
                <Input placeholder="Manufaktur" ref={inputManufaktur} />
              </FormControl>
              <FormControl flex="1">
                <FormLabel>No Registrasi</FormLabel>
                <Input placeholder="No Registrasi" ref={inputNoRegistrasi} />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel color="#285430">Category </FormLabel>
              <Select
                color={"#285430"}
                borderColor="#285430"
                width="100%"
                ref={inputCategoryId}>
                <option>Select Category</option>
                {data?.map((item) => {
                  return (
                    <>
                      <option color="#285430" value={item.id}>
                        {item.categoryName}
                      </option>
                    </>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Gambar Produk</FormLabel>
              <Input type="file" ref={inputImages} />
            </FormControl>
            {formError && <Text color="red">{formError}</Text>}
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
