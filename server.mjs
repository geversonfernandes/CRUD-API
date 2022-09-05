import express from 'express'
import {router} from './Routers/routers.mjs'
import { cwd } from 'process'
import cors from 'cors'

const PORT = 3000
const dir = cwd()+"/public"
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.static(dir))

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost/3000');
})