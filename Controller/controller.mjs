import { createUser } from '../createUser.mjs'
import { addNewUserToDataBase } from '../Database/repository.mjs';
import fs from 'fs'
import { cwd } from 'process'

const dir = cwd()+"/Database"

export let usersCache = JSON.parse(fs.readFileSync(dir + '/users.json', 'utf8', (err, data)=>{
    return data
}))

function getUsers(req, res){
    const filtered = usersCache.filter(e => {
        return e.actived === true
    })
    console.log(filtered);
    console.log(usersCache);
    return res.status(200).json(filtered)
}

function addUser(req, res){
    let id = usersCache.length +1
    const { name, email } = req.body
    const newUser = new createUser(id, name, email)
    addNewUserToDataBase(newUser)
    return res.status(201).json(usersCache)
}

function attUser(req, res){
    const  id  = parseInt(req.params.id) -1
    const { name, email } = req.body
    usersCache[id].name = name
    usersCache[id].email = email
    fs.writeFile(dir+'/users.json',JSON.stringify(usersCache),()=>{})
    return res.status(201).json(usersCache)
}

function delUser(req, res){
    const { id } = req.params
    usersCache.find(e => e.actived === true && e.id == id).actived = false
    fs.writeFile(dir+'/users.json',JSON.stringify(usersCache),()=>{})
    return res.status(200).json({message: `O usuario foi deletado com sucesso`})
}

export { getUsers, addUser, attUser, delUser }