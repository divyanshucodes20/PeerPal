import type React from "react"
import styled from "styled-components"
import { FaProjectDiagram, FaCar, FaBook, FaUserFriends, FaUser, FaSignOutAlt } from "react-icons/fa"

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.textLight};
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`

const Logo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border: none;
  background-color: ${(props) => (props.active ? props.theme.primaryDark : "transparent")};
  color: ${(props) => props.theme.textLight};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`

const NavIcon = styled.span`
  margin-right: 0.75rem;
`

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <SidebarContainer>
      <Logo>Dashboard</Logo>
      <NavItem active={activeSection === "projects"} onClick={() => setActiveSection("projects")}>
        <NavIcon>
          <FaProjectDiagram />
        </NavIcon>{" "}
        My Projects
      </NavItem>
      <NavItem active={activeSection === "rides"} onClick={() => setActiveSection("rides")}>
        <NavIcon>
          <FaCar />
        </NavIcon>{" "}
        My Rides
      </NavItem>
      <NavItem active={activeSection === "learningRequests"} onClick={() => setActiveSection("learningRequests")}>
        <NavIcon>
          <FaBook />
        </NavIcon>{" "}
        Learning Requests
      </NavItem>
      <NavItem active={activeSection === "roommates"} onClick={() => setActiveSection("roommates")}>
        <NavIcon>
          <FaUserFriends />
        </NavIcon>{" "}
        My Roommates
      </NavItem>
      <NavItem active={activeSection === "profile"} onClick={() => setActiveSection("profile")}>
        <NavIcon>
          <FaUser />
        </NavIcon>{" "}
        My Profile
      </NavItem>
      <NavItem active={false} onClick={() => console.log("Logout")}>
        <NavIcon>
          <FaSignOutAlt />
        </NavIcon>{" "}
        Logout
      </NavItem>
    </SidebarContainer>
  )
}

export default Sidebar

