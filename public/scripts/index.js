const table = document.querySelector('#users__table')
const btnSend = document.querySelector('#send__data')
const userName = document.querySelector('#name__user')
const userEmail = document.querySelector('#email__user')
const bgModal = document.querySelector('.bg-modal')
const modal = document.querySelector('.modal')
const nameChanged = document.querySelector('#change__name')
const emailChanged = document.querySelector('#change__email')
const btnConfirmChanges = document.querySelector('#confirm__changes')

function addUser(){
    let name = userName.value
    let email = userEmail.value
    let user = { name, email }
    const options = {
        method:'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(user)
    }
    fetch('http://localhost:3000/users', options)
    .then((res)=>{
        console.log(res);
        getUsers()
        userName.value = ''
        userEmail.value = ''
    })
}

function getUsers(){
    fetch('http://localhost:3000/users')
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        render(data)
        listEventGenerator()
    })
}

function render(data){
    let users = '';
    data.forEach(e => {
            users += `
            <tr class='bg-table'>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.email}</td>
                <td><img id='${e.id}' src="./img/icon-edit.svg"></td>
                <td><img id='${e.id}' src='./img/icon-close.svg'></td>
            </tr>`
    })
    table.innerHTML = users
}

function listEventGenerator(){
    const selectAllTrs = document.querySelectorAll('.bg-table')
    for(i = 0; i < selectAllTrs.length; i++){
        selectAllTrs[i].children[4].children[0].addEventListener('click', deleteUser)
        selectAllTrs[i].children[3].children[0].addEventListener('click', openModal)
    }
}

function updateUser(){
    let name = nameChanged.value
    let email = emailChanged.value
    let user = { name, email }
    const options = {
        method:'PUT',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(user)
    }
    fetch(`http://localhost:3000/users/${idModal}`, options)
    .then((res)=>{
        console.log(res);
        getUsers()
        nameChanged.value = ''
        emailChanged.value = ''
    })
}

let idModal;
function openModal(e){
    bgModal.style.top = '0'
    idModal = e.target.id
    console.log(idModal);
}

function deleteUser(e){
    const options = {
        method:'DELETE'
    }
    fetch(`http://localhost:3000/users/${e.target.id}`, options)
    .then((res)=>{
        console.log(res);
        getUsers()
    })
}

bgModal.addEventListener('click', (e)=>{e.target.style.top = '-100%'})
modal.addEventListener('click', (e)=>{e.stopImmediatePropagation()})
btnConfirmChanges.addEventListener('click', ()=>{
    updateUser()
    bgModal.style.top = '-100%'
})
btnSend.addEventListener('click', (e)=>{
    addUser()
    e.preventDefault()
})
getUsers()