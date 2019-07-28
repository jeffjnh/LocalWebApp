import React from "react";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

export function getLoadingSpinner_Left() {
  return (
    <div style={{ padding: "3rem" }}>
      <Spinner
        animation="border"
        role="status"
        style={{ width: "2rem", height: "2rem" }}
      />
      <div
        style={{
          display: "inline-block",
          paddingLeft: "10px",
          verticalAlign: "center"
        }}
      >
        Loading...
      </div>
    </div>
  );
}

const CenteredWrapper = styled.div`
  position: relative;

  .center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

// text centered to spinner
export function getLoadingSpinner_CenteredText() {
  return (
    <CenteredWrapper>
      <div className="center">Loading...</div>
      <Spinner
        animation="border"
        role="status"
        style={{ width: "8rem", height: "8rem" }}
      />
    </CenteredWrapper>
  );
}
