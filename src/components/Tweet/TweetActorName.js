import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TextBlock = styled(Link)`
  display: flex;

  &:hover .user--name {
    text-decoration: underline;
  }

  .user {
    &--name {
      color: white;
      font-weight: bold;
    }
    &--id {
      margin-left: 5px;
      color: #777;
    }
  }
  .tweet-date {
    margin-left: 15px;
    color: #777;
    position: relative;

    &::after {
      content: '';
      width: 2px;
      height: 2px;
      background-color: #777;
      position: absolute;
      left: -8px;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
  }
`

export default function TweetActorName({ time, name, id }) {
  const timeDiff = Date.now() - new Date(time).getTime()

  // convert ms to hours
  const hoursBetweenDates = timeDiff / (60 * 60 * 1000)

  const lessThan24hrs = hoursBetweenDates < 24

  const lessThan1hr = hoursBetweenDates < 1

  const timeText = lessThan1hr
    ? format(timeDiff, 'm') + 'm'
    : lessThan24hrs
    ? format(timeDiff, 'H') + 'h'
    : format(new Date(time), 'MMM d')

  return (
    <TextBlock to={`/${id}`}>
      <span className="user--name">{name}</span>
      <span className="user--id">@{id}</span>
      <span className="tweet-date">{timeText}</span>
    </TextBlock>
  )
}
