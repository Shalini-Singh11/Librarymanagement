import React from "react";
import { Box } from "@mui/material";
import {
  containerFluidStyles,
  upStyles,
  downStyles,
  leftStyles,
  rightStyles,
  keyframes,
} from "./style";

const mainanimations = () => {
  return (
    <>
      <style>{keyframes}</style>
      <Box sx={containerFluidStyles}>
        <Box id="up" sx={upStyles}></Box>
        <Box id="down" sx={downStyles}></Box>
        <Box id="left" sx={leftStyles}></Box>
        <Box id="right" sx={rightStyles}></Box>
      </Box>
    </>
  );
};

export default mainanimations;
