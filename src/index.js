import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {createRoot} from 'react-dom/client';

// import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";
import App from "./App";

// import Loader from "./components/Loader";
// const App = lazy(async () => {
//   const [moduleExports] = await Promise.all([
//     import("./App"),
//     new Promise((resolve) => setTimeout(resolve, 3000)),
//   ]);
//   return moduleExports;
// });
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
