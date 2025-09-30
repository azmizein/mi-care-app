import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Image,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Order = () => {
  const data = useSelector((state) => state.orderSlice.value);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = data.slice().sort((a, b) => b.updatedAt - a.updatedAt);

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

    return new Intl.DateTimeFormat("id-ID", options).format(
      new Date(timestamp)
    );
  };

  const timeZone = "UTC";

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table variant="simple" className="table">
        <Thead>
          <Tr>
            <Th>No Invoice</Th>
            <Th>Product</Th>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData?.map((item, index) => {
            console.log(item, currentData);
            return (
              <Tr key={index}>
                <Td>{item.noInvoice}</Td>
                <Td>
                  <Box display="flex" alignItems="center">
                    <Image
                      src={`https://84j2gl1l-2000.asse.devtunnels.ms/public/${item["Transaction_Details.Product.images"]}`}
                      alt=""
                      className="image"
                      borderRadius="full"
                      boxSize="32px"
                      mr="2"
                    />
                    {item["Transaction_Details.Product.name"]}
                  </Box>
                </Td>
                <Td>{item["User.username"]}</Td>
                <Td>{formatTimestamp(item.updatedAt, timeZone)}</Td>
                <Td>{formatIDRCurrency(item.total)}</Td>
                <Td>{item.status}</Td>
              </Tr>
            );
          })}
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
    </>
  );
};

export default Order;
