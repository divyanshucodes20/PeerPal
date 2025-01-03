import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animation for spinning
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Loader Container Styling
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent overlay
  z-index: 1000;
`;

// Spinning Circle Styling
const Spinner = styled.div`
  border: 6px solid #f3f3f3; /* Light background */
  border-top: 6px solid #3182ce; /* Primary color */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export default Loader;
