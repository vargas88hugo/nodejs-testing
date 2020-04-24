/**
 * @jest-environment node
 */

import server from '@server/app'
import User from '@models/User'
import supertest from 'supertest'
import authMiddleware from '@middleware/auth'

const app = () => supertest(server)

class Response {
    status(status) {
        this.status = status
        return this
    }

    json(data) {
        return data
    }
}

const user = {
    name: 'Test User',
    email: 'test@user.com',
    password: 'password'
}

let createdUser

describe('The auth middleware', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        createdUser = await User.create(user)
    })

    it('should  call the next function if authentication is successful', async () => {
        const access_token = createdUser.generateToken()

        const req = {
            body: {
                access_token
            }
        }

        const res = new Response()
        const next = jest.fn()

        await authMiddleware(req, res, next)

        expect(next).toHaveBeenCalled()
    })

    it('should return a 401 if authentication fails', async () => {
        const req = {
            body: {}
        }

        const res = new Response()

        const statusSpy = jest.spyOn(res, 'status')
        const jsonSpy = jest.spyOn(res, 'json')

        const next = jest.fn()

        await authMiddleware(req, res, next)

        expect(next).toHaveBeenCalledTimes(0)
        expect(statusSpy).toHaveBeenCalledWith(401)
        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Unauthenticated.'
        })
    })
})
