import { sendMail } from '../config/emailer'
import { getUsers } from '../services/userServices'

interface Props {
  typeMsg: 'error' | 'info' | 'warning' | 'completed'
  res: any
}

const sendMail_utils = async ({ typeMsg, res }: Props) => {
  try {
    const users = await getUsers()
    const mails: String[] = []
    users?.map((user) => {
      mails.push(user.email)
    })
    //const mails = ['angelo.berrios@alumnos.ucn.cl']
    if (mails.length < 1) {
      res.status(400).send({ message: 'No existen correos' })
    }
    await sendMail({ users: mails, typeMsg })
    return true
  } catch (err) {
    return false
  }
}
export { sendMail_utils }
