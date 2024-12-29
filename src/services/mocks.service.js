import { createHash } from '../utils/index.js'
import { usersService } from './index.js'
import { petsService } from './index.js'
import { faker } from '@faker-js/faker'

class MockingService{
    //GENERATE DATA
    async generateData(users , pets){
        try{
            //USERS
            for(let i = 0; i < users.length; i++){
                await usersService.create(users[i])
            }

            //PETS
            for(let i = 0; i < pets.length; i++){
                await petsService.create(pets[i])
            }
        }catch(error){
            console.error(error)
            throw new Error('ERROR GENERATING DATA')
        }
    }

    //MOCKING USERS
    async generateMockingUsers(num){
        try{
            const users = []

            for(let i = 0; i < num; i++){
                users.push({
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    email: faker.internet.email(),
                    password: await createHash("coder123"),
                    role: faker.helpers.arrayElement(["user" , "admin"]),
                    pets: []
                })
            }
    
            return users
        }catch(error){
            console.error(error)
            throw new Error('ERROR GENERATING MOCKING USERS')
        }
    }

    //MOCKING PETS
    async generateMockingPets(num){
        try{
            const pets = []
            
            for(let i = 0; i < num; i++){
                pets.push({
                    name: faker.animal.petName(),
                    specie: faker.animal.type(),
                    birthDate: faker.date.past(),
                    adopted: false,
                    owner: null,
                    image: "https://via.placeholder.com/150"
                })
            }
    
            return pets
        }catch(error){
            console.error(error)
            throw new Error('ERROR GENERATING MOCKING USERS')
        }
    }
}

export default MockingService