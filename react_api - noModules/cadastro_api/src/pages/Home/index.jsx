import { useEffect, useState, useRef, useReducer } from 'react' //react hooks
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'



function Home() {
  const [users, setUsers] = useState([]) //começa sendo um array vazio
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()



  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    
    
    getUsers()
  }





  useEffect(() => {
    getUsers()
  }, [])

  //
  //
  //
  //

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='Name' ref={inputName} type='text' />
        <input placeholder='Idade' name='Idade' ref={inputAge} type='number' />
        <input placeholder='Email' name='email' ref={inputEmail} type='email' />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map(user => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email:{user.email}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
