import { Feed, useStreamContext } from 'react-activity-feed'
import { useParams } from 'react-router-dom'

import Layout from '../components/Layout'
import ThreadContent from '../components/Thread/ThreadContent'

const FEED_ENRICH_OPTIONS = {
  withRecentReactions: true,
  withOwnReactions: true,
  withReactionCounts: true,
  withOwnChildren: true,
}

export default function Thread() {
  const { user } = useStreamContext()

  const { user_id } = useParams()

  return (
    <Layout>
      <Feed
        feedGroup={user.id === user_id ? 'user' : 'timeline'}
        options={FEED_ENRICH_OPTIONS}
      >
        <ThreadContent />
      </Feed>
    </Layout>
  )
}
