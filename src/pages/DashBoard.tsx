import React, { useState } from 'react'
import styled from 'styled-components'
import Projects from './MyProjects'
import MobileMenu from '../components/dashbaordSection/MobileMenu'
import Sidebar from '../components/dashbaordSection/Sidebar'
import { useNavigate } from 'react-router-dom'
import Rides from './MyRides'
import Roommates from './MyRoommateRequest'
import LearningRequests from './MyLearningRequests'

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`

const Dashboard: React.FC = () => {
    const navigate=useNavigate();
  const [activeSection, setActiveSection] = useState('projects')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const renderSection = () => {
    switch (activeSection) {
      case 'projects':
        return <Projects />
      case 'rides':
        return <Rides />
      case 'learningRequests':
        return <LearningRequests/>
      case 'roommates':
        return <Roommates />
      case 'profile':
        navigate('/profile')
        return null
      default:
        return <Projects/>
    }
  }

  return (
    <DashboardContainer>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MainContent>
        {renderSection()}
      </MainContent>
    </DashboardContainer>
  )
}

export default Dashboard
