import React from "react";
import { Container, StyledRect } from "./IcicleChart.style";
import { Tree } from "../data";
import { calculateRectangles } from "./utils";
import Tooltip from "@material-ui/core/Tooltip";

const IcicleChart: React.FC<{
  width: number;
  height: number;
  root: Tree;
}> = ({ width, height, root }) => {
  const rectangles = calculateRectangles(root, width, height);
  return (
    <Container>
      <svg width={width} height={height}>
        {rectangles.map((item) => (
          <Tooltip
            key={item.data.name}
            title={item.data.name}
            placement="top"
            arrow
          >
            <StyledRect
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
