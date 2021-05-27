const express = require('express')
const cors = require('cors')
const { uuid } = require('uuidv4')

const app = express()
app.use(cors())
app.use(express.json())
const port = 3003

let users = [
  { name: 'Alex', age: 25 },
  { name: 'Bob', age: 47 },
  { name: 'Daniel', age: 48 },
]

const getUsers = () => JSON.parse(require('fs').readFileSync('./users.json', 'utf-8'))
const addUser = user => {
  const users = getUsers()
  users.unshift(user)
  require('fs').writeFileSync('./users.json', JSON.stringify(users, null, 2), 'utf-8')
}
const updateUser = ({ id, name, age }) => {
  const users = getUsers().map(user => user.id === id ? { name, age, id } : user)
  require('fs').writeFileSync('./users.json', JSON.stringify(users, null, 2), 'utf-8')
}

const resJson = (res, json) => {
  setTimeout(() => res.json(json), Math.random() * 2000)
}

app.get('/users', (req, res) => {
  return resJson(res, getUsers())
})

app.put('/users', (req, res) => {
  const user = req.body
  updateUser(user)
  return resJson(res, getUsers())
})

app.post('/users', (req, res) => {
  const { name, age } = req.body
  if (!name) {
    res.status(400)
    return resJson(res, { error: 'User Name is required'})
  }
  if (age && typeof age !== 'number') {
    res.status(400)
    return resJson(res, { error: 'User Age should be a number'})
  }
  addUser({ id: uuid(), name, age: age || 18 })
  return resJson(res, getUsers())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})