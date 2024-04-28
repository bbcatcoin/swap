import { Button } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const LaunchButton = ({ sx = {}, ...props }) => {
  return (
    <Button target="_blank" href="https://app.uniswap.org/swap" arrow fit variant="contained" sx={{ borderRadius: 4, ...sx }} {...props}>
     BUY NOW
    </Button>
  );
};

export default LaunchButton;
