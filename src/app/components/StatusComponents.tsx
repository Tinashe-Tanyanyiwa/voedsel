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
import Image from "next/image";
import { motion } from "framer-motion";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import styles from "../..page.module.css";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: " #f5ae19 ",
  },
}));

interface Item {
  id: number;
  text: string;
  attributes: string;
  icon: string;
  image: string;
  link: string;
  amount: number;
}

function Item({ item }: { item: Item }) {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      lg={6}
      md={6}
      sx={{
        marginBottom: "32px",
        padding: "0px 20px ",
        
      }}
      className="column"
    >
      {/* <React.Fragment> */}
      <Card sx={{}}>
        {/* <CardActionArea> */}
        <CardMedia
          component="img"
          height="240"
          sx={{ width: "auto !important" }}
          image={item.image}
          alt={item.text}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {item.text}
            </Typography>
            <Link href={item.link} sx={{ textDecoration: "none !important" }}>
              <StyledBadge badgeContent={item.amount} color="secondary">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    "&:hover": {
                      backgroundColor: "#444", // Darker shade on hover
                      transform: "scale(1.05)", // Slightly enlarge the button on hover
                    },
                  }}
                >
                  View
                </Button>
              </StyledBadge>
            </Link>
          </Box>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
      {/* </React.Fragment> */}
    </Grid>
  );
}

export default Item;
