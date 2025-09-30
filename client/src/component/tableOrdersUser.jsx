/* eslint-disable react/prop-types */
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function TableOrdersUsers({ userData }) {
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

  const sortedData = userData?.slice().sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const latestTransactions = sortedData?.slice(0, 5);
  console.log(latestTransactions);

  return (
    <Table variant="simple" className="table">
      <TableCaption>Orders List</TableCaption>
      <Thead>
        <Tr>
          <Th>No Invoice</Th>
          <Th>Customer</Th>
          <Th>Date</Th>
          <Th>Amount</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {latestTransactions?.map((item) => (
          <Tr key={item.id}>
            <Td>{item.noInvoice}</Td>
            <Td>{item.User.username}</Td>
            <Td>{formatTimestamp(item.updatedAt, timeZone)}</Td>
            <Td>{formatIDRCurrency(item.total)}</Td>
            <Td>{item.status}</Td>
            <Td>
              <Box
                as={Link}
                to={`/transUserDetail/${item.id}`}
                textDecoration="none">
                <Button colorScheme="teal" variant="outline" size="sm">
                  Lihat Detail
                </Button>
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
