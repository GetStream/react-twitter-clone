import { useStreamContext } from 'react-activity-feed'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Heart from '../Icons/Heart'

const Block = styled.button`
  padding: 15px;
  border-bottom: 1px solid #333;
  display: flex;

  a {
    color: white;
  }

  span {
    display: inline-block;
  }

  .right {
    margin-left: 20px;
    flex: 1;
  }

  .liked-actors__images {
    display: flex;

    &__image {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .liked-actors__text {
    margin-top: 10px;
    color: white;
    font-size: 15px;

    .liked-actor__name {
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .tweet-text {
    display: block;
    color: #888;
    margin-top: 10px;
  }
`

export default function LikeNotification({ likedActivities }) {
  const likedGroup = {}
  const navigate = useNavigate()

  const { user } = useStreamContext()

  likedActivities.forEach((act) => {
    if (act.object.id in likedGroup) {
      likedGroup[act.object.id].push(act)
    } else likedGroup[act.object.id] = [act]
  })

  return (
    <>
      {Object.keys(likedGroup).map((groupKey) => {
        const activities = likedGroup[groupKey]

        const lastActivity = activities[0]

        const tweetLink = `/${user.id}/status/${lastActivity.object.id}`

        return (
          <Block
            className="active"
            onClick={() => navigate(tweetLink)}
            key={groupKey}
          >
            <Heart color="var(--theme-color)" size={25} fill={true} />
            <div className="right">
              <div className="liked-actors__images">
                {activities.map((act) => (
                  <Link
                    to={`/${act.actor.id}`}
                    key={act.id}
                    className="liked-actors__images__image"
                  >
                    <img src={act.actor.data.image} alt="" />
                  </Link>
                ))}
              </div>
              <span className="liked-actors__text">
                <Link
                  className="liked-actor__name"
                  to={`/${lastActivity.actor.id}`}
                >
                  {lastActivity.actor.data.name}
                </Link>{' '}
                <span to={tweetLink}>
                  {activities.length > 1 &&
                    `and ${activities.length - 1} others`}{' '}
                  liked your Tweet
                </span>
              </span>

              <p className="tweet-text">{lastActivity.object.data.text}</p>
            </div>
          </Block>
        )
      })}
    </>
  )
}
