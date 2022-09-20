import { } from 'react'
import DisplayText from './components/DisplayText'

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: object
}

function App() {
  const getFullName = async(username: string): Promise<string> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    const findFullName = users.find((user: User) => {
      return user.username.toLowerCase() === username
    })
    if(!findFullName) {
      return `${username}`;
    }
    return findFullName.name;
  }

  return (
    <>
      <h1>Hell no</h1>
      <DisplayText getFullName={getFullName}/>
    </>
  )
}

export default App
