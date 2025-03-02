"use client";
import React from "react";
import { useEffect, useState } from "react";
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
import "../../../page.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../../../globals.css";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Footer from "../../../Footer";
import TransitComponent from "../../../components/TableComponent";
import directus from "../../../lib/directus";
import { readItem, readItems, updateItem, deleteItem } from "@directus/sdk";
import { notFound } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "next/navigation";
// import Dummy from "./Dummy";
// import Bales from "./Bales";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

async function getBaleStatus(slug: string) {
  try {
    const balestatus = await directus.request(readItem("balestatus", slug));
    return balestatus;
  } catch (error) {}
}

async function getBales() {
  return directus.request(
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
    })
  );
}

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

interface BaleStatus {
  title: string;
  // Other properties as needed
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = ({ params }: PageProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#f5ae19",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
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
  // const tabs = await getTabs(params.slug);
  const [updateID, setUpdateID] = useState(0);
  const [updateIDDelete, setUpdateIDDelete] = useState(0);
  const [balestatus, setBaleStatus] = useState<BaleStatus | null>(null);
  const [bales, setBales] = useState<Bale[]>([]);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);
  // Opening Modal
  const [open, setOpen] = React.useState(false);
  const [selectedBale, setSelectedBale] = useState<Bale | null>(null);
  const handleOpen = () => {
    try {
      setOpen(true);
      setTimeout(() => {
        setLoading(false); // Set loading to false after 1 second
      }, 1000);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedBale(null); // Reset selected bale when closing
  };

  // Updating valubles
  const [text, setText] = useState("");
  const [imageUrl, setImageurl] = useState("");
  const [netweight, setNetweight] = useState("");
  const [farmerid, setFarmerid] = useState("");
  const [balestatus2, setBalestatus2] = useState("");
  const [grade, setGrade] = useState("");
  const [seedvariant, setSeedvariant] = useState("");
  const [time, setTime] = useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);

  // Dialog

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Snack Bar
  const handleClickSnack = () => {
    setOpenSnack(true);
  };

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

  const updateBale = async (id: number) => {
    setLoading(true);
    try {
      setUpdateID(id);
      console.log("The ID for Updated Is:", id);

      // Perform the actions directly here
      const baleToUpdate = bales.find((bale) => bale.id === id) || null;
      setSelectedBale(baleToUpdate);
      handleOpen();
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBale = async (id: number) => {
    try {
      setUpdateIDDelete(id);
      setOpenDialog(true);
      console.log("The ID for Delete Is:", id);
    } catch (error) {
      console.log(error);
    }
  };

  // Loader
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

  // Local Storage For Snack
  useEffect(() => {
    // Check if the page was reloaded after an update
    if (localStorage.getItem("baleUpdated")) {
      handleClickSnack();
      localStorage.removeItem("baleUpdated"); // Clear the flag
    }
  }, []); // Run on component mount

  // const { slug } = React.use(params);
  useEffect(() => {
    const fetchData = async () => {
      // setSlug(params.slug);
      try {
        const unwrappedParams = await params; // Await the params Promise
        setSlug(unwrappedParams.slug); // Set slug to state

        const status = await getBaleStatus(unwrappedParams.slug); // Fetch balestatus
        const balesData = await getBales(); // Fetch all bales

        setBaleStatus(status);
        setBales(balesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params]); // Dependency array includes params

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

  // Filter bales based on slug
  let filteredBales;
  if (slug === "transit") {
    filteredBales = bales.filter((bale) => bale.balestatus === "In Transit");
  } else if (slug === "warehouse") {
    filteredBales = bales.filter((bale) => bale.balestatus === "Warehouse");
  } else if (slug === "sold") {
    filteredBales = bales.filter((bale) => bale.balestatus === "Sold");
  } else {
    filteredBales = bales; // Default to all bales if slug does not match
  }

  // Update Item
  const updateBales = async () => {
    if (!updateID) {
      console.log("No valid updateID. Aborting update.");
      return;
    }

    const updatebalesobject = {
      ...(netweight && { netweight }),
      ...(balestatus2 && { balestatus: balestatus2 }),
      ...(grade && { grade }),
      ...(seedvariant && { seedvariant }),
      ...(time && { time }),
    };

    try {
      setLoading(true);
      await directus.request(updateItem("bales", updateID, updatebalesobject));
      // Instead of reloading, you can update the state here
      const updatedBales = await getBales(); // Refetch the updated bales
      setBales(updatedBales); // Update the state with new bales
    } catch (error) {
      console.error("Error Updating bale:", error);
      notFound();
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  // Delete Item
  const deleteBales = async () => {
    // Check if updateIDDelete has a valid value
    if (!updateIDDelete) {
      console.log("No valid updateID. Aborting delete.");
      return; // Exit if updateID is not valid
    }

    try {
      setLoading(true); // Set loading to true before starting the delete

      // Perform the delete request
      await directus.request(deleteItem("bales", updateIDDelete));

      // Optionally, refetch the updated bales to sync the state
      const updatedBales = await getBales();
      setBales(updatedBales); // Update the state with new bales

      // Close the dialog
      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting bale:", error);
      notFound(); // Handle the error appropriately
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };
  return (
    <div>
      <div className={styles.center} style={{ width: "100%" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <Snackbar
              open={openSnack}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
              message="Successful"
              action={action}
              sx={{ marginBottom: "80px" }}
            />
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
                      <Link
                        underline="hover"
                        sx={{
                          fontFamily: "Open Sans",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: "400",
                        }}
                        color="inherit"
                        href="/dashboard/status"
                      >
                        Bale Status
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
                        {balestatus
                          ? balestatus.title
                          : "No breadcrumb available"}
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
                      {balestatus ? balestatus.title : "No title available"}
                    </Typography>
                  </Grid>{" "}
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead sx={{ background: "#000" }}>
                        <TableRow>
                          <TableCell
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            ID
                          </TableCell>
                          <TableCell
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            Seed Variant
                          </TableCell>
                          <TableCell
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            Net Weight
                          </TableCell>
                          <TableCell
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            Time
                          </TableCell>
                          <TableCell
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            Grade
                          </TableCell>
                          <TableCell
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            Bale Status
                          </TableCell>
                          <TableCell
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            Options
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredBales.map((bale) => (
                          <TableRow
                            key={bale.id || 0}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {bale.id || "Bale ID"}
                            </TableCell>
                            <TableCell align="center">
                              {bale.seedvariant || "Seed Variant"}
                            </TableCell>
                            <TableCell align="center">
                              {bale.netweight || 80}kg
                            </TableCell>
                            <TableCell align="center">
                              {bale.time || "Time"}
                            </TableCell>
                            <TableCell align="center">
                              {bale.grade || "Grade"}
                            </TableCell>
                            <TableCell align="center">
                              {bale.balestatus || "Bale Status"}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ justifyContent: "center" }}
                            >
                              {" "}
                              <Stack
                                direction="row"
                                spacing={2}
                                sx={{ justifyContent: "center" }}
                              >
                                <Button
                                  sx={{
                                    // marginRight: "10px",
                                    width: "80px",
                                    borderRadius: "400px",
                                    backgroundColor: "#61740e",
                                    "&:hover": {
                                      backgroundColor: "#61740e6",
                                    },
                                  }}
                                  variant="contained"
                                  color="success"
                                  onClick={() => updateBale(bale.id)}
                                >
                                  Update
                                </Button>
                                <Modal
                                  open={open}
                                  disableEnforceFocus
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box>
                                    <Card sx={{ minWidth: 275 }}>
                                      <CardContent>
                                        <Typography
                                          sx={{
                                            fontFamily: "Open Sans",
                                            fontSize: "24px",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            margin: "20px 0px",
                                          }}
                                          color="text.primary"
                                        >
                                          Updates
                                        </Typography>
                                        {selectedBale ? (
                                          <>
                                            <Accordion disabled>
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-id"
                                                id="panelid"
                                              >
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                  }}
                                                >
                                                  ID
                                                </Typography>
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    color: "text.secondary",
                                                  }}
                                                >
                                                  {selectedBale.id || "Bale ID"}
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <TextField
                                                  fullWidth
                                                  id="standard-basic"
                                                  label="New ID"
                                                  variant="standard"
                                                  sx={{
                                                    margin: "0px !important",
                                                    marginBottom:
                                                      "36px !important",
                                                    "& .MuiInput-underline:before":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInput-underline:after":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInputLabel-root.Mui-focused":
                                                      {
                                                        color: "#f7ae1a",
                                                      },
                                                  }}
                                                />
                                              </AccordionDetails>
                                            </Accordion>
                                            <Accordion
                                              slotProps={{
                                                transition: {
                                                  timeout: 0,
                                                  unmountOnExit: true,
                                                },
                                              }}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-seedvariant"
                                                id="panelseedvariant"
                                              >
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                  }}
                                                >
                                                  Seed Variant
                                                </Typography>
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    color: "text.secondary",
                                                  }}
                                                >
                                                  {selectedBale.seedvariant ||
                                                    "Seed Variant"}
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <TextField
                                                  fullWidth
                                                  id="standard-select-currency"
                                                  select
                                                  label="New Seed Variant"
                                                  defaultValue="EUR"
                                                  helperText="Please select the Seed"
                                                  value={seedvariant}
                                                  variant="standard"
                                                  onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setSeedvariant(
                                                      e.target.value
                                                    );
                                                  }}
                                                  sx={{
                                                    margin: "0px !important",
                                                    marginBottom:
                                                      "36px !important",
                                                    "& .MuiInput-underline:before":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInput-underline:after":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInputLabel-root.Mui-focused":
                                                      {
                                                        color: "#f7ae1a",
                                                      },
                                                  }}
                                                >
                                                  {seedVariant.map((option) => (
                                                    <MenuItem
                                                      key={option.value}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </MenuItem>
                                                  ))}
                                                </TextField>
                                              </AccordionDetails>
                                            </Accordion>
                                            <Accordion
                                              slotProps={{
                                                transition: {
                                                  timeout: 0,
                                                  unmountOnExit: true,
                                                },
                                              }}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-netweight"
                                                id="panelnetweight"
                                              >
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                  }}
                                                >
                                                  Net Weight
                                                </Typography>
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    color: "text.secondary",
                                                  }}
                                                >
                                                  {selectedBale.netweight || 80}
                                                  kg
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <TextField
                                                  fullWidth
                                                  id="netweight"
                                                  label="Net Weight"
                                                  variant="standard"
                                                  type="number"
                                                  value={netweight}
                                                  onChange={(e) =>
                                                    setNetweight(e.target.value)
                                                  }
                                                  sx={{
                                                    margin: "0px !important",
                                                    marginBottom:
                                                      "36px !important",
                                                    "& .MuiInput-underline:before":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInput-underline:after":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInputLabel-root.Mui-focused":
                                                      {
                                                        color: "#f7ae1a",
                                                      },
                                                  }}
                                                />
                                              </AccordionDetails>
                                            </Accordion>
                                            <Accordion
                                              slotProps={{
                                                transition: {
                                                  timeout: 0,
                                                  unmountOnExit: true,
                                                },
                                              }}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-time"
                                                id="paneltime"
                                              >
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                  }}
                                                >
                                                  Time
                                                </Typography>
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    color: "text.secondary",
                                                  }}
                                                >
                                                  {selectedBale.time || "Time"}
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <TextField
                                                  fullWidth
                                                  type="time"
                                                  id="time-input"
                                                  //   label="Date"
                                                  variant="standard"
                                                  value={time}
                                                  onChange={(e) =>
                                                    setTime(e.target.value)
                                                  }
                                                  sx={{
                                                    margin: "0px !important",
                                                    marginBottom:
                                                      "36px !important",
                                                    "& .MuiInput-underline:before":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInput-underline:after":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInputLabel-root.Mui-focused":
                                                      {
                                                        color: "#f7ae1a",
                                                      },
                                                  }}
                                                />
                                              </AccordionDetails>
                                            </Accordion>
                                            <Accordion
                                              slotProps={{
                                                transition: {
                                                  timeout: 0,
                                                  unmountOnExit: true,
                                                },
                                              }}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-grade"
                                                id="panelgrade"
                                              >
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                  }}
                                                >
                                                  Grade
                                                </Typography>
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    color: "text.secondary",
                                                  }}
                                                >
                                                  {selectedBale.grade ||
                                                    "Grade"}
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <TextField
                                                  fullWidth
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
                                                    marginBottom:
                                                      "36px !important",
                                                    "& .MuiInput-underline:before":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInput-underline:after":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInputLabel-root.Mui-focused":
                                                      {
                                                        color: "#f7ae1a",
                                                      },
                                                  }}
                                                >
                                                  {gradeInput.map((option) => (
                                                    <MenuItem
                                                      key={option.value}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </MenuItem>
                                                  ))}
                                                </TextField>
                                              </AccordionDetails>
                                            </Accordion>
                                            <Accordion
                                              slotProps={{
                                                transition: {
                                                  timeout: 0,
                                                  unmountOnExit: true,
                                                },
                                              }}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-balestatus"
                                                id="panelstatus"
                                              >
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                  }}
                                                >
                                                  Bale Status
                                                </Typography>
                                                <Typography
                                                  component="span"
                                                  sx={{
                                                    color: "text.secondary",
                                                  }}
                                                >
                                                  {selectedBale.balestatus ||
                                                    "Bale Status"}
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <TextField
                                                  fullWidth
                                                  id="standard-select-currency"
                                                  select
                                                  label="Select"
                                                  defaultValue="EUR"
                                                  helperText="Please select the Bale Status"
                                                  value={balestatus2}
                                                  variant="standard"
                                                  onChange={(e) =>
                                                    setBalestatus2(
                                                      e.target.value
                                                    )
                                                  }
                                                  sx={{
                                                    margin: "0px !important",
                                                    marginBottom:
                                                      "36px !important",
                                                    "& .MuiInput-underline:before":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInput-underline:after":
                                                      {
                                                        borderBottomColor:
                                                          "#f7ae1a",
                                                      },
                                                    "& .MuiInputLabel-root.Mui-focused":
                                                      {
                                                        color: "#f7ae1a",
                                                      },
                                                  }}
                                                >
                                                  {status.map((option) => (
                                                    <MenuItem
                                                      key={option.value}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </MenuItem>
                                                  ))}
                                                </TextField>
                                              </AccordionDetails>
                                            </Accordion>
                                          </>
                                        ) : (
                                          <Typography>
                                            No bale selected
                                          </Typography>
                                        )}
                                      </CardContent>
                                      <CardActions>
                                        <Button
                                          size="small"
                                          sx={{ color: "#61740e" }}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            updateBales();
                                          }}
                                        >
                                          Update Content
                                        </Button>

                                        <Button
                                          size="small"
                                          sx={{ color: "red" }}
                                          onClick={handleClose}
                                        >
                                          Cancel
                                        </Button>
                                      </CardActions>
                                    </Card>
                                  </Box>
                                </Modal>
                                <Button
                                  sx={{
                                    // marginRight: "10px",
                                    width: "80px",
                                    borderRadius: "400px",
                                    backgroundColor: "#ff000d",
                                    "&:hover": {
                                      backgroundColor: "#8B0000",
                                    },
                                  }}
                                  variant="contained"
                                  color="success"
                                  // onClick={handleClickOpenDialog}
                                  onClick={() => deleteBale(bale.id)}
                                >
                                  Delete
                                </Button>
                                <Dialog
                                  open={openDialog}
                                  disableEnforceFocus
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle id="alert-dialog-title">
                                    {"Delete Bales"}
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      Are you sure you want to Delete Bale{" "}
                                      {updateIDDelete}?
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      sx={{ color: "#f5ae19" }}
                                      onClick={handleCloseDialog}
                                    >
                                      No
                                    </Button>
                                    <Button
                                      onClick={deleteBales}
                                      autoFocus
                                      sx={{ color: "red" }}
                                    >
                                      Yes
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Container>
              <Footer></Footer>
            </Box>
          </div>{" "}
          <BackToTopButton></BackToTopButton>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Page;
