import { useFeedContext, useStreamContext } from 'react-activity-feed'

import useNotification from './useNotification'

export default function useComment() {
  const feed = useFeedContext()
  const { createNotification } = useNotification()
  const { user } = useStreamContext()

  const createComment = async (text, activity) => {
    const actor = activity.actor

    await feed.onAddReaction('comment', activity, {
      text,
    })

    if (actor.id !== user.id) {
      // then it is not the logged in user commenting on their own tweet

      createNotification(
        actor.id,
        'comment',
        {
          text,
        },
        `SO:tweet:${activity.object.id}`
      )
    }
  }

  return {
    createComment,
  }
}
