/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Image,
  Flex,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";
import instagramLogo from "../assets/instagram.png";
import bank_bca from "../assets/metode_pembayaran/bank_bca.png";
import bank_mandiri from "../assets/metode_pembayaran/bank_mandiri.png";
import bank_permata from "../assets/metode_pembayaran/bank_permata.png";
import gopay from "../assets/metode_pembayaran/gopay.png";
import ovo from "../assets/metode_pembayaran/ovo.png";
import shopee from "../assets/metode_pembayaran/shopee.png";
import { MdEmail, MdWifiCalling3 } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}>
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <ListHeader>Contact</ListHeader>
            <Box display="flex" mt="5px">
              <Flex align="center" h="45px" w="45px" justifyContent="center">
                <Icon boxSize="8" as={MdEmail} />
              </Flex>
              <Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold">
                    Email
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm">mi.care-tangerang@gmail.com</Text>
                </Box>
              </Box>
            </Box>
            <Box display="flex" mt="5px">
              <Flex align="center" h="45px" w="45px" justifyContent="center">
                <Icon boxSize="8" as={RiWhatsappFill} />
              </Flex>
              <Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold">
                    Chat WhatsApp
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm">+62 812-8594-8616</Text>
                </Box>
              </Box>
            </Box>
            <Box display="flex" mt="5px">
              <Flex align="center" h="45px" w="45px" justifyContent="center">
                <Icon boxSize="8" as={MdWifiCalling3} />
              </Flex>
              <Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold">
                    Call Center
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm">+021 123-1234-23</Text>
                </Box>
              </Box>
            </Box>
          </Stack>

          <Stack align="flex-start">
            <Box flexWrap="wrap" width="310px">
              <ListHeader>Ikuti Kami</ListHeader>
              <Box display="flex" mt="5px">
                <Link display="flex">
                  <Flex align="center" h="35px" w="40px" color="#3b5998">
                    <Icon boxSize="6" as={FaFacebookF} />
                  </Flex>
                  <Flex align="center">
                    <Box>
                      <Text fontSize="md" fontWeight="bold" color="#3b5998">
                        Facebook
                      </Text>
                    </Box>
                  </Flex>
                </Link>
              </Box>
              <Box display="flex" mt="5px">
                <Link display="flex">
                  <Flex align="center" h="35px" w="40px">
                    <Image src={instagramLogo} width="25px" height="25px" />
                  </Flex>
                  <Flex align="center">
                    <Box>
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        bgClip="text">
                        Instagram
                      </Text>
                    </Box>
                  </Flex>
                </Link>
              </Box>
              <Box display="flex" mt="5px">
                <Link display="flex">
                  <Flex align="center" h="35px" w="40px" color="#1DA1F2">
                    <Icon boxSize="6" as={FaTwitter} />
                  </Flex>
                  <Flex align="center">
                    <Box>
                      <Text fontSize="md" fontWeight="bold" color="#1DA1F2">
                        Twitter
                      </Text>
                    </Box>
                  </Flex>
                </Link>
              </Box>
            </Box>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Legal</ListHeader>
            <Box as="a" href="#">
              Cookies Policy
            </Box>
            <Box as="a" href="#">
              Privacy Policy
            </Box>
            <Box as="a" href="#">
              Terms of Service
            </Box>
            <Box as="a" href="#">
              Law Enforcement
            </Box>
          </Stack>

          <Box flexWrap="wrap" width="200px">
            <ListHeader>Metode Pembayaran</ListHeader>
            <Box mt="10px" display="flex" flexWrap="wrap">
              <Box mr="10px" pt="10px">
                <Image src={bank_bca} width="70px" height="23px" />
              </Box>
              <Box mr="10px">
                <Image src={bank_mandiri} width="100px" height="30px" />
              </Box>
              <Box mr="10px">
                <Image src={bank_permata} width="110px" height="35px" />
              </Box>
              <Box mr="10px" pt="15px">
                <Image src={gopay} width="100px" height="25px" />
              </Box>
              <Box mr="10px" pt="10px">
                <Image src={ovo} width="50px" height="35px" />
              </Box>
              <Box pt="5px">
                <Image src={shopee} width="80px" height="50px" />
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
