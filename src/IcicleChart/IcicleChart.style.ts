import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const StyledRect = styled.rect<{ $highlighted: boolean }>`
  fill: ${(props) => (props.$highlighted ? "#666" : "#aaa")};
  ${(props) =>
    props.$highlighted
      ? `
  filter:url(#shadow);
  `
      : ""}
`;
