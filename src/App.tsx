import React from "react";
import "./App.css";
import IcicleChart from "./IcicleChart";
import { household, formatCurrency } from "./data";
import { NodeRect } from "./IcicleChart/utils";

const tooltipLabel = (node: NodeRect) =>
  `${node.data.name} ${formatCurrency(node.value || 0)}`;

function App() {
  return (
    <div className="App">
      <h2>Example</h2>
      <IcicleChart
        width={600}
        height={600}
        root={household}
        tooltipLabel={tooltipLabel}
      />
      <h2>Education and Electricity</h2>
      <IcicleChart
        width={600}
        height={600}
        root={household}
        highlightNode={(node) =>
          ["Electricity", "Education"].includes(node.data.name)
        }
        tooltipLabel={tooltipLabel}
      />
    </div>
  );
}

export default App;
