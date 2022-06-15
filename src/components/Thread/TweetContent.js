import { format } from 'date-fns'
import { useFeedContext, useStreamContext } from 'react-activity-feed'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react'

import { formatStringWithLink } from '../../utils/string'
import BarChart from '../Icons/BarChart'
import Comment from '../Icons/Comment'
import Retweet from '../Icons/Retweet'
import Heart from '../Icons/Heart'
import Upload from '../Icons/Upload'
import TweetForm from '../Tweet/TweetForm'
import TweetCommentBlock from './TweetCommentBlock'
import CommentDialog from '../Tweet/CommentDialog'
import More from '../Icons/More'
import useComment from '../../hooks/useComment'
import useLike from '../../hooks/useLike'

const Container = styled.div`
  padding: 10px 15px;

  .user {
    display: flex;
    text-decoration: none;

    &__image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__name {
      &--name {
        color: white;
        font-weight: bold;
      }
      &--id {
        color: #52575b;
        font-size: 14px;
      }
    }

    &__option {
      margin-left: auto;
    }
  }

  .tweet {
    margin-top: 20px;

    a {
      text-decoration: none;
      color: var(--theme-color);
    }

    &__text {
      color: white;
      font-size: 20px;
    }

    &__time,
    &__analytics,
    &__reactions,
    &__reactors {
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #555;
      font-size: 15px;
      color: #888;
    }

    &__time {
      &--date {
        margin-left: 12px;
        position: relative;

        &::after {
          position: absolute;
          content: '';
          width: 2px;
          height: 2px;
          background-color: #777;
          border-radius: 50%;
          top: 0;
          bottom: 0;
          left: -7px;
          margin: auto 0;
        }
      }
    }

    &__analytics {
      &__text {
        margin-left: 7px;
      }
    }

    &__reactions {
      &__likes {
        display: flex;

        .reaction-count {
          color: white;
          font-weight: bold;
        }

        .reaction-label {
          margin-left: 4px;
        }
      }
    }

    &__reactors {
      justify-content: space-between;
      padding: 0 50px;
    }
  }

  .write-reply {
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #555;
  }
`

export default function TweetContent({ activity }) {
  const feed = useFeedContext()
  const { client } = useStreamContext()

  const { createComment } = useComment()
  const { toggleLike } = useLike()

  const time = format(new Date(activity.time), 'p')
  const date = format(new Date(activity.time), 'PP')

  const tweet = activity.object.data
  const tweetActor = activity.actor.data

  const [commentDialogOpened, setCommentDialogOpened] = useState(false)

  let hasLikedTweet = false

  if (activity?.own_reactions?.like) {
    const myReaction = activity.own_reactions.like.find(
      (l) => l.user.id === client.userId
    )
    hasLikedTweet = Boolean(myReaction)
  }

  const onToggleLike = async () => {
    await toggleLike(activity, hasLikedTweet)
    feed.refresh()
  }

  const reactors = [
    {
      id: 'comment',
      Icon: Comment,
      onClick: () => setCommentDialogOpened(true),
    },
    { id: 'retweet', Icon: Retweet },
    {
      id: 'heart',
      Icon: Heart,
      onClick: onToggleLike,
    },
    { id: 'upload', Icon: Upload },
  ]

  const onPostComment = async (text) => {
    await createComment(text, activity)

    feed.refresh()
  }

  return (
    <>
      {commentDialogOpened && (
        <CommentDialog
          activity={activity}
          onPostComment={onPostComment}
          onClickOutside={() => setCommentDialogOpened(false)}
        />
      )}
      <Container>
        <Link to={`/${tweetActor.id}`} className="user">
          <div className="user__image">
            <img src={tweetActor.image} alt="" />
          </div>
          <div className="user__name">
            <span className="user__name--name">{tweetActor.name}</span>
            <span className="user__name--id">@{tweetActor.id}</span>
          </div>
          <div className="user__option">
            <More color="#777" size={20} />
          </div>
        </Link>
        <div className="tweet">
          <p
            className="tweet__text"
            dangerouslySetInnerHTML={{
              __html: formatStringWithLink(
                tweet.text,
                'tweet__text--link'
              ).replace(/\n/g, '<br/>'),
            }}
          />
          <div className="tweet__time">
            <span className="tweet__time--time">{time}</span>
            <span className="tweet__time--date">{date}</span>
          </div>

          <div className="tweet__analytics">
            <BarChart color="#888" />
            <span className="tweet__analytics__text">View Tweet Analytics</span>
          </div>

          <div className="tweet__reactions">
            <div className="tweet__reactions__likes">
              <span className="reaction-count">
                {activity.reaction_counts.like || '0'}
              </span>
              <span className="reaction-label">Likes</span>
            </div>
          </div>

          <div className="tweet__reactors">
            {reactors.map((action, i) => (
              <button onClick={action.onClick} key={`reactor-${i}`}>
                <action.Icon
                  color={
                    action.id === 'heart' && hasLikedTweet
                      ? 'var(--theme-color)'
                      : '#888'
                  }
                  fill={action.id === 'heart' && hasLikedTweet && true}
                  size={20}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="write-reply">
          <TweetForm
            onSubmit={onPostComment}
            submitText="Reply"
            collapsedOnMount={true}
            placeholder="Tweet your reply"
            replyingTo={tweetActor.id}
          />
        </div>
        {activity.latest_reactions?.comment?.map((comment) => (
          <TweetCommentBlock key={comment.id} comment={comment} />
        ))}
      </Container>
    </>
  )
}
