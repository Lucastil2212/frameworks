import React from "react";
import {
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function BannerBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ margin: "auto" }}>
          <IconButton size="large" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FRAMEWORKS
          </Typography>
          <Button sx={{ marginLeft: "160%" }} color="inherit">
            <AddCircleIcon />
            ADD
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
