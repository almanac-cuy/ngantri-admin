import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Keranjang from "./Components/Keranjang";
// import DetailProduk from "./Components/DetailProduk";
// import Kategori from "./Components/Kategori";
// import Modal1 from "./Components/Modal1";
import Admin from "./Components/Admin";
import Login from "./Components/Pages/Login";
const EnhancedApp = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/admin/" exact component={Admin} />
      </div>
    </Router>
  );
};

ReactDOM.render(<EnhancedApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
