import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, LogOut, User } from 'lucide-react';

const Nav = styled.nav`
  background-color: #1e3a8a;
  padding: 0.75rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

const NavList = styled.ul<{ isOpen: boolean }>`
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
    background-color: #1e3a8a;
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

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
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
`;

const UserAvatar = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #4a5568;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const UserDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;

  @media (max-width: 768px) {
    position: static;
    background-color: transparent;
    box-shadow: none;
    display: block;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: #2d3748;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f7fafc;
  }

  @media (max-width: 768px) {
    color: white;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f7fafc;
  }

  @media (max-width: 768px) {
    color: white;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserDropdownOpen(false);
  };

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
    <Nav>
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
          <NavList isOpen={isOpen}>
            {isLoggedIn ? (
              <>
                <NavItem><NavLink to="/">Home</NavLink></NavItem>
                <NavItem><NavLink to="/learners">Learners</NavLink></NavItem>
                <NavItem><NavLink to="/roommates">Roommates</NavLink></NavItem>
                <NavItem><NavLink to="/chat">Chat</NavLink></NavItem>
                <NavItem>
                  <UserSection ref={userDropdownRef}>
                    <UserAvatar onClick={toggleUserDropdown}>
                      <User size={18} />
                    </UserAvatar>
                    <UserDropdown isOpen={isUserDropdownOpen}>
                      <DropdownItem to="/profile">My Profile</DropdownItem>
                      <LogoutButton onClick={handleLogout}>
                        <LogOut size={18} style={{ marginRight: '5px' }} />
                        Logout
                      </LogoutButton>
                    </UserDropdown>
                  </UserSection>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem><NavLink to="/about-us">About Us</NavLink></NavItem>
                <NavItem><NavLink to="/contact-us">Contact Us</NavLink></NavItem>
                <NavItem><NavLink to="/login">Login</NavLink></NavItem>
                <NavItem><NavLink to="/signup">Sign Up</NavLink></NavItem>
              </>
            )}
          </NavList>
        </NavItems>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;

