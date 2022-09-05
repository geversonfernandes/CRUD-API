import  Router  from "express"
import { getUsers, addUser, attUser, delUser } from "../Controller/controller.mjs"

const router = Router()

// retorna todos os usuários
router.get('/users', getUsers)

//criar novo usuário
router.post('/users', addUser)

//atualizar usuários
router.put('/users/:id', attUser)

// deletar usuários
router.delete('/users/:id', delUser)

export {router}