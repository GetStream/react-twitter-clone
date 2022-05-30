import styled from 'styled-components'

import { formatStringWithLink } from '../../utils/string'
import Modal from '../Modal'
import TweetActorName from './TweetActorName'
import TweetForm from './TweetForm'

const Container = styled.div`
  .modal-block {
    padding: 15px;
    width: 600px;
    height: max-content;
  }
`

const BlockContent = styled.div`
  .tweet {
    margin-top: 30px;
    display: flex;
    position: relative;

    &::after {
      content: '';
      background-color: #444;
      width: 2px;
      height: calc(100% - 35px);
      position: absolute;
      left: 20px;
      z-index: 0;
      top: 45px;
    }

    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .details {
      .actor-name {
        font-size: 15px;
        &--name {
          color: white;
          font-weight: bold;
        }

        &--id {
          color: #888;
        }
      }

      .tweet-text {
        color: white;
        margin-top: 3px;
        font-size: 14px;
      }

      .replying-info {
        color: #555;
        display: flex;
        margin-top: 20px;
        font-size: 14px;

        &--actor {
          margin-left: 5px;
          color: var(--theme-color);
        }
      }
    }
  }

  .comment {
    display: flex;
    margin-top: 20px;

    .img {
      width: 35px;
      height: 35px;
      margin-left: 3px;
      border-radius: 50%;
      margin-right: 15px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .comment-form {
      flex: 1;
      height: 120px;
    }
  }
`

export default function CommentDialog({
  activity,
  onPostComment,
  onClickOutside,
}) {
  const {
    object: { data: tweet },
  } = activity

  const tweetActor = activity.actor

  const onSubmit = async (text) => {
    await onPostComment(text)

    onClickOutside()
  }

  return (
    <Container>
      <Modal onClickOutside={onClickOutside} className="modal-block">
        <BlockContent>
          <div className="tweet">
            <div className="img">
              <img src={tweetActor.data.image} alt="" />
            </div>
            <div className="details">
              <TweetActorName
                time={activity.time}
                name={tweetActor.data.name}
                id={tweetActor.data.id}
              />
              <p
                className="tweet-text"
                dangerouslySetInnerHTML={{
                  __html: formatStringWithLink(
                    tweet.text,
                    'tweet__text--link',
                    true
                  ).replace(/\n/g, '<br/>'),
                }}
              />
              <div className="replying-info">
                Replying to{' '}
                <span className="replying-info--actor">@{tweetActor.id}</span>
              </div>
            </div>
          </div>
          <div className="comment">
            <TweetForm
              className="comment-form"
              submitText="Reply"
              placeholder="Tweet your reply"
              onSubmit={onSubmit}
              shouldFocus={true}
            />
          </div>
        </BlockContent>
      </Modal>
    </Container>
  )
}
