let users = []

document.querySelector('[data-users-list]').addEventListener('click', e => {
  const isPlus = e.target.dataset.plus === ''
  const id = e.target.dataset.id
  const user = users.find(u => u.id === id)
  const updatedUser = {id: user.id, name: user.name, age: isPlus ? user.age + 1 : user.age - 1}
  fetch('http://localhost:3003/users', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  })
    .then((res1) => res1.json())
    .then((res2) => {
      buildUl(res2)
      users = res2
    })
})

const buildUl = (users) => {
  const lis = Object.values(users)
    .map(
      ({ id, name, age }) =>
        `<li>${name} - <button data-id="${id}" data-plus>+</button>${age}<button data-id="${id}" data-minus>-</button> y.o.</li>`
    )
    .join('')
  const ul = `<ul>${lis}</ul>`
  document.querySelector('[data-users-list]').innerHTML = ul
}

fetch('http://localhost:3003/users')
  .then((res1) => res1.json())
  .then((res2) => {
    buildUl(res2)
    users = res2
  })

document.querySelector('button').addEventListener('click', () => {
  const name = document.querySelector('[data-name]').value
  const age = document.querySelector('[data-age]').value
  document.querySelector('[data-name]').value = ''
  document.querySelector('[data-age]').value = ''
  fetch('http://localhost:3003/users', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, age: Number(age) }),
  })
    .then((res1) => res1.json())
    .then((res2) => {
      buildUl(res2)
      users = res2
    })
})
console.log(uuid.v4())
