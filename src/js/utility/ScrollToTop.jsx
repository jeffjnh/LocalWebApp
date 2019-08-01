import React from "react";
import styled from 'styled-components';

const ScrollToTop = styled.div`
  position: fixed;
  display: inline-block;
  right: 0;
  bottom: 0;
  margin: 1rem;
  color: white;
  text-align: center;
  line-height: 1.2;
  cursor: pointer;

  &:hover {
    transform: translate3D(0, -2px, 0);
  }
`;

export function scrollToTop() {
  return (
    <ScrollToTop
      onClick={() => {
        document.getElementById("root").scrollIntoView(true);
      }}
    >
      <div style={{ fontSize: "10px" }}>&#x25b2;</div>
      (Top)
    </ScrollToTop>
  );
}
