import { useFeedContext, useStreamContext } from 'react-activity-feed'

import useNotification from './useNotification'

export default function useLike() {
  const feed = useFeedContext()
  const { createNotification } = useNotification()
  const { user } = useStreamContext()

  const toggleLike = async (activity, hasLikedTweet) => {
    const actor = activity.actor

    await feed.onToggleReaction('like', activity)

    if (!hasLikedTweet && actor.id !== user.id) {
      // then it is not the logged in user liking their own tweet
      createNotification(actor.id, 'like', {}, `SO:tweet:${activity.object.id}`)
    }
  }

  return { toggleLike }
}
