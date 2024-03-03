import React from "react";

//import utils
import Route from "./Routes";

//import components
import { ToastContainer } from "react-toastify";

//import Scss
import "./assets/scss/themes.scss";
import "./custom-sass/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <React.Fragment>
      <Route />
      <ToastContainer autoClose={3000} rtl={true} />
    </React.Fragment>
  );
}

export default App;
