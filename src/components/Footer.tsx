import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface FooterProps {
  isDarkMode: boolean;
}

const FooterContainer = styled.footer<{ isDarkMode: boolean }>`
  background-color: ${props => (props.isDarkMode ? '#1a202c' : '#1e3a8a')};
  color: ${props => (props.isDarkMode ? '#e2e8f0' : 'white')};
  padding: 1rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const FooterLink = styled(Link)<{ isDarkMode: boolean }>`
  color: ${props => (props.isDarkMode ? '#e2e8f0' : 'white')};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <FooterContainer isDarkMode={isDarkMode}>
      <FooterContent>
        <div>© {new Date().getFullYear()} PeerPal. All rights reserved.</div>
        <FooterLinks>
          <FooterLink to="/about" isDarkMode={isDarkMode}>
            About Us
          </FooterLink>
          <FooterLink to="/contact" isDarkMode={isDarkMode}>
            Contact Us
          </FooterLink>
        </FooterLinks>
        <div>Powered by PayPal</div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
