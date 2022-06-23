import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import LoadingIndicator from './LoadingIndicator'
import Bell from './Icons/Bell'
import Group from './Icons/Group'
import Home from './Icons/Home'
import Hashtag from './Icons/Hashtag'
import Mail from './Icons/Mail'
import Bookmark from './Icons/Bookmark'
import User from './Icons/User'
import More from './Icons/More'
import Twitter from './Icons/Twitter'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  height: 100%;

  .header {
    padding: 15px;
  }

  .buttons {
    margin-top: 5px;
    max-width: 200px;

    a,
    button {
      display: block;
      margin-bottom: 12px;
      color: white;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      border-radius: 30px;
      font-size: 18px;
      padding-right: 25px;
      text-decoration: none;
      --icon-size: 25px;

      .btn--icon {
        margin-right: 15px;
        height: var(--icon-size);
        width: var(--icon-size);

        position: relative;
        .notifications-count {
          position: absolute;
          font-size: 11px;
          /* min-width: 14px; */
          background-color: var(--theme-color);
          top: -5px;
          padding: 1px 5px;
          border-radius: 10px;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: max-content;
        }
      }

      &.active {
        font-weight: bold;

        img {
          --size: 27px;
        }
      }

      &:hover {
        background-color: #333;
      }

      &.btn--home {
        position: relative;
        &.new-tweets::after {
          content: '';
          position: absolute;
          width: 5px;
          height: 5px;
          left: 35px;
          top: 7px;
          border-radius: 50%;
          background-color: var(--theme-color);
        }
      }

      &.btn--more {
        svg {
          border: 1px solid #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .tweet-btn {
    background-color: var(--theme-color);
    margin-top: 10px;
    border-radius: 30px;
    color: white;
    text-align: center;
    padding: 15px 0;
    font-size: 16px;
  }

  .profile-section {
    margin-top: auto;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    border-radius: 30px;

    &:hover {
      background-color: #333;
    }

    .details {
      display: flex;
      align-items: center;
      &__img {
        margin-right: 10px;
        width: 40px;
        border-radius: 50%;
        height: 40px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &__text {
        span {
          display: block;
        }

        &__name {
          color: white;
          font-size: 16px;
          font-weight: bold;
        }

        &__id {
          font-size: 14px;
          margin-top: 2px;
          color: #aaa;
        }
      }
    }
  }
`

export default function LeftSide({ onClickTweet }) {
  const location = useLocation()
  const { client, userData } = useStreamContext()

  const [newNotifications, setNewNotifications] = useState(0)

  useEffect(() => {
    if (!userData || location.pathname === `/notifications`) return

    let notifFeed

    async function init() {
      notifFeed = client.feed('notification', userData.id)
      const notifications = await notifFeed.get()

      const unread = notifications.results.filter(
        (notification) => !notification.is_seen
      )

      setNewNotifications(unread.length)

      notifFeed.subscribe((data) => {
        setNewNotifications(newNotifications + data.new.length)
      })
    }

    init()

    return () => notifFeed?.unsubscribe()
  }, [userData])

  if (!userData)
    return (
      <Container>
        <LoadingIndicator />
      </Container>
    )

  const menus = [
    {
      id: 'home',
      label: 'Home',
      Icon: Home,
      link: '/home',
    },
    {
      id: 'explore',
      label: 'Explore',
      Icon: Hashtag,
    },
    {
      id: 'communities',
      label: 'Communities',
      Icon: Group,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      Icon: Bell,
      link: '/notifications',
      value: newNotifications,
      onClick: () => setNewNotifications(0),
    },
    {
      id: 'messages',
      label: 'Messages',
      Icon: Mail,
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      Icon: Bookmark,
    },
    {
      id: 'profile',
      label: 'Profile',
      Icon: User,
      link: `/${userData.id}`,
    },
  ]

  return (
    <Container>
      <Link to="/" className="header">
        <Twitter color="white" size={25} />
      </Link>
      <div className="buttons">
        {menus.map((m) => {
          const isActiveLink =
            location.pathname === `/${m.id}` ||
            (m.id === 'profile' && location.pathname === `/${userData.id}`)

          return (
            <Link
              to={m.link ?? '#'}
              className={classNames(
                `btn--${m.id} new-tweets`,
                isActiveLink && 'active'
              )}
              key={m.id}
              onClick={m.onClick}
            >
              <div className="btn--icon">
                {newNotifications && m.id === 'notifications' ? (
                  <span className="notifications-count">
                    {newNotifications}
                  </span>
                ) : null}
                <m.Icon fill={isActiveLink} color="white" size={25} />
              </div>
              <span>{m.label}</span>
            </Link>
          )
        })}
        <button className="btn--more">
          <div className="btn--icon">
            <More color="white" size={20} />
          </div>
          <span>More</span>
        </button>
      </div>
      <button onClick={onClickTweet} className="tweet-btn">
        Tweet
      </button>
      <button className="profile-section">
        <div className="details">
          <div className="details__img">
            <img src={userData.image} alt="" />
          </div>
          <div className="details__text">
            <span className="details__text__name">{userData.name}</span>
            <span className="details__text__id">@{userData.id}</span>
          </div>
        </div>
        <div>
          <More color="white" />
        </div>
      </button>
    </Container>
  )
}
