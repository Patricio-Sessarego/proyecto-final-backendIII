import MockingService from '../services/mocks.service.js'
import { usersService } from '../services/index.js'
import { petsService } from '../services/index.js'

const service = new MockingService()

class MockController{
    //GENERATE
    async generateData(req , res){
        const { users , pets } = req.params

        try{
            if(users > 0 && pets > 0){
                const mockingUsers = await service.generateMockingUsers(users)
                const mockingPets = await service.generateMockingPets(pets)
                await service.generateData(mockingUsers , mockingPets)

                const allUsers = await usersService.getAll()
                const allPets = await petsService.getAll()

                res.status(200).send({status: 'success' , message: `DATA GENERATED CORRECTLY. GENERATED ${users} USERS AND ${pets} PETS` , users: allUsers , pets: allPets})
            }else{
                res.status(400).send({status: 'error' , message: 'INGRESE NUMEROS MAYORES A 0'})
            }
        }catch(error){
            console.error(error)
            res.status(500).send({status: 'error' , message: 'ERROR GENERATING DATA'})
        }
    }

    //USERS
    async getMockingUsers(req , res){
        const { num } = req.params
    
        try{
            if(num > 0){
                const users = await service.generateMockingUsers(num)
                res.status(200).send({status: 'success' , payload: users})
            }else{
                res.status(400).send({status: 'error' , message: 'INGRESE UN NUMERO MAYOR A 0'})
            }
        }catch(error){
            console.error(error)
            res.status(500).send({status: 'error' , message: 'ERROR GENERATING MOCKING USERS'})
        }
    }
    
    //PETS
    async getMockingPets(req , res){
        const { num } = req.params
    
        try{
            if(num > 0){
                const pets = await service.generateMockingPets(num)
                res.status(200).send({status: 'success' , payload: pets})
            }else{
                res.status(400).send({status: 'error' , message: 'INGRESE UN NUMERO MAYOR A 0'})
            }
        }catch(error){
            console.error(error)
            res.status(500).send({status: 'error' , message: 'ERROR GENERATING MOCKING PETS'})
        }
    }
}

export default MockController