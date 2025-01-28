import React from 'react'
import styled from 'styled-components'
import { FaProjectDiagram, FaCar, FaBook, FaUserFriends, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'

const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textLight};
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  @media (min-width: 769px) {
    display: none;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  font-size: 1.5rem;
  cursor: pointer;
`

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border: none;
  background-color: ${props => props.active ? props.theme.primaryDark : 'transparent'};
  color: ${props => props.theme.textLight};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.primaryDark};
  }
`

const NavIcon = styled.span`
  margin-right: 0.75rem;
`

const HamburgerButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (min-width: 769px) {
    display: none;
  }
`

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  activeSection: string
  setActiveSection: (section: string) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, activeSection, setActiveSection }) => {
  const handleNavItemClick = (section: string) => {
    setActiveSection(section)
    setIsOpen(false)
  }

  return (
    <>
      <HamburgerButton onClick={() => setIsOpen(true)}>
        <FaBars />
      </HamburgerButton>
      <MobileMenuContainer isOpen={isOpen}>
        <CloseButton onClick={() => setIsOpen(false)}>
          <FaTimes />
        </CloseButton>
        <NavItem active={activeSection === 'projects'} onClick={() => handleNavItemClick('projects')}>
          <NavIcon><FaProjectDiagram /></NavIcon> My Projects
        </NavItem>
        <NavItem active={activeSection === 'rides'} onClick={() => handleNavItemClick('rides')}>
          <NavIcon><FaCar /></NavIcon> My Rides
        </NavItem>
        <NavItem active={activeSection === 'learningRequests'} onClick={() => handleNavItemClick('learningRequests')}>
          <NavIcon><FaBook /></NavIcon> Learning Requests
        </NavItem>
        <NavItem active={activeSection === 'roommates'} onClick={() => handleNavItemClick('roommates')}>
          <NavIcon><FaUserFriends /></NavIcon> My Roommates
        </NavItem>
        <NavItem active={activeSection === 'profile'} onClick={() => handleNavItemClick('profile')}>
          <NavIcon><FaUser /></NavIcon> My Profile
        </NavItem>
        <NavItem active={false} onClick={() => console.log('Logout')}>
          <NavIcon><FaSignOutAlt /></NavIcon> Logout
        </NavItem>
      </MobileMenuContainer>
    </>
  )
}

export default MobileMenu
