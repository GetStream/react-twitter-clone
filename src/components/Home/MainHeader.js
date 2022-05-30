import styled from 'styled-components'

import Star from '../Icons/Star'

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 15px;
  color: white;
  width: 100%;
  font-weight: bold;
  justify-content: space-between;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.5);

  h1 {
    font-size: 20px;
  }
`

export default function MainHeader() {
  return (
    <Header>
      <h1>Home</h1>
      <Star color="white" />
    </Header>
  )
}
