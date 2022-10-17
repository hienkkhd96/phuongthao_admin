import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../axios/fetchSwr";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => {
  const [customers, setCustomer] = useState();
  const { data, error } = useSWR("customers", fetcher, { refreshInterval: 500 });
  console.log(data);

  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>{data && <CustomerListResults customers={data} />}</Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
