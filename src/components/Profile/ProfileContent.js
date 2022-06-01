import styled from 'styled-components'
import { createContext, useEffect, useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import { useParams } from 'react-router-dom'

import ProfileHeader from './ProfileHeader'
import LoadingIndicator from '../LoadingIndicator'
import ProfileBio from './ProfileBio'
import TabList from './TabList'
import ProfileTweets from './ProfileTweets'

const Container = styled.div`
  --profile-image-size: 120px;

  .tab-list {
    margin-top: 30px;
  }
`

export const ProfileContext = createContext()

export default function ProfileContent() {
  const { client } = useStreamContext()

  const [user, setUser] = useState(null)
  const { user_id } = useParams()

  useEffect(() => {
    const getUser = async () => {
      const user = await client.user(user_id).get({ with_follow_counts: true })

      setUser(user.full)
    }

    getUser()
  }, [user_id])

  if (!client || !user) return <LoadingIndicator />

  return (
    <ProfileContext.Provider value={{ user }}>
      <Container>
        <ProfileHeader />
        <main>
          <ProfileBio />
          <div className="tab-list">
            <TabList />
          </div>
          <ProfileTweets />
        </main>
      </Container>
    </ProfileContext.Provider>
  )
}
