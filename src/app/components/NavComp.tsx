import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Cookies from "js-cookie";

import Link from "@mui/material/Link";

interface Item {
  id: number;
  link: string;
  attribute: string;
  function: string;
}

function Item({ item }: { item: Item }) {
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

  const logoutUser = () => {
    Cookies.remove("loginFlag");
    Cookies.remove("lastActivity");
    Cookies.remove("Email");
    window.location.href = "/"; // Redirect to login page
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    if (item.function === "logout") {
      logoutUser();
    } else {
      console.log("Could not log out");
    }
  };
  return (
    <Link href={item.link} color="inherit" sx={{ textDecoration: "none" }}>
      <MenuItem onClick={handleCloseNavMenu}>
        <Typography textAlign="center">{item.attribute}</Typography>
      </MenuItem>
    </Link>
  );
}

export default Item;
