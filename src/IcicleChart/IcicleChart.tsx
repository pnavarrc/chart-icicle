import React from "react";
import { range, uniq, sortBy } from "lodash";
import { Container, StyledRect } from "./IcicleChart.style";
import { Tree } from "../data";
import { calculateRectangles, NodeRect } from "./utils";
import Tooltip from "@material-ui/core/Tooltip";
import TextBox from "./TextBox";
import { interpolateRainbow } from "d3-scale-chromatic";
import { scaleOrdinal } from "@visx/scale";

const getCategory = (node: NodeRect) => {
  let d = node;
  while (d.depth > 1) {
    d = d.parent ?? d;
  }
  return d.data.name;
};

const IcicleChart: React.FC<{
  width: number;
  height: number;
  root: Tree;
  tooltipLabel: (node: NodeRect) => string;
  highlightNode?: (node: NodeRect) => boolean;
}> = ({ width, height, root, highlightNode, tooltipLabel }) => {
  const rectangles = calculateRectangles(root, width, height);

  const categories = uniq(rectangles.map(getCategory));

  const quantizedCategory = scaleOrdinal({
    domain: categories,
    range: range(0, 1, 1 / (categories.length + 1)),
  });

  const rectColor = (d: NodeRect) => {
    const category = getCategory(d);
    const t = quantizedCategory(category);
    return d.depth === 0 ? "#999" : interpolateRainbow(t);
  };

  const isHighlighted = (item: NodeRect) =>
    highlightNode ? highlightNode(item) : false;

  return (
    <Container>
      <svg width={width} height={height}>
        <defs>
          <filter id="shadow">
            <feDropShadow dx="5" dy="5" stdDeviation="5" />
          </filter>
        </defs>
        {sortBy(rectangles, (item: NodeRect) => isHighlighted(item)).map(
          (item) => {
            const highligted = isHighlighted(item);
            const rectWidth = item.children
              ? item.y1 - item.y0
              : width - item.y0;
            const rectHeight = item.x1 - item.x0;
            return (
              <Tooltip
                key={item.data.name}
                title={tooltipLabel(item)}
                placement="top"
                arrow
              >
                <g transform={`translate(${item.y0}, ${item.x0})`}>
                  <StyledRect
                    $highlighted={isHighlighted(item)}
                    width={rectWidth}
                    height={rectHeight}
                    fill={rectColor(item)}
                    fillOpacity={highligted ? 1 : 0.6}
                    stroke={rectColor(item)}
                    strokeWidth={highligted ? 1 : 0}
                    strokeOpacity={highligted ? 1 : 0}
                    transform={
                      highligted ? `translate(-10, -10)scale(1, 2)` : ""
                    }
                  />
                  <g transform={highligted ? `translate(-5, -5)` : ""}>
                    <TextBox
                      width={rectWidth}
                      height={rectHeight}
                      text={tooltipLabel(item)}
                    />
                  </g>
                </g>
              </Tooltip>
            );
          }
        )}
      </svg>
    </Container>
  );
};

export default IcicleChart;
