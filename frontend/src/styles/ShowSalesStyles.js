import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "black",
    alignContent: "center",
    alignItems: "center",
    marginBottom: "2%",
  },
  title: {
    cursor: "pointer",
    fontFamily: "'Eczar', sans-serif",
  },
  themeTitle: {
    fontFamily: "'Eczar', sans-serif",
  },
  container: {
    marginTop: "3%",
  },
  grid: {
    alignContent: "center",
    alignItems: "center",
  },
  salesInfo: {
    marginBottom: "2%",
    fontFamily: "'Cormorant+Garamond', sans-serif",
  },
  buffer: {
    marginTop: "2%",
    marginBottom: "3%",
  },
  button: {
    marginTop: "4%",
  },
}));

export { useStyles };
