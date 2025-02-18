"use client";
import Image from "next/image";
import "../../page.module.css";
import React, { useState, useEffect } from "react";
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
import Footer from "@/app/Footer";
import MenuItem from "@mui/material/MenuItem";
import QRCode from "qrcode";
import Stack from "@mui/material/Stack";
import directus from "@/app/lib/directus";
import { readItem, readItems, createItem } from "@directus/sdk";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Tooltip from "@mui/material/Tooltip";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";

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

async function getLastBale() {
  try {
    const response = await directus.request(
      readItems("bales", {
        fields: [
          "id",
          "netweight",
          "farmerid",
          "balestatus",
          "grade",
          "seedvariant",
          "time",
        ],
        sort: ["-date_created"],
        limit: 1,
      })
    );

    console.log("API Response:", response);

    if (Array.isArray(response) && response.length > 0) {
      return response[0]; // Return the first item from the array
    } else {
      return null; // Return null if there are no items
    }
  } catch (error) {
    console.error("Error fetching last bale:", error);
    notFound();
    return null; // Return null or handle error as needed
  }
}

function Scan() {
  // The first one is for the id

  const [imageUrl, setImageurl] = useState("");
  const [netweight, setNetweight] = useState("");
  const [farmerid, setFarmerid] = useState("");
  const [balestatus, setBalestatus] = useState("");
  const [grade, setGrade] = useState("");
  const [seedvariant, setSeedvariant] = useState("");
  const [time, setTime] = useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [isActive, setIsActive] = useState(false);
  const [newBale, setNewBale] = useState<Bale[]>([]);
  const [textID, setTextID] = useState("");
  const [itemCreated, setItemCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(progress + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    // Check if the page was reloaded after an update
    if (localStorage.getItem("baleUpdated")) {
      handleClickSnack();
      localStorage.removeItem("baleUpdated"); // Clear the flag
    }
  }, []);
  useEffect(() => {
    if (isActive) {
      getLast(); // Call getLast when isActive changes
    }
  }, [isActive]);

  const redirectItem = () => {
    window.location.href = "/dashboard/status/all";
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          marginTop: "400px",
        }}
      >
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
          sx={{
            // Change the color of the progress bar
            "& .MuiLinearProgress-bar": {
              backgroundColor: " #f5ae19", // Change this to your desired color
            },
            // Change the color of the buffer bar
            "& .MuiLinearProgress-bar1Buffer": {
              backgroundColor: "#eeaa1c", // Change this to your desired buffer color
            },
            // Change the background color of the track
            backgroundColor: "#ab7a14",
          }}
        />
      </Box>
    ); // Loading state
  }

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const createNew = () => {
    window.location.reload();
  };
  const addBale = async () => {
    // setLoading(true);
    if (itemCreated) return; // Prevent further execution if the item is already created

    if (!netweight) {
      alert("Please fill in the net weight.");
      return;
    }
    if (!balestatus) {
      alert("Please select a bale status.");
      return;
    }
    if (!grade) {
      alert("Please select a grade.");
      return;
    }
    if (!seedvariant) {
      alert("Please select a seed variant.");
      return;
    }
    if (!time) {
      alert("Please select a time.");
      return;
    }
    const addbalesobject = {
      netweight,
      balestatus,
      grade,
      seedvariant,
      time,
    };

    console.log(netweight, balestatus, grade, seedvariant, time);

    try {
      setItemCreated(true);

      const addbales = await directus.request(
        createItem("bales", addbalesobject)
      );
      setIsActive(true);

      // Update state to indicate the item has been created
      // redirectItem(); // Uncomment if needed
      // getLast(); // Uncomment if needed
      localStorage.setItem("baleUpdated", "true");
      return addbales;
    } catch (error) {
      console.error("Error Adding bale:", error);
      notFound();
      // notFound(); // Uncomment if needed
    }
  };

  // Local Storage For Snack
  // Run on component mount

  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const action = (
    <React.Fragment>
      <Button sx={{ color: "#61740e" }} size="small" onClick={handleCloseSnack}>
        Done
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(textID);
      setImageurl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getLast = async () => {
    const lastBale = await getLastBale();
    console.log("The Bale to be deleted is: ", lastBale);
    if (lastBale) {
      setTextID(lastBale.id);
      setNewBale([lastBale]);
      console.log("The Array is:", lastBale);
      console.log("The ID is:", lastBale.id);
      try {
        const response = await QRCode.toDataURL(lastBale.id.toString());
        setImageurl(response);
      } catch (error) {
        console.log("Error creating QR code", error);
      }
    } else {
      console.log("No bales found");
    }
  };

  return (
    <div>
      <Navigation></Navigation>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message="Successful"
        action={action}
        sx={{ marginBottom: "80px" }}
      />
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
                  Add New
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
                // justifyContent: "space-between",
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
                Add New Bales
              </Typography>
            </Grid>{" "}
            <Stack sx={{ width: "100%" }}>
              <div ref={contentRef}>
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
                    marginBottom: "12px",
                    justifyContent: "left",
                  }}
                >
                  {imageUrl ? (
                    <Stack direction="row">
                      <a href={imageUrl} download>
                        <Image
                          src={imageUrl}
                          width={90}
                          height={90}
                          style={{ height: "90px", width: "auto" }}
                          alt="QR Code"
                          className="logoTwo"
                        />
                      </a>
                      <Tooltip title="Print Page Details">
                        {/* <IconButton
                        aria-label="fingerprint"
                        // color="success"
                        sx={{ paddingLeft: "15px" }}
                      > */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "40px",
                          }}
                        >
                          <LocalPrintshopIcon
                            sx={{
                              height: "40px",
                              width: "40px",
                              color: "#61740e",
                            }}
                            onClick={() => reactToPrintFn()}
                          />
                        </Box>
                        {/* </IconButton> */}
                      </Tooltip>
                    </Stack>
                  ) : null}
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="column"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pl: "0px !important",
                    pt: "0px !important",
                    mt: "0px",
                    mb: "26px",
                  }}
                >
                  <Box
                    component="form"
                    sx={{ width: "100%" }}
                    noValidate
                    autoComplete="off"
                  >
                    {textID ? (
                      <TextField
                        fullWidth
                        id="idt"
                        label={`ID: ${textID} `}
                        variant="standard"
                        type="text"
                        // value={seedvariant}
                        disabled
                        onChange={(e) => setSeedvariant(e.target.value)}
                        sx={{
                          width: "100% !important",
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
                    ) : null}

                    <TextField
                      fullWidth
                      id="standard-select-currency"
                      select
                      label="Select"
                      defaultValue="EUR"
                      helperText="Please select the Seed"
                      value={seedvariant}
                      variant="standard"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSeedvariant(e.target.value);
                      }}
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
                      value={netweight}
                      onChange={(e) => setNetweight(e.target.value)}
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
                        value={grade}
                        variant="standard"
                        onChange={(e) => {
                          console.log(e.target.value);
                          setGrade(e.target.value);
                        }}
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
                        value={balestatus}
                        variant="standard"
                        onChange={(e) => setBalestatus(e.target.value)}
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
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
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
                  </Box>
                </Grid>
              </div>
              <Stack direction="row">
                {textID ? null : (
                  <Button
                    // onClick={() => generateQrCode()}
                    onClick={addBale}
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
                    disabled={!!textID} // Disable when textID has a value
                  >
                    Add
                  </Button>
                )}

                {/* Clear Button */}
                {textID ? null : (
                  <Button
                    // onClick={() => generateQrCode()}
                    onClick={createNew}
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
                    disabled={!!textID} // Disable when textID has a value
                  >
                    Clear
                  </Button>
                )}
                {textID ? (
                  <Button
                    // onClick={() => generateQrCode()}
                    onClick={createNew}
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
                  >
                    Create New
                  </Button>
                ) : null}
                {textID ? (
                  <Button
                    // onClick={() => generateQrCode()}
                    onClick={redirectItem}
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
                  >
                    View All
                  </Button>
                ) : null}
              </Stack>
            </Stack>
            {/* <Button onClick={() => generateQrCode()}>Click Me</Button> */}
          </Grid>
        </Container>
        <Footer></Footer>
      </Box>
    </div>
  );
}

export default Scan;
