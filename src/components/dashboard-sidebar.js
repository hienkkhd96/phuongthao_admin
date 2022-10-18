/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/auth-context";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { Users as UsersIcon } from "../icons/users";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/customers",
    icon: <UsersIcon fontSize="small" />,
    title: "Customers",
  },
  {
    href: "/products",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Products",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
  },
];

export const DashboardSidebar = (props) => {
  const { user } = useAuthContext();
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: open ?? 3,
                py: "11px",
                borderRadius: 1,
                width: open ?? 10,
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                  sx={{
                    display: open ? "flex" : "none",
                  }}
                >
                  {user.name}
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  <span
                    style={{
                      display: open ? "inline" : "none",
                      marginRight: "10px",
                    }}
                  >
                    Your tier :
                  </span>
                  {user.permisson?.toUpperCase()}
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                  display: open ? "flex" : "none",
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} open={open} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: open ? 280 : 100,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
