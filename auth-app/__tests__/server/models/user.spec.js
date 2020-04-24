/**
 * Jest environment node
 */

import server from '@server/app'
import User from '@models/User'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'

const app = () => supertest(server)

describe('The user model', () => {
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
})
