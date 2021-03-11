import React from "react";
import { Container, StyledRect } from "./IcicleChart.style";
import { Tree } from "../data";
import { calculateRectangles, NodeRect } from "./utils";
import Tooltip from "@material-ui/core/Tooltip";

const IcicleChart: React.FC<{
  width: number;
  height: number;
  root: Tree;
  tooltipLabel: (node: NodeRect) => string;
  highlightNode?: (node: NodeRect) => boolean;
}> = ({ width, height, root, highlightNode, tooltipLabel }) => {
  const rectangles = calculateRectangles(root, width, height);
  return (
    <Container>
      <svg width={width} height={height}>
        <defs>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="1" />
          </filter>
        </defs>
        {rectangles.map((item) => (
          <Tooltip
            key={item.data.name}
            title={tooltipLabel(item)}
            placement="top"
            arrow
          >
            <StyledRect
              $highlighted={highlightNode ? highlightNode(item) : false}
              x={item.y0}
              y={item.x0}
              width={item.children ? item.y1 - item.y0 : width - item.y0}
              height={item.x1 - item.x0}
            />
          </Tooltip>
        ))}
      </svg>
    </Container>
  );
};

export default IcicleChart;
