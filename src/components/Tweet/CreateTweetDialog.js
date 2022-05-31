import styled from 'styled-components'

import Modal from '../Modal'
import useTweet from '../../hooks/useTweet'
import TweetForm from './TweetForm'

const Container = styled.div`
  .modal-block {
    margin-top: 20px;
    padding: 15px;
    width: 600px;
    height: max-content;
    z-index: 10;
  }

  .tweet-form {
    margin-top: 20px;
  }
`

export default function CreateTweetDialog({ onClickOutside }) {
  const { createTweet } = useTweet()

  const onSubmit = async (text) => {
    createTweet(text)

    onClickOutside()
  }

  return (
    <Container>
      <Modal onClickOutside={onClickOutside} className="modal-block">
        <TweetForm
          onSubmit={onSubmit}
          shouldFocus={true}
          minHeight={240}
          className="tweet-form"
          placeholder="What's happening"
        />
      </Modal>
    </Container>
  )
}
