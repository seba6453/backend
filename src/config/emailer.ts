const nodemailer = require('nodemailer')

const mg = require('nodemailer-mailgun-transport')

import { EmailError, EmailInfo, EmailWarning, EmailCompleted } from './Emails'

const mailgunAuth = {
  auth: {
    api_key: process.env.apikey_mailgun,
    domain: process.env.domain_mailgun,
  },
}
//config smtp
const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))
/*
const createTransporter = () => {
  const transport = nodemailer.createTransport({
    host: process.env.host,
    port: 2525,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  })
  return transport
}*/

interface Props {
  users: string[] | string
  typeMsg: 'error' | 'info' | 'warning' | 'completed'
}

export const sendMail = async ({ users, typeMsg }: Props) => {
  //const transporter = createTransporter()
  let msg = 'Error TYM'
  switch (typeMsg) {
    case 'error':
      msg = EmailError
      break
    case 'info':
      msg = EmailInfo
      break
    case 'warning':
      msg = EmailWarning
      break
    case 'completed':
      msg = EmailCompleted
  }
  //test replace smtpTransport to transporter
  const info = await smtpTransport.sendMail({
    from: '"Angelo" <noreplytestAngelo@exa.com>',
    to: users,
    subject: 'Hi',
    html: msg,
  })
  console.log('message sent', info.messageId)
  return
}
