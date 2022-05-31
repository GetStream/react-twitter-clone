import { nanoid } from 'nanoid'
import { useStreamContext } from 'react-activity-feed'

export default function useTweet() {
  const { client } = useStreamContext()

  const user = client.feed('user', client.userId)

  const createTweet = async (text) => {
    const collection = await client.collections.add('tweet', nanoid(), { text })

    await user.addActivity({
      verb: 'tweet',
      object: `SO:tweet:${collection.id}`,
    })
  }

  return {
    createTweet,
  }
}
