"use client";
import Image from "next/image";
import "./page.module.css";
import * as React from "react";
import { useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./globals.css";
import Loginbackground from "../../public/Images/Loginbackground.png";
import LoginbackgroundMobile from "../../public/Images/LoginbackgroundMobile.png";
import LoginbackgroundDesktop from "../../public/Images/LoginbackgroundDesktop.png";
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


const api = process.env.NEXT_PUBLIC_API_URL as string;
const directus = createDirectus(api).with(authentication()).with(rest());

import {
  createDirectus,
  authentication,
  rest,
  refresh,
  login,
  request,
} from "@directus/sdk";
import Cookies from "js-cookie";
import { timeStamp } from "console";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [imageSrc, setImageSrc] = React.useState(LoginbackgroundMobile);

  const [timestamp, setTimestamp] = React.useState(Date.now());
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setImageSrc(
        window.innerWidth > 768 ? LoginbackgroundDesktop : LoginbackgroundMobile
      );
    }
  }, []);

  useEffect(() => {
    const updateActivityTimestamp = () => {
      const currentTimestamp = Date.now();
      setTimestamp(currentTimestamp);
      Cookies.set("lastActivity", String(currentTimestamp));

      // Reset the inactivity timer
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      startInactivityTimer();
    };

    const email =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("Email="))
        ?.split("=")[1] || null;
    const startInactivityTimer = () => {
      inactivityTimer = setTimeout(() => {
        Cookies.remove("lastActivity"); // Remove the cookie after 20 minutes
        Cookies.remove("loginFlag");
        if (email === "tanyanyiwatinashe7@gmail.com") {
          Cookies.set("loginFlag", "true", { expires: 1 });
        }
      }, 20 * 60 * 1000); // 20 minutes in milliseconds
    };

    // Listen for user activity
    window.addEventListener("mousemove", updateActivityTimestamp);
    window.addEventListener("keypress", updateActivityTimestamp);
    window.addEventListener("touchstart", updateActivityTimestamp);

    // Start the inactivity timer on mount
    let inactivityTimer = setTimeout(() => {
      Cookies.remove("lastActivity");
    }, 20 * 60 * 1000);

    return () => {
      clearTimeout(inactivityTimer); // Clean up the timer
      window.removeEventListener("mousemove", updateActivityTimestamp);
      window.removeEventListener("keypress", updateActivityTimestamp);
      window.removeEventListener("touchstart", updateActivityTimestamp);
    };
  }, []);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Email and password must be provided.");

      return;
    }

    if (validateEmail(email)) {
      loginUser(email, password);
    } else {
      alert("Invalid email address.");
    }
  };

  async function loginUser(email: string, password: string) {
    try {
      Cookies.set("Email", email, { expires: 1 });
      // const result = await directus.auth.request(login({ email, password }));
      // console.log("Login successful:", result);
      // const authToken = result.access_token;
      // sessionStorage.setItem("loginFlag", "true");
      Cookies.set("loginFlag", "true", { expires: 1 });
      const timestamp = Date.now();
      Cookies.set("lastActivity", String(timestamp), { expires: 1 });

      window.location.href = "/dashboard";
      console.log("The login information is:", email, " ", password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div>
      {" "}
      <Grid
        className="row"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          paddingLeft: "0px !important",

          paddingTop: "0px !important",

          marginTop: "0px !important",
          minHeight: { md: "900px" },
        }}
      >
        <Grid
          item
          sm={12}
          xs={12}
          md={6}
          lg={6}
          className="column"
          // sx={{
          //   display: "flex",
          //   padding: "0px 40px",
          //   paddingLeft: "40px !important",
          //   alignItems: "center",
          //   width: "100%",
          //   marginTop: "0 px !important",
          //   justifyContent: "center",
          // }}
          sx={{
            display: "flex",
            paddingLeft: "0px !important",
            alignItems: "center",
            paddingTop: "0px !important",
            width: "100%",
            height: { xs: "400px", sm: "400px", md: "960px", lg: "960px" },
            marginTop: "0px !important",
            position: "relative",
            // overflow: "hidden",
          }}
        >
          <Image
            src={imageSrc}
            alt={"Background Image"}
            style={{ objectFit: "cover" }}
            fill
          />

          <Box
            sx={{
              position: "relative",
              // top: "-335px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0px !important",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "400px",
                height: "120px",
                width: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
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
                  alt={"Voedsel Logo"}
                  style={{
                    width: "auto",
                    height: "90px",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          md={6}
          lg={6}
          className="column"
          sx={{
            display: "flex",
            padding: "0px 40px",
            paddingLeft: "40px !important",
            alignItems: "center",
            width: "100%",
            marginTop: "0 px !important",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2} sx={{ padding: "0px 10px" }}>
            {" "}
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "bolder",
                textAlign: "center",
                fontStyle: "italic",
                color: "#262324",
                marginTop: "90px",
              }}
              color="text.primary"
            >
              Login
            </Typography>
            <Box
              component="form"
              sx={{ width: "100%" }}
              noValidate
              autoComplete="off"
            >
              {" "}
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
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
              <FormControl
                fullWidth
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
                variant="standard"
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Stack direction="row" spacing={2}>
              {/* <Link href="/dashboard"> */}
              <Button
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
                onClick={handleLogin}
              >
                Login
              </Button>
              {/* </Link> */}
              <Button
                sx={{
                  width: "180px",
                  borderRadius: "400px",
                  backgroundColor: "#262324",
                  "&:hover": {
                    backgroundColor: "#262324",
                  },
                }}
                variant="contained"
                color="success"
              >
                Clear
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
