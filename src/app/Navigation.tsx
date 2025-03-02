import React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Image from "next/image";
import Logo from "../../public/Images/LEAlogo.png";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import Generalnavbar from "./Generalnavbar.json";
import NavComp from "./components/NavComp";
import NavCompLarge from "./components/NavCompLarge";

function Navigation() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // END OF MODL
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function logoutUser() {
    // Clear the auth token cookie
    sessionStorage.clear();

    // Redirect to the root login page
    window.location.href = "/";
  }

  return (
    <div>
      {/* MENU */}
      <AppBar
        sx={{
          height: "auto",
          bgcolor: "transparent",
          boxShadow: "none",
          position: "sticky",
        }}
      >
        {/* <Container
          maxWidth="xl"
          sx={{
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
          }}
        > */}
        <Toolbar
          disableGutters
          sx={{ position: "sticky" }}
          // className={navColor ? "navFluid fixedFluid" : "navFluid"}
        >
          <Box sx={{ flexGrow: 0, ml: 3, paddingTop: "12px" }}>
            {/* LOGO */}
            {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
              <motion.div
                animate={{
                  rotateY: ["-360deg", "0deg"],
                }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                <Image
                  src={Logo}
                  style={{ height: "90px", width: "auto" }}
                  alt="Leaf Exchange Africa Logo"
                  className="logoTwo"
                />
              </motion.div>
            {/* </IconButton> */}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "right",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ paddingRight: "20px !important" }}
            >
              <MenuIcon sx={{ color: "#000", height: "25px", width: "25px" }} />
            </IconButton>
            {/* LIST ON HAMBURGER MENU */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClick={handleCloseNavMenu}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Generalnavbar.map((item) => (
                <NavComp key={item.id} item={item} />
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
            }}
          >
            {/* MAIN SCREEN MENU */}
            {Generalnavbar.map((item) => (
              <NavCompLarge key={item.id} item={item} />
            ))}
          </Box>
        </Toolbar>
        {/* </Container> */}
      </AppBar>
    </div>
  );
}

export default Navigation;
