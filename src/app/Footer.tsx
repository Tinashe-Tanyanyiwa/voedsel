"use client";
import Image from "next/image";
import styles from "./page.module.css";
import * as React from "react";
import { motion } from "framer-motion";
import useState from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import background from "../../public/Images/backgroundHome.jpg";
import Logo from "../../public/Images/H2H logo.svg";
import sagehillProfessionals from "../../public/Images/sagehillProfessionals.png";
import "./globals.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div >
      {/* <Container
        maxWidth="xl"
        sx={{
          padding: "0px !important",
        }}
      > */}
      <Grid
        className="row"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          padding: "10px 20px ",
          marginTop: "0px !important",
          background: "#000",
        }}
      >
        <Grid
          item
          sm={12}
          md={12}
          className="column"
          sx={{
            // paddingTop: "8px !important",
            paddingLeft: "0px !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontVariantNumeric: "lining-nums proportional-nums",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              marginTop: "0px",
            }}
          >
            ©{year} Copyright Leaf Exchange Africa. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        className="row"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          padding: "12px 0px ",
          marginTop: "0px !important",
          background: "#000",
        }}
      >
        <Grid
          item
          sm={12}
          md={12}
          className="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "0px !important",
          }}
        >
          <Typography
            variant="subtitle2"
            component="h2"
            sx={{
              color: "white",
              fontSize: "14px",
              // marginLeft: "34px !important",
              // marginTop: "20px !important",
              marginBottom: "0px !important",
              textAlign: "center",
              fontWeight: "400",
              padding: "0px !important",
              margin: "0px",
            }}
          >
            Designed by Leaf Exchange Africa.
          </Typography>
        </Grid>
      </Grid>
      {/* </Container> */}
    </div>
  );
}

export default Footer;
