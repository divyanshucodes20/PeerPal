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
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const SectionLayoutOfRoommate: React.FC<SectionLayoutProps> = ({ title, children, searchTerm, setSearchTerm }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
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

export default SectionLayoutOfRoommate

