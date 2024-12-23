import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ResponsiveAppBar from "./Layout";
import { NavLink, Outlet } from "react-router-dom";  // Use NavLink instead of Link
import { AccountCircle, Adb, Close, CompareArrows, Dashboard, NavigateBefore, Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import useBreakpoint from "../hooks/useBreakPoint";

// Define drawer width
const drawerWidth = 240;

// Style for Main content area
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

// Style for AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

// Drawer Header Component
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBarDrawer() {
  const theme = useTheme();
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);
  const role= useSelector(state=>state?.auth?.role);
  const [open, setOpen] = React.useState(true);

  // Toggle drawer open/close
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleSetActive = (index) => {
    setActiveIndex(index);
  };

  const menuItems = [
    { label: "Dashboard",User:"Admin", icon: <Dashboard />, to: "/dashboard/admin-dashboard" },
    { label: "Dashboard",User:"Sub-Admin", icon: <Dashboard />, to: "/dashboard/sub-dashboard" },
    { label: "Dashboard",User:"User", icon: <Dashboard />, to: "/dashboard/user" },
    { label: "Profile", icon: <AccountCircle />, to: "/dashboard/profile" },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ResponsiveAppBar isOpenedDrawer={open} openDrawer={handleDrawerOpen} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ background: !isDarkMode ? "#1975d0" : "#121212" }}>
          <Adb sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Stoxx
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {menuItems
  .filter((item) => item.User === role || !item.User) // Include items that match the role or have no User key
  .map((item, index) => (
    <ListItem disablePadding key={index}>
      <ListItemButton
        component={NavLink}
        to={item.to}
        onClick={() => handleSetActive(index)}
        style={{
          backgroundColor: activeIndex === index ? "#f0f4ff" : "transparent",
          color: activeIndex === index ? "#3f51b5" : "inherit",
        }}
      >
        <ListItemIcon
          sx={{
            color: activeIndex === index ? "#3f51b5" : "inherit",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
    </ListItem>
  ))}


    </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
