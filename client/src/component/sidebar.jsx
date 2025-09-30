import {
  Box,
  Text,
  Link as ChakraLink,
  VStack,
  HStack,
  Divider,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
} from "@chakra-ui/react";
import {
  Dashboard,
  PersonOutline,
  CreditCard,
  Store,
  ExitToApp,
  AccountCircleOutlined,
  Edit,
  Menu,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const data = useSelector((state) => state.adminSlice.value);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        localStorage.removeItem("tokenAdmin");
        navigate("/loginAdmin");
      }
    });
  };

  const isLargerThan700 = window.innerWidth > 700;

  return (
    <>
      {isLargerThan700 ? (
        <Box
          className="sidebar"
          flex="1"
          borderRight="0.5px solid rgb(230, 227, 227)"
          minH="100vh"
          bg="white">
          <Box
            className="top"
            h="50px"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <ChakraLink as={Link} to="/" textDecoration="none">
              <Text fontSize="20px" fontWeight="bold" color="#6439ff">
                Mi Care Admin
              </Text>
            </ChakraLink>
          </Box>
          <Divider />
          <Box className="center" pl="10px">
            <VStack align="start" spacing="20px">
              <Text
                className="title"
                fontSize="20px"
                fontWeight="bold"
                color="#999"
                mt="15px"
                mb="5px">
                MAIN
              </Text>
              <ChakraLink as={Link} to="/homeAdmin" textDecoration="none">
                <HStack>
                  <Dashboard style={{ color: "#7451f8" }} />
                  <Text fontSize="18px" fontWeight="600" color="#888">
                    Dashboard
                  </Text>
                </HStack>
              </ChakraLink>
              <Text
                className="title"
                fontSize="20px"
                fontWeight="bold"
                color="#999"
                mt="15px"
                mb="5px">
                LISTS
              </Text>
              <ChakraLink as={Link} to="/tableUser" textDecoration="none">
                <HStack>
                  <PersonOutline
                    className="icon"
                    style={{ color: "#7451f8" }}
                  />
                  <Text fontSize="18px" fontWeight="600" color="#888">
                    Users
                  </Text>
                </HStack>
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/listProductAdmin"
                textDecoration="none">
                <HStack>
                  <Store className="icon" style={{ color: "#7451f8" }} />
                  <Text fontSize="18px" fontWeight="600" color="#888">
                    Products
                  </Text>
                </HStack>
              </ChakraLink>
              <ChakraLink as={Link} to="/adminListOrder" textDecoration="none">
                <HStack>
                  <CreditCard className="icon" style={{ color: "#7451f8" }} />
                  <Text fontSize="18px" fontWeight="600" color="#888">
                    Orders
                  </Text>
                </HStack>
              </ChakraLink>
              <ChakraLink as={Link} to="/writeBlog" textDecoration="none">
                <HStack>
                  <Edit className="icon" style={{ color: "#7451f8" }} />
                  <Text fontSize="18px" fontWeight="600" color="#888">
                    Write Blog
                  </Text>
                </HStack>
              </ChakraLink>
              <ChakraLink as={Link} to="/registerDoctor" textDecoration="none">
                <HStack>
                  <Edit className="icon" style={{ color: "#7451f8" }} />
                  <Text fontSize="18px" fontWeight="600" color="#888">
                    Add Doctor
                  </Text>
                </HStack>
              </ChakraLink>
              <Text
                className="title"
                fontSize="20px"
                fontWeight="bold"
                color="#999"
                mt="15px"
                mb="5px">
                USER
              </Text>
              <HStack>
                <AccountCircleOutlined
                  className="icon"
                  style={{ color: "#7451f8" }}
                />
                <Text fontSize="18px" fontWeight="600" color="#7451f8">
                  {data.username}
                </Text>
              </HStack>
              <HStack>
                <ExitToApp className="icon" style={{ color: "#7451f8" }} />
                <Box cursor="pointer" onClick={onLogout}>
                  <Text fontSize="18px" fontWeight="600" color="#888">
                    Logout
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
        </Box>
      ) : (
        <>
          <IconButton
            icon={<Menu />}
            aria-label="Open Menu"
            onClick={onOpen}
            display={{ md: "none" }}
          />
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <ChakraLink as={Link} to="/" textDecoration="none">
                    <Text fontSize="20px" fontWeight="bold" color="#6439ff">
                      Mi Care Admin
                    </Text>
                  </ChakraLink>
                </DrawerHeader>
                <DrawerBody>
                  <VStack align="start" spacing="20px">
                    <Text
                      className="title"
                      fontSize="20px"
                      fontWeight="bold"
                      color="#999"
                      mt="15px"
                      mb="5px">
                      MAIN
                    </Text>
                    <ChakraLink as={Link} to="/homeAdmin" textDecoration="none">
                      <HStack>
                        <Dashboard style={{ color: "#7451f8" }} />
                        <Text fontSize="18px" fontWeight="600" color="#888">
                          Dashboard
                        </Text>
                      </HStack>
                    </ChakraLink>
                    {/* Rest of your links */}
                    <Text
                      className="title"
                      fontSize="20px"
                      fontWeight="bold"
                      color="#999"
                      mt="15px"
                      mb="5px">
                      USER
                    </Text>
                    <HStack>
                      <AccountCircleOutlined
                        className="icon"
                        style={{ color: "#7451f8" }}
                      />
                      <Text fontSize="18px" fontWeight="600" color="#7451f8">
                        {data.username}
                      </Text>
                    </HStack>
                    <HStack>
                      <ExitToApp
                        className="icon"
                        style={{ color: "#7451f8" }}
                      />
                      <Box cursor="pointer" onClick={onLogout}>
                        <Text fontSize="18px" fontWeight="600" color="#888">
                          Logout
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Sidebar;
