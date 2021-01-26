import { useState } from "react";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { fetchData } from "./redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import { toggled } from "./redux/actions/index";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import {
  Typography,
  Container,
  Toolbar,
  Switch,
  AppBar,
  Button,
  Paper,
  Grid,
} from "@material-ui/core";

import { useStyles } from "./styles/AddWorkerStyles";

import bgl from "./styles/bg-l.svg";
import bgd from "./styles/bg-d.svg";

function EditWorker() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  let employee = useSelector((state) => state.workers);
  let toggledTheme = useSelector((state) => state.theme);

  const elementsIndex = employee.findIndex((element) => element._id === id);

  const [editInfo, seteditInfo] = useState({
    firstName: employee[elementsIndex].firstName,
    lastName: employee[elementsIndex].lastName,
    email: employee[elementsIndex].email,
    expSales: employee[elementsIndex].expSales,
    sales: employee[elementsIndex].sales,
  });

  const handleSubmit = async () => {
    await axios({
      method: "patch",
      url: `/api/users/edit/${id}`,
      data: editInfo,
    });

    dispatch(fetchData);
    history.push("/");
  };

  return (
    <div
      style={{
        backgroundColor: toggledTheme ? "#011212" : "#0FB5B8",
        backgroundImage: toggledTheme ? `url(${bgd})` : `url(${bgl})`,
      }}
      className={classes.root}
    >
      <AppBar
        position="static"
        style={{ backgroundColor: toggledTheme ? "white" : "black" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ color: toggledTheme ? "black" : "white" }}
            onClick={() => {
              history.push("/");
            }}
          >
            Sales Administration
          </Typography>
          <Switch
            checked={toggledTheme}
            color="secondary"
            onClick={() => {
              dispatch(toggled());
              localStorage.setItem("themeData", JSON.stringify(!toggledTheme));
            }}
          />
          <Typography
            variant="subtitle1"
            className={classes.themeTitle}
            style={{ color: toggledTheme ? "black" : "white" }}
          >
            {toggledTheme ? "Dark Mode" : "Light Mode"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container} maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography variant="h4">What Did We Miss?</Typography>
          <ValidatorForm
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  label="First Name"
                  id="firtsName"
                  name="firstName"
                  type="text"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  value={editInfo.firstName}
                  required
                  fullWidth
                  onChange={(e) => {
                    seteditInfo({
                      ...editInfo,
                      firstName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  type="text"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  value={editInfo.lastName}
                  required
                  fullWidth
                  onChange={(e) => {
                    seteditInfo({
                      ...editInfo,
                      lastName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Email is not valid",
                  ]}
                  value={editInfo.email}
                  required
                  fullWidth
                  onChange={(e) => {
                    seteditInfo({
                      ...editInfo,
                      email: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  label="Expected Sales"
                  id="expSales"
                  name="expSales"
                  type="number"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  value={editInfo.expSales}
                  required
                  fullWidth
                  onChange={(e) => {
                    seteditInfo({
                      ...editInfo,
                      expSales: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color={toggledTheme ? "secondary" : "primary"}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </Button>
          </ValidatorForm>
        </Paper>
      </Container>
    </div>
  );
}

export default EditWorker;
