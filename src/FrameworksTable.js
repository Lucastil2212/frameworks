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
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelIcon from "@mui/icons-material/Cancel";

export default function FrameworksTable({ setData, data }) {
  const removeData = (title) => {
    const newData = [...data];

    const i = newData.map((row, index) => {
      if (newData.find((r) => r.title === row.title)) {
        return index;
      }
    });

    newData.splice(i, 1);

    setData(newData);
  };

  const updateData = (data) => {
    return;
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
        </TableHead>{" "}
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
                <div style={{ display: "block" }}>
                  {row.isComplete ? null : (
                    <Button
                      id="update"
                      color="primary"
                      variant="contained"
                      onClick={() => updateData(row)}
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
                  >
                    <CancelIcon />
                    &nbsp; DELETE
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
