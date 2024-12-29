import supertest from 'supertest'
import mongoose from 'mongoose'
import chai from 'chai'

const expect = chai.expect
mongoose.set('strictQuery' , true)
const requester = supertest("http://localhost:8080")

describe("TESTING DE LA RUTA /api/adoptions" , () => {
    before(async function(){
        await mongoose.connect("mongodb+srv://Patricio-Sessarego:Patricio2005@clustercoderhouse.jdm36.mongodb.net/BackendIII?retryWrites=true&w=majority&appName=ClusterCoderHouse")
    })

    describe("ENDPOINT GET => /api/adoptions" , () => {
        it("DEBE TRAER CORRECTAMENTE TODAS LAS ADOPCIONES EN UN ARRAY" , async () => {
            try{
                const { status , _body } = await requester.get('/api/adoptions')

                expect(status).to.equal(200)
                expect(_body.payload).to.be.an("array")
            }catch(error){
                console.error(error)
                expect.fail("ERROR AL PROCESAR EL TEST DEL ENDPOINT GET /api/adoptions")
            }
        })

        it("ME RETORNA 404 SI LA RUTA NO EXISTE" , async () => {
            try{
                const { status } = await requester.get('/adoptions/noexiste')

                expect(status).to.equal(404)
            }catch(error){
                console.error(error)
                expect.fail("ERROR AL PROCESAR EL TEST DEL ENDPOINT GET /api/adoptions")
            }
        })
    })

    describe("ENDPOINT GET => /api/adoptions/:aid" , () => {
        it("DEBE TRAER CORRECTAMENTE LA ADOPCION POR ID" , async () => {
            try{
                const id = "677007453089e8f9745558c0"

                const { status , _body } = await requester.get(`/api/adoptions/${id}`)
    
                expect(status).to.equal(200)
                expect(_body.payload).to.have.property("_id").that.equals(id)
            }catch(error){
                console.error(error)
                expect.fail("ERROR AL PROCESAR EL TEST DEL ENDPOINT GET /api/adoptions/:aid")
            }
        })

        it("DEBE RETORNA 404 SI EL ID ES INCORRECTO" , async () => {
            try{
                let idInexistente = "6760413d1f94e86ca38352fc"

                const { status , _body } = await requester.get(`/api/adoptions/${idInexistente}`)
    
                expect(status).to.equal(404)
                expect(_body).to.have.property("error").that.equals("Adoption not found")
            }catch(error){
                console.error(error)
                expect.fail("ERROR AL PROCESAR EL TEST DEL ENDPOINT GET /api/adoptions/:aid")
            }
        })
    })

    describe("ENDPOINT POST => /api/adoptions/:uid/:pid" , () => {
        it("DEBE CREAR CORRECTAMENTE UNA ADOPCION" , async () => {
            try{
                const uid = "6770070095f5a41deeb267f5"
                const pid = "6770070095f5a41deeb267fd"

                const { status , _body } = await requester.post(`/api/adoptions/${uid}/${pid}`)

                expect(status).to.equal(200)
                expect(_body).to.have.property("message").that.equals("Pet adopted")
            }catch(error){
                console.error(error)
                expect.fail("ERROR AL PROCESAR EL TEST DEL ENDPOINT POST /api/adoptions/:uid/:pid")
            }
        })

        it("LA MASCOTA YA ESTA ADOPTADA" , async () => {
            try{
                const uid = "6770070095f5a41deeb267f5"
                const pid = "6770070095f5a41deeb267f9"

                const { status , _body } = await requester.post(`/api/adoptions/${uid}/${pid}`)

                expect(status).to.equal(400)
                expect(_body).to.have.property("error").that.equals("Pet is already adopted")
            }catch(error){
                console.error(error)
                expect.fail("ERROR AL PROCESAR EL TEST DEL ENDPOINT POST /api/adoptions/:uid/:pid")
            }
        })

        it("NO EXISTE LA MASCOTA" , async () => {
            try{
                const uid = "6770070095f5a41deeb267f5"
                const pid = "676ffab497173daefe6fe252"

                const { status , _body } = await requester.post(`/api/adoptions/${uid}/${pid}`)

                expect(status).to.equal(404)
                expect(_body).to.have.property("error").that.equals("Pet not found")
            }catch(error){
                console.error(error)
                expect.fail("ERROR AL PROCESAR EL TEST DEL ENDPOINT POST /api/adoptions/:uid/:pid")
            }
        })

        it("NO EXISTE EL USUARIO" , async () => {
            try{
                const uid = "676ffab497173daefe6fe24a"
                const pid = "6770070095f5a41deeb26801"

                const { status , _body } = await requester.post(`/api/adoptions/${uid}/${pid}`)

                expect(status).to.equal(404)
                expect(_body).to.have.property("error").that.equals("User not found")
            }catch(error){
                console.error(error)
                expect.fail("ERROR AL PROCESAR EL TEST DEL ENDPOINT POST /api/adoptions/:uid/:pid")
            }
        })
    })

    after(async function(){
        await mongoose.disconnect()
    })
})