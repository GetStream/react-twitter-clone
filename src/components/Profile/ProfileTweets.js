import { useContext } from 'react'
import { FlatFeed } from 'react-activity-feed'

import TweetBlock from '../Tweet/TweetBlock'
import { ProfileContext } from './ProfileContent'

export default function MyTweets() {
  const { user } = useContext(ProfileContext)

  return (
    <div>
      <FlatFeed
        Activity={TweetBlock}
        userId={user.id}
        feedGroup="user"
        notify
      />
    </div>
  )
}
