import { useStreamContext } from 'react-activity-feed'

export default function useNotification() {
  const { client } = useStreamContext()

  const createNotification = async (userId, verb, data, reference = {}) => {
    const userNotificationFeed = client.feed('notification', userId)

    const newActivity = {
      verb,
      object: reference,
      ...data,
    }

    await userNotificationFeed.addActivity(newActivity)
  }

  return { createNotification }
}
