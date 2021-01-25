import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggled } from "./redux/actions/index";
import { v4 as uuidv4 } from "uuid";

import {
  LinearProgress,
  ListItemText,
  Typography,
  Container,
  ListItem,
  Toolbar,
  Switch,
  AppBar,
  Button,
  Paper,
  Grid,
} from "@material-ui/core";

import { useStyles } from "./styles/ShowSalesStyles";

import bgl from "./styles/bg-l.svg";
import bgd from "./styles/bg-d.svg";

function ShowSales() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const dispatch = useDispatch();

  let toggledTheme = useSelector((state) => state.theme);
  let employee = useSelector((state) => state.workers);

  if (employee === null) {
    return <h1>Loading</h1>;
  } else {
    const elementsIndex = employee.findIndex((element) => element._id === id);

    let totalSold = 0;
    if (employee[elementsIndex].sales.length > 0) {
      for (let i = 0; i < employee[elementsIndex].sales.length; i++) {
        totalSold += parseInt(employee[elementsIndex].sales[i].qty);
      }
    }

    const progress =
      (totalSold / parseInt(employee[elementsIndex].expSales)) * 100;

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
          <Grid container spacing={3}>
            <Grid className={classes.grid} item xs={12} sm={3}>
              <Paper className={classes.paper}>
                <Typography variant="h5">
                  <div>{employee[elementsIndex].firstName}</div>
                  <div>{employee[elementsIndex].lastName}</div>
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                  color={toggledTheme ? "secondary" : "primary"}
                  onClick={() => {
                    history.push(`/sales/${id}`);
                  }}
                >
                  Add Sale
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper className={classes.paper}>
                <Typography className={classes.salesInfo} variant="h5">
                  Total sales
                </Typography>

                <Typography
                  className={classes.salesInfo}
                  variant="body1"
                >{`$${totalSold} / $${employee[elementsIndex].expSales}`}</Typography>
                <div>
                  <LinearProgress
                    className={classes.buffer}
                    color={toggledTheme ? "secondary" : "primary"}
                    variant="determinate"
                    value={progress > 100 ? 100 : progress}
                  />
                </div>
              </Paper>

              <Paper className={classes.paper}>
                <Typography variant="h5">Sales Log</Typography>
                {employee[elementsIndex].sales.map((l) => (
                  <ListItem key={uuidv4()}>
                    <ListItemText
                      primary={`Quantity: $${l.qty}`}
                      secondary={`Date: ${l.date}`}
                    />
                  </ListItem>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ShowSales;
