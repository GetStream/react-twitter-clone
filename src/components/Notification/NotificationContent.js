import classNames from 'classnames'
import { useState } from 'react'
import { NotificationFeed } from 'react-activity-feed'
import styled from 'styled-components'

import NotificationGroup from './NotificationGroup'
import { useStreamContext } from 'react-activity-feed'
import { useEffect } from 'react'

const Container = styled.div`
  h1 {
    padding: 15px;
    font-size: 16px;
    color: white;
  }

  .tab-list {
    margin-top: 10px;
    border-bottom: 1px solid #333;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .tab {
      color: #777;
      padding: 0 35px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 15px;

      &:hover {
        background-color: #111;
      }

      &__label {
        position: relative;
        padding: 20px 30px;

        &.active {
          color: white;

          &::after {
            content: '';
            height: 3px;
            width: 100%;
            background-color: var(--theme-color);
            border-radius: 40px;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
`

const tabList = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'mentions',
    label: 'Mentions',
  },
]

export default function NotificationContent() {
  const [activeTab, setActiveTab] = useState(tabList[0].id)

  const { client, user } = useStreamContext()

  useEffect(() => {
    async function init() {
      const notificationFeed = client.feed('notification', user.id)

      const activities = await notificationFeed.removeActivity("588498b4-ebe7-11ec-b097-0ebae3a0a17f")

      console.log({ activities })
    }

    init()
  }, [])

  return (
    <Container>
      <h1>Notifications</h1>
      <div className="tab-list">
        {tabList.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.id)}
            className="tab"
            key={tab.id}
          >
            <span
              className={classNames(
                'tab__label',
                activeTab === tab.id && 'active'
              )}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <NotificationFeed Group={NotificationGroup} />
    </Container>
  )
}
