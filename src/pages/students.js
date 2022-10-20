import { Box, Container } from "@mui/material";
import Head from "next/head";
import { StudentListResults } from "../components/students/student-list-results";
import { StudentListToolbar } from "../components/students/students-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => {
  return (
    <>
      <Head>
        <title>Students | Trung tâm Phương Thảo</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <StudentListToolbar />
          <Box sx={{ mt: 3 }}>
            <StudentListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
