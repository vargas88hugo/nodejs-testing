/**
 * @jest-environment node
 */

import server from '@server/app'
import User from '@models/User'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '@config'

const app = () => supertest(server)

const user = {
    name: 'Test User',
    email: 'test@user.com',
    password: 'password'
}

let createdUser

describe('The user model', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        createdUser = await User.create(user)
    })

    it('should hash the user password before saving to the database', async () => {
        expect(bcrypt.compareSync(user.password, createdUser.password)).toBe(
            true
        )
    })

    it('should set the email confirm code for the user before saving to the database', async () => {
        expect(createdUser.emailConfirmCode).toEqual(expect.any(String))
    })
})

describe('The generateToken method', () => {
    it('should generate a valid jwt for a user', () => {
        const token = createdUser.generateToken()

        const { id } = jwt.verify(token, config.jwtSecret)

        expect(id).toEqual(JSON.parse(JSON.stringify(createdUser._id)))
    })
})
