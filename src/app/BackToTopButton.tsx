"use client";
import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTopButton && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            background: "linear-gradient(to right, #f7ae1a, #e09e16)",
          }}
          onClick={scrollUp}
        >
          <ArrowDropUpIcon />
        </Fab>
      )}
    </div>
  );
}

export default BackToTopButton;
