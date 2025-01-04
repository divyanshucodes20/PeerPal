import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, LogOut, User, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isUserLoggedIn?: boolean;
}

interface StyledProps {
  isDarkMode: boolean;
  isActive?: boolean;
}

const Nav = styled.nav<StyledProps>`
  background-color: ${props => props.isDarkMode ? '#1a202c' : '#1e3a8a'};
  padding: 0.75rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul<{ isOpen: boolean } & StyledProps>`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.isDarkMode ? '#2d3748' : '#1e3a8a'};
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const NavItem = styled.li`
  margin: 0 10px;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NavLink = styled(Link)<StyledProps>`
  color: ${props => props.isDarkMode ? '#e2e8f0' : 'white'};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  background-color: ${props => props.isActive ? (props.isDarkMode ? '#4a5568' : '#3b82f6') : 'transparent'};

  &:hover {
    background-color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const UserSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.button<StyledProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.isDarkMode ? '#4a5568' : '#4a5568'};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-left: 10px;
`;

const UserDropdown = styled.div<{ isOpen: boolean } & StyledProps>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${props => props.isDarkMode ? '#2d3748' : 'white'};
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const DropdownItem = styled(Link)<StyledProps>`
  display: block;
  padding: 0.5rem 1rem;
  color: ${props => props.isDarkMode ? '#e2e8f0' : '#2d3748'};
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.isDarkMode ? '#4a5568' : '#f7fafc'};
  }
`;

const LogoutButton = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: ${props => props.isDarkMode ? '#fc8181' : '#e74c3c'};
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.isDarkMode ? '#4a5568' : '#f7fafc'};
  }
`;

const ThemeToggle = styled.button<StyledProps>`
  background: none;
  border: none;
  color: ${props => props.isDarkMode ? '#e2e8f0' : 'white'};
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const Navigation: React.FC<NavigationProps> = ({ isDarkMode, toggleTheme, isUserLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Nav isDarkMode={isDarkMode}>
      <NavContainer>
        <Logo to="/">
          <LogoImage
            src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735829230/Screenshot_2025-01-02_201352_qz8j84.png"
            alt="PeerPal Logo"
          />
          PeerPal
        </Logo>
        <NavItems>
          <HamburgerButton onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </HamburgerButton>
          <NavList isOpen={isOpen} isDarkMode={isDarkMode}>
            {isUserLoggedIn ? (
              <>
                <NavItem>
                  <NavLink to="/" isDarkMode={isDarkMode} isActive={location.pathname === '/'}>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/learners" isDarkMode={isDarkMode} isActive={location.pathname === '/learners'}>
                    Learners
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/roommates" isDarkMode={isDarkMode} isActive={location.pathname === '/roommates'}>
                    Roommates
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/rides" isDarkMode={isDarkMode} isActive={location.pathname === '/rides'}>
                    Ride Sharing
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/chat" isDarkMode={isDarkMode} isActive={location.pathname === '/chat'}>
                    Chat
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/goals" isDarkMode={isDarkMode} isActive={location.pathname === '/goals'}>
                    Goals
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink to="/about" isDarkMode={isDarkMode} isActive={location.pathname === '/about'}>
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/contact" isDarkMode={isDarkMode} isActive={location.pathname === '/contact'}>
                    Contact Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/login" isDarkMode={isDarkMode} isActive={location.pathname === '/login'}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/signup" isDarkMode={isDarkMode} isActive={location.pathname === '/signup'}>
                    Sign Up
                  </NavLink>
                </NavItem>
              </>
            )}
          </NavList>
          {isUserLoggedIn && (
            <UserSection ref={userDropdownRef}>
            <UserAvatar onClick={toggleUserDropdown} isDarkMode={isDarkMode}>
              <User size={18} />
            </UserAvatar>
            <UserDropdown isOpen={isUserDropdownOpen} isDarkMode={isDarkMode}>
              <DropdownItem to="/profile" isDarkMode={isDarkMode}>My Profile</DropdownItem>
              <DropdownItem to="/my-learning-requests" isDarkMode={isDarkMode}>My Learning Requests</DropdownItem>
              <DropdownItem to="/my-roommate-requests" isDarkMode={isDarkMode}>My Roommate Requests</DropdownItem>
              <DropdownItem to="/my-ride-requests" isDarkMode={isDarkMode}>My Ride Requests</DropdownItem>
              <LogoutButton onClick={() => alert('Logged out!')} isDarkMode={isDarkMode}>
                <LogOut size={18} style={{ marginRight: '5px' }} />
                Logout
              </LogoutButton>
            </UserDropdown>
          </UserSection>
          )}
          <ThemeToggle onClick={toggleTheme} isDarkMode={isDarkMode}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </ThemeToggle>
        </NavItems>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;