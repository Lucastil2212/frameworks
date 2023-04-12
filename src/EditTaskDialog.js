import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  FormControl,
  TextField,
  Container,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Button,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

export default function EditTaskDialog({ handleClose, open, data, setData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleAddTask = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = selectedDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const priorityRadio = document.querySelector(
      'input[name="priority"]:checked'
    );
    const priority = priorityRadio ? priorityRadio.value : "";

    const newData = [
      ...data,
      {
        title: title,
        description: description,
        deadline: deadline,
        priority: priority,
      },
    ];

    setData(newData);

    handleClose();
  };

  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <DialogTitle>
        <BorderColorIcon />
        Edit Task
      </DialogTitle>
      <Container>
        <FormControl>
          <TextField id="title" placeholder="Title"></TextField>
          <TextField id="description" placeholder="Description"></TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="deadline"
              label="Deadline"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <FormLabel id="radioLabel">Priority</FormLabel>
          <RadioGroup row aria-labelledby="radioLabel">
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
          <div>
            <Button color="primary" variant="contained" onClick={handleAddTask}>
              <AddCircleIcon />
              &nbsp; Add
            </Button>
            <Button color="error" variant="contained" onClick={handleClose}>
              <DoDisturbIcon />
              &nbsp; Cancel
            </Button>
          </div>
        </FormControl>
      </Container>
    </Dialog>
  );
}
