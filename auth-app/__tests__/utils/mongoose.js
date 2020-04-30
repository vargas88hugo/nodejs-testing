import mongoose from 'mongoose'

export const disconnect = () => mongoose.connection.close()
