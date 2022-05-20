import styled from 'styled-components'

import users from '../users'
import { saveToStorage } from '../utils/storage'

const Main = styled.main`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  h1 {
    text-align: center;
    color: white;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .users {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    margin: 0 auto;

    &__user {
      display: flex;
      flex-direction: column;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 5px;
      }
      .name {
        margin: 10px auto;
        color: white;
        text-align: center;
      }
    }
  }
`

export default function Startpage() {
  const onClickUser = (id) => {
    saveToStorage('user', id)
    window.location.href = '/home'
  }

  return (
    <Main>
      <h1>Select a user</h1>
      <div className="users">
        {users.map((u) => (
          <button
            onClick={() => onClickUser(u.id)}
            className="users__user"
            key={u.id}
          >
            <img src={u.image} alt="" />
            <span className="name">{u.name}</span>
          </button>
        ))}
      </div>
    </Main>
  )
}
