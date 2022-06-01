import { useContext } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { useStreamContext } from 'react-activity-feed'

import More from '../Icons/More'
import Mail from '../Icons/Mail'
import Calendar from '../Icons/Calendar'
import { formatStringWithLink } from '../../utils/string'
import { ProfileContext } from './ProfileContent'
import FollowBtn from '../FollowBtn'

const Container = styled.div`
  padding: 20px;
  position: relative;

  .top {
    display: flex;
    justify-content: space-between;
    margin-top: calc(var(--profile-image-size) / -2);

    .image {
      width: var(--profile-image-size);
      height: var(--profile-image-size);
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid black;
      background-color: #444;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .actions {
      position: relative;
      top: 55px;
      display: flex;

      .action-btn {
        border: 1px solid #777;
        margin-right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .details {
    color: #888;
    margin-top: 20px;

    .user {
      &__name {
        color: white;
        font-weight: bold;
      }

      &__id {
        margin-top: 2px;
        font-size: 15px;
      }

      &__bio {
        color: white;
        margin-top: 10px;
        a {
          color: var(--theme-color);
          text-decoration: none;
        }
      }

      &__joined {
        display: flex;
        align-items: center;
        margin-top: 15px;
        font-size: 15px;

        &--text {
          margin-left: 5px;
        }
      }

      &__follows {
        font-size: 15px;
        display: flex;
        margin-top: 15px;

        b {
          color: white;
        }

        &__followers {
          margin-left: 20px;
        }
      }

      &__followed-by {
        font-size: 13px;
        margin-top: 15px;
      }
    }
  }
`

const actions = [
  {
    Icon: More,
    id: 'more',
  },
  {
    Icon: Mail,
    id: 'message',
  },
]

export default function ProfileBio() {
  const { client } = useStreamContext()
  const { user } = useContext(ProfileContext)

  const joinedDate = format(new Date(user.created_at), 'MMMM RRRR')

  const bio = formatStringWithLink(user.data.bio)

  const isLoggedInUserProfile = user.id === client.userId

  return (
    <Container>
      <div className="top">
        <div className="image">
          {' '}
          <img src={user.data.image} alt="" />
        </div>
        {!isLoggedInUserProfile && (
          <div className="actions">
            {actions.map((action) => (
              <button className="action-btn" key={action.id}>
                <action.Icon color="white" size={21} />
              </button>
            ))}
            <FollowBtn userId={user.id} />
          </div>
        )}
      </div>
      <div className="details">
        <span className="user__name">{user.data.name}</span>
        <span className="user__id">@{user.id}</span>
        <span className="user__bio" dangerouslySetInnerHTML={{ __html: bio }} />
        <div className="user__joined">
          <Calendar color="#777" size={20} />
          <span className="user__joined--text">Joined {joinedDate}</span>
        </div>
        <div className="user__follows">
          <span className="user__follows__following">
            <b>{user.following_count || 0}</b> Following
          </span>
          <span className="user__follows__followers">
            <b>{user.followers_count || 0}</b> Followers
          </span>
        </div>
        <div className="user__followed-by">
          Not followed by anyone you are following
        </div>
      </div>
    </Container>
  )
}
