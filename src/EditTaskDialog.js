import React, { useState, useEffect, useRef } from "react";
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

export default function EditTaskDialog({
  handleClose,
  open,
  data,
  setData,
  formData,
  setFormData,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPriority, setSelectedPriority] = useState("low");

  const [titleError, setTitleError] = useState(false);
  const [titleExistsError, setTitleExistsError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);

  const [add, setAdd] = useState(true);

  const handleTitleChange = (event) => {
    setTitleError(false);
    setTitleExistsError(false);
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescriptionError(false);
    setDescription(event.target.value);
  };
  const handleDateChange = (date) => {
    setDeadlineError(false);

    setSelectedDate(date);
    setFormData({});
  };

  useEffect(() => {
    if (Object.keys(formData).length === 0) {
      setAdd(true);
    } else {
      setTitle(formData.title);
      setDescription(formData.description);
      const dateString = formData.deadline;
      const parts = dateString.split("/");
      const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);
      setSelectedDate(dateObject);
      setSelectedPriority(formData.priority);
      setAdd(false);
    }
  }, [formData]);

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
    const deadline = selectedDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    if (!title || title === "") {
      setTitleError(true);
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
    if (add) {
      if (titleExists(title)) {
        setTitleExistsError(true);
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
    } else {
      const newData = [...data];

      const i = newData.map((row, index) => {
        if (newData.find((r) => r.title === title)) {
          return index;
        }
      });

      console.log(i);
      newData[i] = {
        title: title,
        description: description,
        deadline: deadline,
        priority: selectedPriority,
        isComplete: false,
      };

      console.log(newData);
      setData(newData);
      setAdd(true);
    }

    handleOnClose();
  };

  const titleExists = (title) => {
    let exists = false;
    data.forEach((element) => {
      if (element.title === title) exists = true;
    });

    return exists;
  };
  const handleOnClose = () => {
    handleClose();
    setTitleError(false);
    setTitleExistsError(false);
    setDescriptionError(false);
    setDeadlineError(false);
    setTitle("");
    setDescription("");
    setSelectedDate(new Date());
    setSelectedPriority("low");
  };
  return (
    <Dialog onClose={handleOnClose} open={open}>
      <DialogTitle>
        <BorderColorIcon />
        Edit Task
      </DialogTitle>
      <Container>
        <FormControl>
          <TextField
            id="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            error={titleError || titleExistsError}
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
            value={description}
            onChange={handleDescriptionChange}
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
            <Button color="error" variant="contained" onClick={handleOnClose}>
              <DoDisturbIcon />
              &nbsp; Cancel
            </Button>
          </div>
        </FormControl>
      </Container>
    </Dialog>
  );
}
