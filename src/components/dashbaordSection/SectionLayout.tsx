import type React from "react"
import styled from "styled-components"

const SectionContainer = styled.div`
  margin-bottom: 2rem;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.primary};
`

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

const Tab = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.active ? props.theme.primary : "transparent")};
  color: ${(props) => (props.active ? props.theme.textLight : props.theme.text)};
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.primaryLight};
    color: ${(props) => props.theme.textLight};
  }
`

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
`

interface SectionLayoutProps {
  title: string
  children: React.ReactNode
  activeTab: "joined" | "created"
  setActiveTab: (tab: "joined" | "created") => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  title,
  children,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      <TabContainer>
        <Tab active={activeTab === "joined"} onClick={() => setActiveTab("joined")}>
          Joined
        </Tab>
        <Tab active={activeTab === "created"} onClick={() => setActiveTab("created")}>
          Created
        </Tab>
      </TabContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {children}
    </SectionContainer>
  )
}

export default SectionLayout

