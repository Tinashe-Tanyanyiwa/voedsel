import React from "react";
import "../../../globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "../../../page.module.css";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "@fontsource/open-sans";
import "@fontsource/poppins";
import { Typography } from "@mui/material";
import Navigation from "../../../Navigation";
import BackToTopButton from "../../../BackToTopButton";
import directus from "@/app/lib/directus";
import { readItems } from "@directus/sdk";

async function getPerson() {
  return directus.request(readItems("person"));
}

export default async function Home() {
  const person = await getPerson();

  return (
    <div>
      <div className={styles.center} style={{ width: "100%" }}>
        {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <h1>{person.name}</h1>
        <p>{person.age}</p>
        <BackToTopButton></BackToTopButton>
        {/* </ThemeProvider> */}
      </div>
    </div>
  );
}
