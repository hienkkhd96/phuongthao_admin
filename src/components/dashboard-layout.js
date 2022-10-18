import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthGuard } from "./auth-guard";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const DashboardLayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: isSidebarOpen ? 280 : 100,
    },
  }));

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(!isSidebarOpen)} open={isSidebarOpen} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </AuthGuard>
  );
};
