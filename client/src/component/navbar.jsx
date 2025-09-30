/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Register } from "./register";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  PopoverFooter,
  ButtonGroup,
  Badge,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Image,
  FormControl,
  Input,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  FormLabel,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, delCart } from "../redux/userSlice";
import { cartSync, cartDel } from "../redux/cartSlice";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Link } from "react-router-dom";
import { loanDel, loanSync } from "../redux/loanSlice";
import logo from "../assets/MiCare.png";

const url = "http://localhost:2000/user/login";

export default function Navbar() {
  const { id, username, isVerified, profilePic, cart, email } = useSelector(
    (state) => state.userSlice.value
  );
  const data = useSelector((state) => state.cartSlice.value);

  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const tokenlocalstorage = localStorage.getItem("token");
  const dispatch = useDispatch();
  const inputEmail = useRef("");
  const inputPASS = useRef("");

  const onLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin keluar?",
      text: "Anda akan keluar dari akun Anda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Tidak, Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        dispatch(cartDel());
        dispatch(loanDel());
        localStorage.removeItem("token");
      }
    });
  };

  const onLogin = async () => {
    try {
      const user = {
        password: inputPASS.current.value,
        email: inputEmail.current.value,
      };

      const result = await Axios.post(url, user);

      const res = await Axios.get(
        `http://localhost:2000/cart/${result.data.isUserExist.id}`
      );
      dispatch(cartSync(res.data));

      dispatch(
        login({
          id: result.data.isUserExist.id,
          username: result.data.isUserExist.username,
          email: result.data.isUserExist.email,
          isVerified: result.data.isUserExist.isVerified,
          phoneNumber: result.data.isUserExist.phoneNumber,
          images: result.data.isUserExist.images,
          age: result.data.isUserExist.age,
          cart: res.data.length,
        })
      );

      localStorage.setItem("token", result.data.token);

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

  const onDeleteCart = async (cartItemId) => {
    try {
      await Axios.delete(`http://localhost:2000/cart/${cartItemId}`);

      // Re-fetch the entire cart for the current user
      const updatedCartResponse = await Axios.get(
        `http://localhost:2000/cart/${id}`
      );

      dispatch(cartSync(updatedCartResponse.data));

      // Update the cart count in the userSlice
      dispatch(
        login({
          id: id,
          username: username,
          email: email,
          isVerified: isVerified,
          phoneNumber: null, // Ensure to pass existing phoneNumber if applicable
          images: profilePic, // Ensure to pass existing profilePic if applicable
          age: null, // Ensure to pass existing age if applicable
          cart: updatedCartResponse.data.length,
        })
      );
    } catch (err) {
      console.error("Error deleting item from cart:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menghapus item dari keranjang.",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const formatIDRCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const changePassword = async () => {
    try {
      const result = await Axios.post(
        `http://localhost:2000/user/changePassword/${id}`,
        {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      closeChangePasswordModal();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kata Sandi Anda Berhasil Diubah",
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      closeChangePasswordModal();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}>
          <Flex
            as={Link}
            to="/"
            flex={{ base: 1 }}
            justify={{ md: "start" }}
            align="center">
            <Image
              src={logo}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              w="90px"
              h="90px"
            />
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Button
            onClick={toggleColorMode}
            bg={useColorModeValue("white", "gray.800")}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Popover isLazy>
            <PopoverTrigger>
              <Button bg={useColorModeValue("white", "gray.800")}>
                <Icon boxSize="6" as={IoCartOutline} mr="5px" x />
                {username && cart !== 0 ? (
                  <Badge
                    p="1"
                    ml="-2"
                    mt="-3"
                    w="17px"
                    h="17px"
                    borderRadius={"100%"}
                    bg="red">
                    <Text fontSize="xx-small" color="white">
                      {cart}
                    </Text>
                  </Badge>
                ) : null}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">
                Keranjang Saya
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <TableContainer bg="grey.100">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Gambar</Th>
                        <Th>Nama</Th>
                        <Th>Harga</Th>
                        <Th>Aksi</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.map((item, index) => {
                        return (
                          <Tr key={index}>
                            <Td>
                              <Stack>
                                <Image
                                  boxSize="35px"
                                  objectFit="cover"
                                  src={`http://localhost:2000/public/${item.Product.images}`}
                                />
                              </Stack>
                            </Td>
                            <Td>
                              <Box display="flex" fontSize="xs">
                                <Text fontWeight="bold" mr="5px">
                                  {item.Product.name}
                                </Text>
                              </Box>
                            </Td>
                            <Td>
                              <Box display="flex" fontSize="xs">
                                <Text
                                  fontWeight="bold"
                                  color="#213360"
                                  textColor="#FF6B6B"
                                  mr="5px">
                                  {formatIDRCurrency(item.Product.price)}
                                </Text>
                              </Box>
                            </Td>
                            <Td>
                              <Button onClick={() => onDeleteCart(item.id)}>
                                <Icon boxSize="4" as={DeleteIcon} />
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button as={Link} to="/cart" bg="teal.400" color={"white"}>
                    Selengkapnya
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          {tokenlocalstorage ? (
            <Menu>
              <MenuButton
                display={{ base: "none", md: "inline-flex" }}
                as={Button}
                rounded={"full"}
                cursor={"pointer"}
                minW={0}
                p="6">
                <Flex align="center">
                  <Avatar size="sm" name={username} src={profilePic} />
                  <Box ml="3">
                    <Text fontWeight="bold">{username}</Text>
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList alignItems={"center"}>
                <MenuItem onClick={onLogout}>Log Out</MenuItem>
                <MenuItem onClick={openChangePasswordModal}>
                  Change Password
                </MenuItem>
                {isVerified ? "" : <MenuItem>Verifikasi Akun</MenuItem>}
              </MenuList>
            </Menu>
          ) : (
            <Stack
              display={{ base: "none", md: "inline-flex" }}
              justify={"flex-end"}
              direction={"row"}>
              <FormControl id="Email">
                <Input type="text" placeholder="Email" ref={inputEmail} />
              </FormControl>
              <FormControl id="Password">
                <Input type="password" placeholder="Password" ref={inputPASS} />
              </FormControl>

              <Button w="40" fontSize={"sm"} fontWeight={600} onClick={onLogin}>
                Sign In
              </Button>
              <Register />
            </Stack>
          )}
          <Flex display={{ base: "flex", md: "none" }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
      <Modal
        isOpen={isChangePasswordModalOpen}
        onClose={closeChangePasswordModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ubah Kata Sandi </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex minH={"50vh"} align={"center"} justify={"center"}>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                  Masukan Kata Sandi Baru
                </Heading>
                <FormControl id="email" isRequired>
                  <FormLabel>Masukan ALamat Email</FormLabel>
                  <Input
                    placeholder="your-email@example.com"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    value={email}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Kata Sandi Lama</FormLabel>
                  <Input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Kata Sandi Baru</FormLabel>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    bg={"teal.400"}
                    color={"white"}
                    _hover={{
                      bg: "grey",
                    }}
                    onClick={changePassword}>
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  p={2}
                  to={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    </>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("teal.400", "gray.900") }}>
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "teal.400" }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}>
          <Icon color={"teal.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const { id, username, isVerified, profilePic, cart, email } = useSelector(
    (state) => state.userSlice.value
  );
  const data = useSelector((state) => state.cartSlice.value);

  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const tokenlocalstorage = localStorage.getItem("token");
  const dispatch = useDispatch();
  const inputEmail = useRef("");
  const inputPASS = useRef("");

  const onLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin keluar?",
      text: "Anda akan keluar dari akun Anda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Tidak, Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        dispatch(cartDel());
        dispatch(loanDel());
        localStorage.removeItem("token");
      }
    });
  };

  const onLogin = async () => {
    try {
      const user = {
        password: inputPASS.current.value,
        email: inputEmail.current.value,
      };

      const result = await Axios.post(url, user);

      const res = await Axios.get(
        `http://localhost:2000/cart/${result.data.isUserExist.id}`
      );
      dispatch(cartSync(res.data));

      dispatch(
        login({
          id: result.data.isUserExist.id,
          username: result.data.isUserExist.username,
          email: result.data.isUserExist.email,
          isVerified: result.data.isUserExist.isVerified,
          phoneNumber: result.data.isUserExist.phoneNumber,
          images: result.data.isUserExist.images,
          age: result.data.isUserExist.age,
          cart: res.data.length,
        })
      );

      localStorage.setItem("token", result.data.token);

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

  const onDeleteCart = async (cartItemId) => {
    try {
      await Axios.delete(`http://localhost:2000/cart/${cartItemId}`);

      // Re-fetch the entire cart for the current user
      const updatedCartResponse = await Axios.get(
        `http://localhost:2000/cart/${id}`
      );

      dispatch(cartSync(updatedCartResponse.data));

      // Update the cart count in the userSlice
      dispatch(
        login({
          id: id,
          username: username,
          email: email,
          isVerified: isVerified,
          phoneNumber: null, // Ensure to pass existing phoneNumber if applicable
          images: profilePic, // Ensure to pass existing profilePic if applicable
          age: null, // Ensure to pass existing age if applicable
          cart: updatedCartResponse.data.length,
        })
      );
    } catch (err) {
      console.error("Error deleting item from cart:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menghapus item dari keranjang.",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const formatIDRCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const changePassword = async () => {
    try {
      const result = await Axios.post(
        `http://localhost:2000/user/changePassword/${id}`,
        {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      closeChangePasswordModal();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kata Sandi Anda Berhasil Diubah",
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      closeChangePasswordModal();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <>
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        pr={4}
        pl={4}
        display={{ md: "none" }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}

        {tokenlocalstorage ? (
          <Menu>
            <MenuButton>
              <Flex>
                <Avatar size="sm" name={username} src={profilePic} />
                <Box ml="3">
                  <Text fontWeight="bold">{username}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList alignItems={"center"}>
              <MenuItem onClick={onLogout}>Log Out</MenuItem>
              <MenuItem onClick={openChangePasswordModal}>
                Change Password
              </MenuItem>
              {isVerified ? "" : <MenuItem>Verifikasi Akun</MenuItem>}
            </MenuList>
          </Menu>
        ) : (
          <Stack justify={"flex-end"}>
            <FormControl id="Email">
              <Input type="text" placeholder="Email" ref={inputEmail} />
            </FormControl>
            <FormControl id="Password">
              <Input type="password" placeholder="Password" ref={inputPASS} />
            </FormControl>

            <Stack direction="row">
              <Button fontSize={"sm"} fontWeight={600} onClick={onLogin}>
                Sign In
              </Button>
              <Register />
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? "#"}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Stack
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align={"start"}>
            {children &&
              children.map((child) => (
                <Link key={child.label} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    </>
  );
};

const NAV_ITEMS = [
  {
    label: "Artikel",
    href: "/blog",
  },
  {
    label: "Transaksi",
    href: "/transaksi",
  },
  {
    label: "Profil",
    href: "/profile",
  },
  {
    label: "Pesan",
    href: "/message",
  },
];
