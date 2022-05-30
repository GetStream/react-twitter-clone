import styled from 'styled-components'

import TweetForm from '../Tweet/TweetForm'

const Container = styled.div`
  padding: 15px;
`

export default function CreateTweetTop() {
  const onSubmit = async (text) => {
    // create tweet here
  }

  return (
    <Container>
      <TweetForm placeholder="What's happening?" onSubmit={onSubmit} />
    </Container>
  )
}
