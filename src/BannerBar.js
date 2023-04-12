import React, { useState } from "react";
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
import Dialog from "./EditTaskDialog";
import Table from "./FrameworksTable";

export default function BannerBar() {
  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

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
          <Button
            sx={{ marginLeft: "160%" }}
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <AddCircleIcon />
            ADD
          </Button>
        </Toolbar>
      </AppBar>
      <Table setData={setData} data={data} />
      <Dialog
        handleClose={handleClose}
        open={open}
        data={data}
        setData={setData}
      />
    </Box>
  );
}
