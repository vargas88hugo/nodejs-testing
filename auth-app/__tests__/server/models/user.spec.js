/**
 * Jest environment node
 */

import server from '@server/app'
import User from '@models/User'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'

const app = () => supertest(server)

describe('The user model', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    it('should hash the user password before saving to the database', async () => {
        const user = {
            name: 'Test User',
            email: 'test@user.com',
            password: 'password'
        }

        const createdUser = await User.create(user)
        expect(bcrypt.compareSync(user.password, createdUser.password)).toBe(
            true
        )
    })

    it('should hash the user password before saving the database', async () => {
        const user = {
            name: 'Test User',
            email: 'test@user.com',
            password: 'password'
        }

        const createdUser = await User.create(user)
        expect(bcrypt.compareSync(user.password, createdUser.password)).toBe(
            true
        )
    })

    it('should set the email confirm code for the user before saving to the database', async () => {
        const user = {
            name: 'Test User',
            email: 'test@user.com',
            password: 'password'
        }

        const createdUser = await User.create(user)
        expect(createdUser.emailConfirmCode).toEqual(expect.any(String))
    })
})
