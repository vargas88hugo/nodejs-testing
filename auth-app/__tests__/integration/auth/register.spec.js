/**
 * @jest-environment node
 */
import server from '@server/app'
import supertest from 'supertest'
import { disconnect } from '@tests/utils/mongoose'

import User from '@models/User'

const app = () => supertest(server)

describe('The register process', () => {
    let user = {
        name: 'Test User',
        email: 'test01@user.com',
        password: 'password'
    }

    it('should register a new user', async () => {
        const response = await app()
            .post('/api/v1/auth/register')
            .send(user)
    })

    it('should return a 422 if registration fails', async () => {
        await User.create(user)
        const response = await app()
            .post('/api/v1/auth/register')
            .send(user)

        expect(response.status).toBe(422)
        expect(response.body.message).toBe('Validation failed.')
        expect(response.body.data.errors).toEqual({
            email: 'This email has already been taken.'
        })
    })

    afterAll(async () => {
        await disconnect()
    })
})
