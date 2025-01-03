import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 8rem;
  color: #ff6b6b;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  margin: 0;
  color: #333;
`;

const ErrorMessage = styled.h3`
  font-size: 2rem;
  color: #555;
  margin-bottom: 1rem;
`;

const BackLink = styled(Link)`
  padding: 0.8rem 1.6rem;
  background-color: #3182ce;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 1rem;

  &:hover {
    background-color: #2b6cb0;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorIcon>🚫</ErrorIcon>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Page Not Found</ErrorMessage>
      <BackLink to="/">Go Back to Home</BackLink>
    </NotFoundContainer>
  );
};

export default NotFound;
