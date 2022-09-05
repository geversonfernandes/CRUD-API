import fs from 'node:fs'
import { cwd } from 'process'
import { usersCache } from '../Controller/controller.mjs';

const dir = cwd()+"/Database"

function addNewUserToDataBase(newUser){
    usersCache.push(newUser)
    fs.writeFile(dir+'/users.json',JSON.stringify(usersCache),()=>{})
}

export {addNewUserToDataBase}