import React from "react";
import "./App.css";
import IcicleChart from "./IcicleChart";
import { household, formatCurrency } from "./data";

function App() {
  return (
    <div className="App">
      <h2>Example</h2>
      <IcicleChart
        width={600}
        height={600}
        root={household}
        tooltipLabel={(node) =>
          `${node.data.name} ${formatCurrency(node.value || 0)}`
        }
      />
      <h2>Education and Electricity</h2>
      <IcicleChart
        width={600}
        height={600}
        root={household}
        highlightNode={(node) =>
          ["Electricity", "Education"].includes(node.data.name)
        }
        tooltipLabel={(node) => `${node.data.name} $${node.data.value}`}
      />
    </div>
  );
}

export default App;
