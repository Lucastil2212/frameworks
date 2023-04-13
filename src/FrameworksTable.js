import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Checkbox,
  Button,
  Container,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelIcon from "@mui/icons-material/Cancel";

export default function FrameworksTable({
  setData,
  data,
  setFormData,
  setOpen,
  setOpenToaster,
  setToasterMessage,
}) {
  const removeData = (title) => {
    const newData = [...data];

    const i = newData.map((row, index) => {
      if (newData.find((r) => r.title === row.title)) {
        return index;
      }
    });

    newData.splice(i, 1);

    setData(newData);

    setOpenToaster(true);
    setToasterMessage("Succesfully deleted row!");
  };

  const updateData = (data) => {
    setOpen(true);
    setFormData({
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
    });
  };

  const checkedBox = (title, checked) => {
    const newData = [...data];

    let i = -1;

    newData.forEach((row, index) => {
      if (row.title === title) {
        i = index;
      }
    });

    newData[i].isComplete = checked;
    setData(newData);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Is Complete</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.deadline}</TableCell>
              <TableCell align="right">{row.priority}</TableCell>
              <TableCell align="right">
                <Checkbox
                  onChange={(e) => checkedBox(row.title, e.target.checked)}
                ></Checkbox>
              </TableCell>
              <TableCell align="right">
                <Container
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {row.isComplete ? null : (
                    <Button
                      id="update"
                      color="primary"
                      variant="contained"
                      onClick={() => updateData(row)}
                      sx={{ margin: "2% 20%" }}
                    >
                      <EditNoteIcon />
                      &nbsp; UPDATE
                    </Button>
                  )}
                  <Button
                    id="delete"
                    color="error"
                    variant="contained"
                    onClick={() => removeData(row.title)}
                    sx={{ margin: "0% 20%" }}
                  >
                    <CancelIcon />
                    &nbsp; DELETE
                  </Button>
                </Container>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
