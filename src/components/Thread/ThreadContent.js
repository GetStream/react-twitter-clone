import { useEffect, useState } from 'react'
import { useFeedContext, useStreamContext } from 'react-activity-feed'
import { useParams } from 'react-router-dom'

import LoadingIndicator from '../LoadingIndicator'
import TweetContent from './TweetContent'
import ThreadHeader from './ThreadHeader'

export default function ThreadContent() {
  const { client } = useStreamContext()
  const { id } = useParams()

  const feed = useFeedContext()

  const [activity, setActivity] = useState(null)

  useEffect(() => {
    if (feed.refreshing || !feed.hasDoneRequest) return

    const activityPaths = feed.feedManager.getActivityPaths(id) || []

    if (activityPaths.length) {
      const targetActivity = feed.feedManager.state.activities
        .getIn([...activityPaths[0]])
        .toJS()

      setActivity(targetActivity)
    }
  }, [feed.refreshing])

  if (!client || !activity) return <LoadingIndicator />

  return (
    <div>
      <ThreadHeader />
      <TweetContent activity={activity} />
    </div>
  )
}
