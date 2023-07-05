import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./contexts/PrivateRoute";
import Login from "./organism/Login";
import NewPass from "./organism/NewPass";
import Dashboard from "./organism/Dashboard";
import HistoryOfTickets from "./organism/HistoryOfTickets";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/history" component={HistoryOfTickets} />
          <PrivateRoute path="/new" component={NewPass} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
