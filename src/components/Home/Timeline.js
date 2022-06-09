import { FlatFeed, useStreamContext } from 'react-activity-feed'

import TweetBlock from '../Tweet/TweetBlock'

export default function Timeline() {
  const { user } = useStreamContext()

  return (
    <div>
      <FlatFeed Activity={TweetBlock} userId={user.id} feedGroup="timeline" />
    </div>
  )
}
