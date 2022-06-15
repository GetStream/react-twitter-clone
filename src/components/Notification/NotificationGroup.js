import { useEffect, useRef } from 'react'
import { useFeedContext, useStreamContext } from 'react-activity-feed'
import styled from 'styled-components'

import CommentNotification from './CommentNotification'
import FollowNotification from './FollowNotification'
import LikeNotification from './LikeNotification'

const Container = styled.div`
  button {
    width: 100%;
  }
`

export default function NotificationGroup({ activityGroup }) {
  const feed = useFeedContext()
  const notificationContainerRef = useRef()

  const activities = activityGroup.activities

  const { user, client } = useStreamContext()

  useEffect(() => {
    // stop event propagation on links
    if (!notificationContainerRef.current) return

    const anchorTags = notificationContainerRef.current.querySelectorAll('a')

    anchorTags.forEach((element) => {
      element.addEventListener('click', (e) => e.stopPropagation())
    })

    return () =>
      anchorTags.forEach((element) => {
        element.addEventListener('click', (e) => e.stopPropagation())
      })
  }, [])

  useEffect(() => {
    const notifFeed = client.feed('notification', user.id)

    notifFeed.subscribe((data) => {
      if (data.new.length) {
        feed.refresh()
      }
    })

    return () => notifFeed.unsubscribe()
  }, [])

  return (
    <Container ref={notificationContainerRef}>
      {activityGroup.verb === 'like' && (
        <LikeNotification likedActivities={activities} />
      )}
      {activityGroup.verb === 'follow' && (
        <FollowNotification followActivities={activities} />
      )}
      {activityGroup.verb === 'comment' && (
        <CommentNotification commentActivities={activities} />
      )}
    </Container>
  )
}
