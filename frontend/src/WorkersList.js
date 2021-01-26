import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./redux/actions/index";
import { toggled } from "./redux/actions/index";
import axios from "axios";

import { useHistory } from "react-router-dom";

import {
  ListItemText,
  Typography,
  Container,
  ListItem,
  Toolbar,
  Divider,
  AppBar,
  Switch,
  Button,
  Paper,
  Grid,
  List,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useStyles } from "./styles/WorkersListStyles";

import bgl from "./styles/bg-l.svg";
import bgd from "./styles/bg-d.svg";

function WorkersList() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  let toggledTheme = useSelector((state) => state.theme);
  let employeeList = useSelector((state) => state.workers);

  const [list, setList] = useState({
    flag: false,
    data: [],
  });

  useEffect(() => {
    const FetchData = async () => {
      setList({
        flag: true,
        data: employeeList,
      });
    };
    FetchData();
  }, [employeeList]);

  const deleteWorker = async (id) => {
    await axios.delete(`/api/users/${id}`);
    dispatch(fetchData);
  };

  if (employeeList === null) {
    return <h1>Loading</h1>;
  } else {
    console.log(list);
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
                localStorage.setItem(
                  "themeData",
                  JSON.stringify(!toggledTheme)
                );
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
        <Container className={classes.container} maxWidth="lg">
          <Grid container spacing={6}>
            <Grid className={classes.grid} item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <Typography variant="h4">Welcome Back</Typography>
                <Divider />
                <Button
                  className={classes.button}
                  fullWidth
                  variant="contained"
                  color={toggledTheme ? "secondary" : "primary"}
                  onClick={() => {
                    history.push("/add");
                  }}
                >
                  Add New Employee
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <Typography variant="h5">List of Employees</Typography>
                <List>
                  {employeeList.map((e) => (
                    <ListItem key={e._id} button>
                      <ListItemText
                        onClick={() => {
                          history.push(`/employee/${e._id}`);
                        }}
                        primary={`${e.firstName} ${e.lastName}`}
                        secondary={`ID: ${e._id}`}
                      />
                      <EditIcon
                        onClick={() => history.push(`/edit/${e._id}`)}
                      />
                      <DeleteIcon onClick={() => deleteWorker(e._id)} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default WorkersList;
