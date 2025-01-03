import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <LayoutContainer>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;

