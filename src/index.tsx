import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import App from "./App";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

// Create a root for rendering the React app
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Configure the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});


/**
 * Render the app components within the root.
 * The Redux Provider component provide access to the store accross the app.
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
