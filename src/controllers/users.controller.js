import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser = async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.deleteById(userId);
    res.send({status:"success",message:"User deleted"})
}

//AGREGAMOS EL POST PARA SWAGGER
const createUser = async(req , res) => {
    try{
        const newUser = req.body
        await usersService.create(newUser)
        res.status(200).send({ status: 'success' , message: 'USUARIO CREADO CORRECTAMENTE' })
    }catch(error){
        console.error(error)
        res.status(500).send({ status: 'error' , message: 'ERROR AL CREAR EL USUARIo' })
    }
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUser
}