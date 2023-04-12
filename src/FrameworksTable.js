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
  const [dataToRemove, setDataToRemove] = useState([]);

  const removeData = () => {
    const newData = [...data];

    const indexesToRemove = newData
      .map((row, index) => {
        if (dataToRemove.find((r) => r.title === row.title)) {
          return index;
        }
        return -1;
      })
      .filter((i) => i !== -1);

    indexesToRemove.reverse().forEach((i) => {
      newData.splice(i, 1);
    });

    setData(newData);
    setDataToRemove([]);
  };

  const addToRemove = (row, clicked) => {
    if (!clicked) {
      setDataToRemove(dataToRemove.filter((r) => r.title !== row.title));
    } else {
      setDataToRemove([...dataToRemove, row]);
    }
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
                  onChange={(e) => addToRemove(row, e.target.checked)}
                ></Checkbox>
              </TableCell>
              <TableCell align="right">
                <div style={{ display: "block" }}>
                  <Button
                    id="update"
                    color="primary"
                    variant="contained"
                    onClick={() => removeData()}
                  >
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
