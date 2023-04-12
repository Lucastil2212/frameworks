import React, { useEffect } from "react";
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

export default function FrameworksTable({ data }) {
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
                <Checkbox></Checkbox>
              </TableCell>
              <TableCell align="right">
                <div style={{ display: "block" }}>
                  <Button id="update" color="primary" variant="contained">
                    <EditNoteIcon />
                    &nbsp; UPDATE
                  </Button>
                  <Button id="delete" color="error" variant="contained">
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
