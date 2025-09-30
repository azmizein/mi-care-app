/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Box,
  Text,
  Button,
  Icon,
  Tooltip,
  Image,
  Divider,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import { FaShippingFast, FaTrashAlt } from "react-icons/fa";
import { delCart } from "../redux/userSlice";
import { cartSync } from "../redux/cartSlice";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { setStatus } from "../redux/statusSlice";
import { EditIcon, InfoOutlineIcon } from "@chakra-ui/icons";

export default function CartDetail() {
  const dispatch = useDispatch();
  const url = "https://84j2gl1l-2000.asse.devtunnels.ms/transaction";
  const [snap, setSnap] = useState(null);
  const [courier, setCourier] = useState("");
  const [shippingCost, setShippingCost] = useState(null);
  const [addressData, setAddressData] = useState("");
  const [selectedShippingCost, setSelectedShippingCost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectCity, setSelectCity] = useState(0);
  const [selectProvince, setSelectProvince] = useState(0);
  const inputAddressFill = useRef("");
  const inputDistrict = useRef("");
  const inputPostal = useRef("");
  const data = useSelector((state) => state.cartSlice.value);
  const { id, username, email, phoneNumber } = useSelector(
    (state) => state.userSlice.value
  );

  /// Midtrans
  useEffect(() => {
    const snapScript = document.createElement("script");

    snapScript.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    snapScript.async = true;
    snapScript.onload = () => {
      if ("snap" in window) {
        const { snap } = window;
        setSnap(snap);
      }
    };
    snapScript.dataset.clientKey = "SB-Mid-client-5giWJrCY5bo_j3S0";
    document.head.appendChild(snapScript);

    return () => {
      document.head.removeChild(snapScript);
    };
  }, []);

  /// Format Indonesia Rupiah
  const formatIDRCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  /// Process Button
  const process = async () => {
    try {
      let date = new Date();
      date.setDate(date.getDate() + 5);
      let tahun = date.getFullYear();
      const uuid = uuidv4();
      const numberInv = `MC-${uuid}/${tahun}`;
      const total = getTotalCartCost();
      const dataPay = {
        name: username,
        id: numberInv,
        email: email,
        total,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await Axios.post(
        "https://84j2gl1l-2000.asse.devtunnels.ms/payment/paymentReq",
        dataPay,
        config
      );

      if (snap) {
        const { token } = response.data;

        snap.pay(token, {
          onSuccess: async function (result) {
            console.log("Payment success:", result);
            const status = result.transaction_status;
            const noInvoice = result.order_id;

            const res = await Axios.post(url, {
              total: getTotalCartCost(),
              id,
              data,
              noInvoice,
              status,
            });
            dispatch(setStatus(res.data));
            console.log(res);
            window.location.href = "/transaksi";
          },
          onPending: async function (result) {
            console.log("Payment pending:", result);
            const status = result.transaction_status;
            const noInvoice = result.order_id;

            const res = await Axios.post(url, {
              total: getTotalCartCost(),
              id,
              data,
              noInvoice,
              status,
            });
            dispatch(setStatus(res.data));
            console.log(res.data);
            window.location.href = "/transaksi";
          },
          onError: function (result) {
            console.error("Payment error:", result);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /// Delete Cart
  const onDeleteCart = async (id) => {
    try {
      await Axios.delete(`https://84j2gl1l-2000.asse.devtunnels.ms/cart/${id}`);
      const result = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/cart/${id}`
      );
      dispatch(delCart());
      dispatch(cartSync(result.data));
      window.location.pathname = "/cart";
    } catch (err) {
      console.log(err);
    }
  };

  /// Quantity
  const [productQuantities, setProductQuantities] = useState(
    data.reduce((quantities, item) => {
      quantities[item.id] = 1;
      return quantities;
    }, {})
  );

  const calculateTotalCost = (quantity, price) => {
    return quantity * price;
  };

  const getTotalCartCost = () => {
    let totalCost = 0;
    data.forEach((item) => {
      const quantity = productQuantities[item.id] || 1;
      totalCost += calculateTotalCost(quantity, item.Product.price);
    });

    if (selectedShippingCost) {
      totalCost += Number(selectedShippingCost);
    }
    return totalCost;
  };

  const onIncreaseQuantity = (id) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const onDecreaseQuantity = (id) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 1),
    }));
  };

  const origin = "501";

  const handleCalculateShipping = async () => {
    if (!courier || !addressData?.cityId) {
      Swal.fire({
        icon: "warning",
        title: "Perhatian",
        text: "Mohon pilih kurir dan pastikan alamat pengiriman sudah diisi.",
        timer: 2000,
      });
      return;
    }

    try {
      const response = await Axios.post(
        "https://84j2gl1l-2000.asse.devtunnels.ms/payment/shipping",
        {
          origin,
          destination: addressData?.cityId,
          courier,
        }
      );

      setShippingCost(response.data.rajaongkir.results[0].costs);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${
          err.response.data.error || "Gagal menghitung biaya pengiriman."
        }`,
        timer: 1000,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  /// Address
  const getDataAddress = async () => {
    try {
      const result = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/user/getAddress/${id}`
      );
      setAddressData(result.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getDataAddress();
    }
  }, [id]);

  /// Shipping
  const handleSelectChange = (event) => {
    setSelectedShippingCost(event.target.value);
  };

  const getProvince = async () => {
    try {
      const response = await Axios.get(
        "https://84j2gl1l-2000.asse.devtunnels.ms/payment/province"
      );
      setProvince(response.data.cities);
    } catch (err) {
      console.log(err);
    }
  };

  const rendProvince = () => {
    return province.map((valProp) => {
      return (
        <option
          value={valProp.province_id}
          key={valProp.province_id.toString()}>
          {valProp.province}
        </option>
      );
    });
  };

  const getCity = async () => {
    try {
      if (selectProvince) {
        // Only fetch cities if a province is selected
        const response = await Axios.get(
          `https://84j2gl1l-2000.asse.devtunnels.ms/payment/city/${selectProvince}`
        );
        setCity(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const rendCity = () => {
    return Array.from(city).map((valueProp, i) => {
      return (
        <option value={valueProp.city_id} key={i}>
          {valueProp.type + " "} {valueProp.city_name}
        </option>
      );
    });
  };

  const provinceHandle = ({ target }) => {
    const { value } = target;
    setSelectProvince(value);
    setSelectCity(0);
    setCity([]);
  };

  const cityHandle = ({ target }) => {
    const { value } = target;
    setSelectCity(value);
  };

  useEffect(() => {
    getProvince();
  }, []);

  useEffect(() => {
    getCity();
  }, [selectProvince]);

  /// Create alamat
  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const InfoRow = ({ label, value, direction = "row" }) => (
    <Flex
      justify="space-between"
      align="center"
      py={1}
      direction={direction}
      wrap="wrap">
      <Text
        fontWeight="medium"
        color="gray.600"
        mr={direction === "row" ? 2 : 0}>
        {" "}
        {/* Add right margin if row */}
        {label}:
      </Text>
      <Text fontWeight="semibold" color="gray.800" flex="1">
        {" "}
        {/* Allow text to take remaining space */}
        {value}
      </Text>
    </Flex>
  );

  const editProfile = async () => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Tidak Ada Akses",
        text: "Perlu Login Terlebih Dahulu",
      });
      closeEditModal();
      return;
    }

    try {
      const editData = {
        address: inputAddressFill.current.value,
        city: selectCity,
        district: inputDistrict.current.value,
        province: selectProvince,
        postal_code: inputPostal.current.value,
        UserId: id,
      };

      const editAddress = await Axios.post(
        `https://84j2gl1l-2000.asse.devtunnels.ms/user/createAddress/${id}`,
        editData
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Sukses Masukan Alamat",
        timer: 2000,
      });

      console.log(editAddress);
      closeEditModal();
      window.location.reload(); // Reload to reflect new address
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menyimpan alamat.",
        timer: 2000,
      });
    }
  };

  return (
    <Box>
      <Flex
        justifyContent="center"
        flexWrap={{ base: "wrap", md: "nowrap" }}
        mb="30px"
        mt="20px"
        alignItems="flex-start">
        <Box
          bg={useColorModeValue("teal.50", "teal.800")}
          p={6}
          w={{ base: "100%", md: "22vw" }}
          mx={4}
          mt={4}
          h={"65vh"}
          borderRadius="lg"
          boxShadow="lg"
          border="1px solid"
          borderColor="teal.200"
          flexShrink={0}>
          <Flex align="center" mb={4}>
            <Icon as={InfoOutlineIcon} color="teal.500" boxSize={5} mr={2} />
            <Text fontSize="xl" fontWeight="bold">
              Keterangan
            </Text>
          </Flex>

          {/* Info Pengguna */}
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Informasi Pengguna
            </Text>
            <InfoRow label="Nama" value={username || "-"} />
            <InfoRow label="Email" value={email || "-"} />
            <InfoRow label="Telepon" value={phoneNumber || "-"} />
          </Box>

          {/* Alamat */}
          <Box mb={4}>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Alamat Pengiriman
              </Text>
              <Button
                onClick={openEditModal}
                size="xs"
                variant="ghost"
                leftIcon={<EditIcon />}
                colorScheme="teal"
                _hover={{ bg: "teal.100" }}>
                Ubah
              </Button>
            </Flex>
            <Text mt={2} fontWeight="semibold" color="gray.700" fontSize="sm">
              {addressData
                ? `${addressData.addressFill}, ${addressData.district}, ${addressData.city}, ${addressData.province}. ${addressData.postal_code}`
                : "Masukkan alamat terlebih dahulu"}
            </Text>
          </Box>

          <Divider my={4} />

          {/* Pilih Kurir */}
          <Box>
            <Flex align="center" mb={2}>
              <Icon as={FaShippingFast} color="teal.500" boxSize={5} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                Pengiriman
              </Text>
            </Flex>

            <FormControl mb={4}>
              <FormLabel fontWeight="medium" color="gray.700">
                Kurir
              </FormLabel>
              <Select
                placeholder="Pilih Layanan"
                value={courier}
                onChange={(e) => setCourier(e.target.value)}
                bg="white"
                _hover={{ borderColor: "teal.500" }}
                focusBorderColor="teal.500">
                <option value="jne">JNE</option>
                <option value="tiki">TIKI</option>
                <option value="pos">POS</option>
              </Select>
            </FormControl>

            <Button
              onClick={handleCalculateShipping}
              colorScheme="teal"
              size="sm"
              width="full"
              mt={1}
              mb={4}>
              Cari Biaya Pengiriman
            </Button>

            {shippingCost && (
              <FormControl mb={4}>
                <FormLabel fontWeight="medium" color="gray.700">
                  Pilih Biaya Pengiriman
                </FormLabel>
                <Select
                  value={selectedShippingCost}
                  onChange={handleSelectChange}
                  bg="white"
                  _hover={{ borderColor: "teal.500" }}
                  focusBorderColor="teal.500">
                  <option value="">Pilih Biaya</option>
                  {shippingCost.map((cost) => (
                    <option key={cost.service} value={cost.cost[0].value}>
                      {cost.service}: {formatIDRCurrency(cost.cost[0].value)},{" "}
                      {cost.cost[0].etd} Hari
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        </Box>

        {/* Section cart and summary payment */}
        <Flex
          direction="column"
          w={{ base: "100%", md: "55vw" }}
          mx={4}
          mt={4}
          boxShadow="md"
          borderWidth="1px"
          borderRadius="10px">
          {/* Cart Items List (Scrollable) */}
          <Box p="25px" h="65vh" overflowY="scroll">
            {data.length === 0 ? (
              <Box align="center">
                <Image
                  src="https://media.giphy.com/media/2C6v4QD5d3YOO4YhID/giphy.gif"
                  objectFit="contain"
                  w="400px"
                  h="300px"
                />
                <Text textAlign="center" fontWeight="bold">
                  Keranjang anda kosong
                </Text>
                <Text
                  as={Link}
                  to="/"
                  textAlign="center"
                  fontWeight="bold"
                  color="teal.400"
                  w="150px"
                  _hover={{ cursor: "pointer", textDecoration: "underline" }}>
                  Beli Sekarang
                </Text>
              </Box>
            ) : (
              <>
                {data.map((item) => {
                  const quantity = productQuantities[item.id] || 1;
                  const totalCost = calculateTotalCost(
                    quantity,
                    item.Product.price
                  );
                  return (
                    <Box
                      key={item.id}
                      boxShadow="sm"
                      borderWidth="1px"
                      borderRadius="10px"
                      mb="20px"
                      p="10px"
                      _hover={{ boxShadow: "lg" }}>
                      <Flex justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center">
                          <Box
                            minW="100px"
                            minH="100px"
                            overflow="hidden"
                            borderWidth="1px"
                            borderRadius="md">
                            <Link to={`/detail/${item.Product.id}`}>
                              <Image
                                objectFit="cover"
                                src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${item.Product.images}`}
                                width="100px"
                                height="100px"
                              />
                            </Link>
                          </Box>
                          <Box ml={{ base: "15px", md: "30px" }}>
                            <Link to={`/detail/${item.Product.id}`}>
                              <Text fontWeight="semibold">
                                {item.Product.name}
                              </Text>
                              <Text
                                fontWeight="semibold"
                                fontSize="small"
                                color="pink.400">
                                {formatIDRCurrency(totalCost)}
                              </Text>
                            </Link>
                          </Box>
                        </Box>
                        <Flex alignItems="center">
                          <Button
                            variant="ghost"
                            colorScheme="pink"
                            size="sm"
                            onClick={() => onDecreaseQuantity(item.id)}
                            _hover={{ bg: "pink.50" }}>
                            -
                          </Button>
                          <Text fontWeight="semibold" fontSize="small" mx={2}>
                            {quantity}
                          </Text>
                          <Button
                            variant="ghost"
                            colorScheme="pink"
                            size="sm"
                            onClick={() => onIncreaseQuantity(item.id)}
                            _hover={{ bg: "pink.50" }}>
                            +
                          </Button>
                          <Tooltip label="Hapus Dari Keranjang" fontSize="sm">
                            <Button
                              variant="ghost"
                              colorScheme="red"
                              size="sm"
                              ml={2}
                              onClick={() => onDeleteCart(item.id)}
                              _hover={{ bg: "red.50" }}>
                              <Icon boxSize={4} as={FaTrashAlt} />
                            </Button>
                          </Tooltip>
                        </Flex>
                      </Flex>
                      <Divider my="20px" />
                    </Box>
                  );
                })}
              </>
            )}
          </Box>

          {/* Payment summary dan tombol */}
          {data.length > 0 && (
            <Box
              p="25px"
              borderTopWidth="1px"
              borderColor="gray.200"
              bg={useColorModeValue("white", "gray.700")}>
              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Text fontSize="xl" fontWeight="bold">
                  Total Biaya Belanja:
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="teal.600">
                  {formatIDRCurrency(getTotalCartCost())}
                </Text>
              </Flex>
              <Button
                colorScheme="teal"
                size="lg"
                width="full"
                onClick={process}
                isDisabled={data.length === 0 || !selectedShippingCost}>
                Lanjutkan Pembayaran
              </Button>
            </Box>
          )}
        </Flex>
      </Flex>

      {/* Alamat Edit Modal */}
      <Modal isOpen={isEditing} onClose={closeEditModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Masukan Alamat</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={3}>
              <FormLabel>Alamat Lengkap</FormLabel>
              <Input
                ref={inputAddressFill}
                placeholder="Jalan, Nomor Rumah, RT/RW"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Kecamatan</FormLabel>
              <Input ref={inputDistrict} placeholder="Kecamatan" />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Provinsi</FormLabel>
              <Select
                placeholder="Pilih Provinsi"
                onChange={provinceHandle}
                value={selectProvince || ""}>
                {rendProvince()}
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Kota/Kabupaten</FormLabel>
              <Select
                placeholder="Pilih Kota/Kabupaten"
                onChange={cityHandle}
                value={selectCity || ""}
                isDisabled={!selectProvince}>
                {rendCity()}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Kode Pos</FormLabel>
              <Input ref={inputPostal} placeholder="Contoh: 12345" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={editProfile}>
              Simpan Alamat
            </Button>
            <Button variant="ghost" onClick={closeEditModal}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
