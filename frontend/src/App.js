import { BrowserRouter, Route, Switch } from "react-router-dom";
import WorkersList from "./WorkersList";
import ShowSales from "./ShowSales";
import AddWorker from "./AddWorker";
import AddSale from "./AddSale";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <WorkersList {...routeProps} />}
        />
        <Route
          exact
          path="/employee/:id"
          render={(routeProps) => <ShowSales {...routeProps} />}
        />
        <Route
          exact
          path="/add"
          render={(routeProps) => <AddWorker {...routeProps} />}
        />
        <Route
          exact
          path="/sales/:id"
          render={(routeProps) => <AddSale {...routeProps} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
