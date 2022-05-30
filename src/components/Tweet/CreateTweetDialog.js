import styled from 'styled-components'

import Modal from '../Modal'
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
  const onSubmit = async (text) => {
    // create tweet

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
