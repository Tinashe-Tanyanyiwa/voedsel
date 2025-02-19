"use client";
import Image from "next/image";
import styles from "../../page.module.css";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../globals.css";
import Loginbackground from "../../public/Images/Loginbackground.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "../../public/Images/Logo.png";
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
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Navigation from "../../Navigation";

const seedVariant = [
  {
    value: "K326",
    label: "K326",
  },
  {
    value: "F262",
    label: "K326",
  },
  {
    value: "T6941",
    label: "T6941",
  },
  {
    value: "G2134",
    label: "G2134",
  },
];
const gradeInput = [
  {
    value: "InHouse",
    label: "InHouse",
  },
  {
    value: "Outsource",
    label: "Outsource",
  },
];
const status = [
  {
    value: "In Transit",
    label: "In Transit",
  },
  {
    value: "Warehouse",
    label: "Warehouse",
  },
  {
    value: "Sold",
    label: "Sold",
  },
];

function Farmers() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
                  Farmers
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
                Farmers
              </Typography>
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
              <Box
                component="form"
                sx={{ width: "100%" }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  id="standard-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select the Seed"
                  // value={seedvariant}
                  variant="standard"
                  // onChange={(e) => {
                  //   console.log(e.target.value);
                  //   setSeedvariant(e.target.value);
                  // }}
                  sx={{
                    margin: "0px !important",
                    marginBottom: "36px !important",
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#f7ae1a",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#f7ae1a",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#f7ae1a",
                    },
                  }}
                >
                  {seedVariant.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  id="netweight"
                  label="Net Weight"
                  variant="standard"
                  type="number"
                  // value={netweight}
                  // onChange={(e) => setNetweight(e.target.value)}
                  sx={{
                    margin: "0px !important",
                    marginBottom: "36px !important",
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#f7ae1a",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#f7ae1a",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#f7ae1a",
                    },
                  }}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "space-between" }}
                >
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    helperText="Please select the grade"
                    // value={grade}
                    variant="standard"
                    // onChange={(e) => {
                    //   console.log(e.target.value);
                    //   setGrade(e.target.value);
                    // }}
                    sx={{
                      margin: "0px !important",
                      marginBottom: "36px !important",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#f7ae1a",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "#f7ae1a",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#f7ae1a",
                      },
                    }}
                  >
                    {gradeInput.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    helperText="Please select the Bale Status"
                    // value={balestatus}
                    variant="standard"
                    // onChange={(e) => setBalestatus(e.target.value)}
                    sx={{
                      margin: "0px !important",
                      marginBottom: "36px !important",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#f7ae1a",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "#f7ae1a",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#f7ae1a",
                      },
                    }}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <TextField
                  fullWidth
                  type="time"
                  id="time-input"
                  //   label="Date"
                  variant="standard"
                  // value={time}
                  // onChange={(e) => setTime(e.target.value)}
                  sx={{
                    margin: "0px !important",
                    marginBottom: "36px !important",
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#f7ae1a",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#f7ae1a",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#f7ae1a",
                    },
                  }}
                />
                <Stack direction="row">
                  <Button
                    // onClick={() => generateQrCode()}
                    // onClick={addBale}
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
                    // disabled={!!textID}
                  >
                    Add
                  </Button>

                  {/* Clear Button */}

                  <Button
                    // onClick={() => generateQrCode()}
                    // onClick={createNew}
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
                    // disabled={!!textID}
                  >
                    Clear
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Farmers;
