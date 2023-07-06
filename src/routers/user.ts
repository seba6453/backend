import Express from 'express'
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../services/userServices'
import { User, UserNew } from '../types/user_types'

const router = Express.Router()
import { sendMail } from '../config/emailer'

router.get('/', async (_req, res) => {
  const users = await getUsers()
  res.status(200).send(users)
})

router.get('/testMail', async (_req, res) => {
  try {
    const users = ['iangelob99@gmail.com']
    await sendMail({ users, typeMsg: 'info' })
    res.status(200).send({ message: 'Correo enviado correctamente' })
  } catch (err) {
    res.status(400).send({ message: 'Error enviando el correo', err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const idUser = parseInt(req.params.id)
    const user = await getUser(idUser)
    if (user != undefined) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ mensaje: 'Usuario no encontrado' })
    }
  } catch {
    res.status(400).send({ mensaje: 'Error en el id' })
  }
})

router.post('/', async (req, res) => {
  const userNew: UserNew = req.body
  const idUSer = await addUser(userNew)
  if (idUSer >= 0) {
    res.status(201).send({ id: idUSer })
  } else {
    res.status(400).send({ mensaje: 'Error en la carga del usuario' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const user: User = {
      id: parseInt(req.params.id),
      name: req.body.name,
      email: req.body.email,
    }
    if (await updateUser(user)) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ mensaje: 'usuario no actualizado' })
    }
  } catch {
    res.status(400).send({ mensaje: 'Error en el id' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const idUser = parseInt(req.params.id)
    if (await deleteUser(idUser)) {
      res.status(200).send({ mensaje: 'Usuario eliminado' })
    } else {
      res.status(400).send({ mensaje: 'Error al eliminar al usuario' })
    }
  } catch {
    res.status(400).send({ mensaje: 'Error en el id' })
  }
})

export default router
