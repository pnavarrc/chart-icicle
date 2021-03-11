import React from "react";
import "./App.css";
import IcicleChart from "./IcicleChart";
import { household } from "./data";

function App() {
  return (
    <div className="App">
      <h2>Example</h2>
      <IcicleChart width={600} height={600} root={household} />
    </div>
  );
}

export default App;
