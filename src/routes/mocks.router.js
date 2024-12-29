import MockController from '../controllers/mocks.controller.js'
import { Router } from 'express'

const controller = new MockController()
const router = Router()

router.post('/generateData/:users/:pets' , controller.generateData)
router.get('/mockingUsers/:num' , controller.getMockingUsers)
router.get('/mockingPets/:num' , controller.getMockingPets)

export default router