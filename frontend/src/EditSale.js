import { useState } from "react";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { fetchData } from "./redux/actions/index";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggled } from "./redux/actions/index";
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

import { useStyles } from "./styles/AddSaleStyles";

import bgl from "./styles/bg-l.svg";
import bgd from "./styles/bg-d.svg";

function EditSale() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { wId, sId } = useParams();
  console.log(wId);
  console.log(sId);

  let toggledTheme = useSelector((state) => state.theme);
  let employee = useSelector((state) => state.workers);

  const elementsIndex = employee.findIndex((element) => element._id === wId);
  const specificSale = employee[elementsIndex].sales.findIndex(
    (element) => element.id === sId
  );

  const [newSale, setNewSale] = useState({
    id: employee[elementsIndex].sales[specificSale].id,
    date: employee[elementsIndex].sales[specificSale].date,
    qty: employee[elementsIndex].sales[specificSale].qty,
  });

  const handleSubmit = async () => {
    let allSales = employee[elementsIndex].sales;

    allSales[specificSale] = newSale;

    var bodyFormData = new FormData();
    bodyFormData.append("sales", allSales);

    const newSales = {
      sales: allSales,
    };
    console.log(newSales);
    await axios({
      method: "patch",
      url: `/api/users/${wId}`,
      data: newSales,
    });
    dispatch(fetchData);
    history.push(`/employee/${wId}`);
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
          <Typography variant="h4">Let's Fix That Error!</Typography>
          <ValidatorForm
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  label="New Sale"
                  id="newSale"
                  name="newSale"
                  type="number"
                  value={newSale.qty}
                  required
                  fullWidth
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  onChange={(e) => {
                    setNewSale({
                      ...newSale,
                      qty: parseInt(e.target.value),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  id="date"
                  label="Date of Sale"
                  type="date"
                  className={classes.textField}
                  value={newSale.date}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setNewSale({
                      ...newSale,
                      date: e.target.value,
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
              Update Sale
            </Button>
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={() => {
                history.push(`/employee/${wId}`);
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

export default EditSale;
