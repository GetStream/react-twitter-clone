import { useEffect, useState } from 'react'
import { useStreamContext } from 'react-activity-feed'

export default function useFollow({ userId }) {
  const { client } = useStreamContext()

  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    async function init() {
      const response = await client
        .feed('timeline', client.userId)
        .following({ filter: [`user:${userId}`] })

      setIsFollowing(!!response.results.length)
    }

    init()
  }, [])

  const toggleFollow = async () => {
    const action = isFollowing ? 'unfollow' : 'follow'

    const timelineFeed = client.feed('timeline', client.userId)
    await timelineFeed[action]('user', userId)

    setIsFollowing((isFollowing) => !isFollowing)
  }

  return { isFollowing, toggleFollow }
}
