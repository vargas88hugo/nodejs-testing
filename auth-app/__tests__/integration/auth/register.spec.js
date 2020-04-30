/**
 * @jest-environment node
 */
import server from '@server/app'
import supertest from 'supertest'
import { disconnect } from '@tests/utils/mongoose'

const app = () => supertest(server)

describe('The register process', () => {
    it('should register a new user', async () => {
        const response = await app()
            .post('/api/v1/auth/register')
            .send({
                name: 'Test User',
                email: 'test01@user.com',
                password: 'password'
            })

        console.log(response.body)
    })

    afterAll(async () => {
        await disconnect()
    })
})
