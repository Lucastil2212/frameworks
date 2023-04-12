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
  const [selectedPriority, setSelectedPriority] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleAddTask = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = selectedDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    if (!title || title == "") {
      return;
    }

    if (titleExists(title)) {
      return;
    }

    if (!description || description == "") {
      return;
    }

    if (!deadline || deadline == "") {
      return;
    }

    if (!selectedPriority || selectedPriority == "") {
      return;
    }

    const newData = [
      ...data,
      {
        title: title,
        description: description,
        deadline: deadline,
        priority: selectedPriority,
      },
    ];

    setData(newData);

    handleClose();
  };

  const titleExists = (title) => {
    let exists = false;
    data.array.forEach((element) => {
      if (element.find((r) => r.title === title)) exists = true;
    });

    return exists;
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
          <RadioGroup
            row
            aria-labelledby="radioLabel"
            value={selectedPriority}
            onChange={handlePriorityChange}
          >
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
