import { Box, Heading, IconButton, Text, Flex, Icon } from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Featured = () => {
  return (
    <Box
      className="featured"
      flex="3"
      boxShadow="md"
      p="10px"
      borderRadius="md"
      mb="20px">
      <Flex justify="space-between" align="center" color="gray">
        <Heading fontSize="lg" fontWeight="500" className="title">
          Total Revenue
        </Heading>
        <IconButton
          aria-label="More Options"
          icon={<Icon as={MdMoreVert} fontSize="md" />}
        />
      </Flex>
      <Box
        className="bottom"
        p="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="15px">
        <Box className="featuredChart" w="100px" h="100px">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </Box>
        <Text className="title" fontWeight="500" color="gray">
          Total sales made today
        </Text>
        <Text className="amount" fontSize="3xl">
          $420
        </Text>
        <Text
          className="desc"
          fontWeight="300"
          fontSize="sm"
          color="gray"
          textAlign="center">
          Previous transactions processing. Last payments may not be included.
        </Text>
        <Flex className="summary" w="100%" justify="space-between">
          <Box className="item" textAlign="center">
            <Text className="itemTitle" fontSize="sm" color="gray">
              Target
            </Text>
            <Flex
              className="itemResult positive"
              alignItems="center"
              mt="10px"
              fontSize="sm"
              color="green">
              <Icon as={MdKeyboardArrowDown} fontSize="sm" />
              <Text className="resultAmount">$12.4k</Text>
            </Flex>
          </Box>
          <Box className="item" textAlign="center">
            <Text className="itemTitle" fontSize="sm" color="gray">
              Last Week
            </Text>
            <Flex
              className="itemResult positive"
              alignItems="center"
              mt="10px"
              fontSize="sm"
              color="green">
              <Icon as={MdKeyboardArrowUp} fontSize="sm" />
              <Text className="resultAmount">$12.4k</Text>
            </Flex>
          </Box>
          <Box className="item" textAlign="center">
            <Text className="itemTitle" fontSize="sm" color="gray">
              Last Month
            </Text>
            <Flex
              className="itemResult positive"
              alignItems="center"
              mt="10px"
              fontSize="sm"
              color="green">
              <Icon as={MdKeyboardArrowUp} fontSize="sm" />
              <Text className="resultAmount">$12.4k</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Featured;
