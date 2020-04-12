/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";

import { PostcodeLookup } from "./lib";

const App = () => (
  <>
    <PostcodeLookup />
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
