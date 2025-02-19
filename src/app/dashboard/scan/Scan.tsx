"use client";
import Image from "next/image";
import "../../page.module.css";
import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../globals.css";
import Loginbackground from "../../../../public/Images/Loginbackground.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "../../../../public/Images/Logo.png";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { motion } from "framer-motion";
import Navigation from "../../Navigation";
import StatusComponents from "../../components/StatusComponents";
import Footer from "../../Footer";
// import QrReader from "react-qr-reader";
import QrReader from "react-qr-reader";
import directus from "../../lib/directus";
import { createDirectus, rest, readItem } from "@directus/sdk";
import { notFound } from "next/navigation";
import Stack from "@mui/material/Stack";

interface Bale {
  id: number;
  status: string;
  seedvariant: string;
  netweight: number;
  time: string;
  farmerid: number;
  grade: string;
  balestatus: string;
  date_created: string; // Adjust according to your data structure
}

function Scan() {
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [updateID, setUpdateID] = useState(0);
  const [bale, setBale] = useState<Bale | null>(null);
  // const qrRef = useRef(null);

  const restart = () => {
    setScanResultWebCam("");
    setBale(null);
  };

  const handleErrorWebCam = (error: Error): void => {
    console.log(error);
  };
  const handleScanWebCam = (result: string | null): void => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  useEffect(() => {
    const getBales = async () => {
      // Check if scanResultWebCam has a valid value
      if (!scanResultWebCam) {
        console.log("No valid updateID. Aborting update.");
        return; // Exit if scanResultWebCam is not valid
      }

      try {
        const updatebale = await directus.request(
          readItem("bales", Number(scanResultWebCam))
        );
        console.log(updatebale);
        setBale(updatebale);
        // Optionally reset scanResultWebCam or perform other actions
        // setScanResultWebCam("");
        return updatebale;
      } catch (error) {
        console.log("Error Showing bale:", error);
        notFound();
      }
    };

    getBales(); // Call the getBales function
  }, [scanResultWebCam]);

  return (
    <div>
      <Navigation></Navigation>
      <Box sx={{ paddingTop: "0px" }}>
        <Container maxWidth="xl" sx={{ padding: "0px !important" }}>
          <Grid
            className="row"
            container
            rowSpacing={1}
            spacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              padding: "0px 20px",
              display: "flex",
              justifyContent: "left",
              marginTop: "0px !important",
              marginBottom: "52px",
            }}
          >
            <Grid
              item
              xs={12}
              className="column"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "0px !important",
                paddingTop: "0px !important",
                width: "100%",
                marginTop: "32px",
                marginBottom: "26px",
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  sx={{
                    fontFamily: "Open Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                  }}
                  color="inherit"
                  href="/dashboard"
                >
                  Homepage
                </Link>
                <Typography
                  sx={{
                    fontFamily: "Open Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "600",
                  }}
                  color="text.primary"
                >
                  Scanner
                </Typography>
              </Breadcrumbs>
            </Grid>{" "}
            <Grid
              item
              xs={12}
              className="column"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "0px !important",
                paddingTop: "0px !important",
                width: "100%",
                marginTop: "0px",
                marginBottom: "26px",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "700",
                  fontSize: "24px",
                  color: "#262324",
                }}
              >
                Scan Bales
              </Typography>
            </Grid>{" "}
            {/* <Grid
              item
              xs={12}
              className="column"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "0px !important",
                paddingTop: "0px !important",
                width: "100%",
                marginTop: "0px",
                marginBottom: "26px",
              }}
            >
              {scanResultWebCam && (
                <Typography
                  sx={{
                    color: "#000",
                    textAlign: "justify",
                    fontVariantNumeric: "lining-nums proportional-nums",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    marginTop: "0px",
                  }}
                >
                  Showing Information for Bale: {scanResultWebCam}
                </Typography>
              )}
            </Grid> */}
            <Grid
              item
              xs={12}
              className="column"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "0px !important",
                paddingTop: "0px !important",
                width: "100%",
                marginTop: "0px",
                marginBottom: "26px",
              }}
            >
              {bale ? (
                <Box>
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "justify",
                      fontSize: "16px",
                    }}
                  >
                    ID: {bale.id || "ID"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "justify",
                      fontSize: "16px",
                    }}
                  >
                    Seed Variant: {bale.seedvariant || "Seed Variant"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "justify",
                      fontSize: "16px",
                    }}
                  >
                    Grade: {bale.grade || "Grade"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "justify",
                      fontSize: "16px",
                    }}
                  >
                    Status: {bale.status || "Status"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "justify",
                      fontSize: "16px",
                    }}
                  >
                    Net Weight: {bale.netweight || "Net Weight"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "justify",
                      fontSize: "16px",
                    }}
                  >
                    Time: {bale.time || "Time"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "justify",
                      fontSize: "16px",
                    }}
                  >
                    Status: {bale.status || "Status"}
                  </Typography>
                </Box>
              ) : (
                scanResultWebCam && ( // Only render if scanResultWebCam has a value
                  <Typography
                    sx={{
                      color: "#000",
                      textAlign: "justify",
                      fontSize: "16px",
                    }}
                  >
                    Bale does not exist.
                  </Typography>
                )
              )}
            </Grid>
            <Grid
              item
              xs={12}
              className="column"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "0px !important",
                paddingTop: "0px !important",
                width: "100%",
                marginTop: "0px",
                marginBottom: "26px",
              }}
            >
              {bale ? null : (
                <QrReader
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                  facingMode="environment"
                />
              )}
              <Stack direction="row">
                {bale ? (
                  <Button
                    // onClick={() => generateQrCode()}
                    onClick={restart}
                    sx={{
                      marginRight: "10px",
                      width: "180px",
                      borderRadius: "400px",
                      backgroundColor: "#61740e",
                      "&:hover": {
                        backgroundColor: "#61740e6",
                      },
                    }}
                    variant="contained"
                    color="success"
                    disabled={!bale} // Disable when textID has a value
                  >
                    Scan Again
                  </Button>
                ) : null}
                {bale ? (
                  <Button
                    // onClick={() => generateQrCode()}
                    // onClick={addBale}
                    sx={{
                      marginRight: "10px",
                      width: "180px",
                      borderRadius: "400px",
                      backgroundColor: "#f7ae1a",
                      "&:hover": {
                        backgroundColor: "#e09e16",
                      },
                    }}
                    variant="contained"
                    color="success"
                    disabled={!bale} // Disable when textID has a value
                  >
                    Print
                  </Button>
                ) : null}
              </Stack>
            </Grid>{" "}
          </Grid>
        </Container>
        <Footer></Footer>
      </Box>
    </div>
  );
}

export default Scan;
