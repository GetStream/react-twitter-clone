import classNames from 'classnames'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  button {
    padding: 0 15px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    width: 100px;
    height: 30px;
    border-radius: 30px;

    &.following {
      color: white;
      background-color: transparent;
      border: 1px solid #666;
    }

    &.not-following {
      background-color: #ccc;
      width: 80px;
      color: black;
    }

    .follow-text {
      &__unfollow {
        display: none;
      }
      &__following {
        display: block;
      }
    }

    &:hover {
      &.following {
        color: red;
        border-color: red;

        .follow-text {
          &__unfollow {
            display: block;
          }
          &__following {
            display: none;
          }
        }
      }
    }
  }
`

export default function FollowBtn({ userId }) {
  const [following, setFollowing] = useState(false)

  return (
    <Container>
      <button
        className={classNames(following ? 'following' : 'not-following')}
        onClick={() => setFollowing(!following)}
      >
        {following ? (
          <div className="follow-text">
            <span className="follow-text__following">Following</span>
            <span className="follow-text__unfollow">Unfollow</span>
          </div>
        ) : (
          'Follow'
        )}
      </button>
    </Container>
  )
}
