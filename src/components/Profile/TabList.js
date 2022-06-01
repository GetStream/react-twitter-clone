import classNames from 'classnames'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  border-bottom: 1px solid #555;
  width: 100%;

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
      width: 100%;
      padding: 20px 7px;

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
`

const tabs = [
  {
    id: 'tweets',
    label: 'Tweets',
  },
  {
    id: 'tweet-replies',
    label: 'Tweets & replies',
  },
  {
    id: 'media',
    label: 'Media',
  },
  {
    id: 'likes',
    label: 'Likes',
  },
]

export default function TabList() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <Container>
      {tabs.map((tab) => (
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
    </Container>
  )
}
