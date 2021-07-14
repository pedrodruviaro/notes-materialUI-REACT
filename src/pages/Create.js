import React from "react";
import {
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Container,
} from "@material-ui/core";
import { KeyboardArrowRightRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("todos");

  //error
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }

    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title,
          details,
          category,
        }),
      }).then(() => history.push("/")); //redirect
    }
    console.log(history)
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel control={<Radio />} value="money" label="Money" />
            <FormControlLabel control={<Radio />} value="todos" label="Todos" />
            <FormControlLabel
              control={<Radio />}
              value="reminder"
              label="Reminder"
            />
            <FormControlLabel control={<Radio />} value="work" label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
