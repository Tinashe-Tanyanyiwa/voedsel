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

import Link from "@mui/material/Link";

interface Item {
  id: number;
  text: string;
  attributes: string;
  icon: string;
  image: string;
  link: string;
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
        paddingTop: "0px !important",
        // paddingLeft: "0px !important",
        marginBottom: "32px",
      }}
      className="column"
    >
      {/* <React.Fragment> */}

      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: "260px",
        }}
      >
        <Link href={item.link} sx={{ textDecoration: "none !important" }}>
          <CardMedia
            component="img"
            height="195"
            image={item.image}
            alt={item.attributes}
            sx={{ height: "100%", borderRadius: "4px" }}
          />
        </Link>
        <Box
          sx={{
            position: "relative",
            top: "-250px",
            width: "100%",
            height: "60px",
            alignItems: "center",
            // display: "flex",
            // justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "700",
              fontSize: "32px",
              color: "white",
              textAlign: "left",
              marginLeft: "16px",
            }}
          >
            {item.text}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "60px",
            alignItems: "center",
            // display: "flex",
            // justifyContent: "center",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              display: "flex !important",
              justifyContent: "right !important",
            }}
          >
            <Image
              src={item.icon}
              height={90}
              width={90}
              style={{
                height: "90px !important",
                width: "auto !important",
                top: "-155px",
                position: "relative",
                paddingRight: "12px",
              }}
              alt="Icon"
              className="logoTwo"
            />
          </motion.div>
        </Box>
      </Box>

      {/* </React.Fragment> */}
    </Grid>
  );
}

export default Item;
