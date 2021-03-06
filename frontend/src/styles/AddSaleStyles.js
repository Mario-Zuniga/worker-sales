import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    width: "auto",
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    cursor: "pointer",
    fontFamily: "'Eczar', sans-serif",
  },
  themeTitle: {
    fontFamily: "'Eczar', sans-serif",
  },
  form: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, -2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
  container: {
    marginTop: "3%",
  },
}));

export { useStyles };
