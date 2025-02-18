"use client";
import React from "react";
import "../../globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "../../page.module.css";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "@fontsource/open-sans";
import "@fontsource/poppins";
import { Typography } from "@mui/material";
import Navigation from "../../Navigation";
import BackToTopButton from "../../BackToTopButton";
import Scan from "./Scan"


export default function Home() {
    const theme = createTheme({
      typography: {
        fontFamily: '"Poppins", "Open Sans", Arial, sans-serif',
      },
      components: {
        MuiGrid: {
          styleOverrides: {
            root: {
              "@media (min-width: 0px)": {
                width: "100%",
                marginLeft: "0px",
              },
            },
            item: {
              "@media (min-width: 0px)": {
                paddingLeft: "0px",
              },
              paddingTop: "0px",
              "&.css-8sa601-MuiGrid-root": {
                "@media (min-width: 0px)": {
                  paddingLeft: "0px !important",
                },
              },
              "&.css-1x8z8d6-MuiGrid-root > &": {
                "@media (min-width: 0px)": {
                  paddingLeft: "0px !important",
                },
              },
              ".css-aq8pb7-MuiSvgIcon-root": {
                fontSize: "16px !important",
              },
            },
          },
        },
      },
    });
    return (
      <div>
        <div className={styles.center} style={{ width: "100%" }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Scan></Scan>
            <BackToTopButton></BackToTopButton>
          </ThemeProvider>
        </div>
      </div>
    );
  }
  