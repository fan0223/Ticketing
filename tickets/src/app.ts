import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { createTicketRouter } from './router/new'
import { showTicketRouter } from './router/show'
import { indexTicketRouter } from './router'
import { updateTicketRouter } from './router/update'

import { errorHandler, NotFoundError, currentUser } from '@fan-tickets/common'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: false
  // secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUser)

app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }