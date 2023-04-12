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
  const [selectedPriority, setSelectedPriority] = useState("low");

  const [titleError, setTitleError] = useState(false);
  const [titleExistsError, setTitleExistsError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);

  const handleDateChange = (date) => {
    deadlineError(false);
    setSelectedDate(date);
  };

  const handlePriorityChange = (event) => {
    if (selectedPriority === event.target.value) {
      // if the same priority is clicked, uncheck the radio button
      setSelectedPriority("");
    } else {
      // otherwise, set the selected priority to the clicked value
      setSelectedPriority(event.target.value);
    }
  };

  const handleAddTask = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = selectedDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    if (!title || title === "") {
      setTitleError(true);
      return;
    }

    if (titleExists(title)) {
      setTitleExistsError(true);
      return;
    }

    if (!description || description === "") {
      setDescriptionError(true);
      return;
    }

    if (!deadline || deadline === "") {
      setDeadlineError(true);
      return;
    }

    const newData = [
      ...data,
      {
        title: title,
        description: description,
        deadline: deadline,
        priority: selectedPriority,
        isComplete: false,
      },
    ];

    setData(newData);

    handleClose();
  };

  const titleExists = (title) => {
    let exists = false;
    data.forEach((element) => {
      if (element.title === title) exists = true;
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
          <TextField
            id="title"
            placeholder="Title"
            error={titleError}
            helperText={
              titleError
                ? "Title is required!"
                : titleExistsError
                ? "Title already exists"
                : ""
            }
          ></TextField>
          <TextField
            id="description"
            placeholder="Description"
            error={descriptionError}
            helperText={descriptionError ? "Description is required" : ""}
          ></TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="deadline"
              label="Deadline"
              value={selectedDate}
              onChange={handleDateChange}
              error={deadlineError}
              helperText={deadlineError ? "Deadline is required" : ""}
            />
          </LocalizationProvider>
          <FormLabel id="radioLabel">Priority</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radioLabel"
            value={selectedPriority}
            onChange={handlePriorityChange}
          >
            <FormControlLabel
              value="low"
              control={<Radio />}
              label="Low"
              checked={selectedPriority === "low"} // set checked prop to true if "Low" is selectedchecked="true"
            />
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
