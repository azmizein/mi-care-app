import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const List = () => {
  const data = useSelector((state) => state.orderSlice.value);

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

  const sortedData = data?.slice().sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const latestTransactions = sortedData?.slice(0, 5);

  return (
    <Box overflowX="auto">
      {" "}
      <Table variant="simple" className="table" width="100%">
        <TableCaption>Orders List</TableCaption>
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
          {latestTransactions?.map((item) => (
            <Tr key={item.id}>
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
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default List;
