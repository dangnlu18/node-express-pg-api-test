const {Client} = require('pg')


const dbInfo = {
    user: 'me',
    host : 'localhost',
    database: 'api',
    password: process.env.LOCAL_PASSWORD,
    port: 5432,
}





const getUsers = async  (request, response) =>{
    const client = new Client(dbInfo)
    try{
        await client.connect()
        console.log('connected via async')
    
        const results = await client.query("select * from users")
        response.status(200).json(results.rows)
        
    }
    catch(err){
        console.log(err)
    }
    finally{
        console.log('connection disconnected')
        await client.end()
    }
}


const getUserById = async (request, response) =>{
    const id = parseInt(request.params.id)
    const client = new Client(dbInfo)
    try{

        await client.connect()
        console.log('connected via async')
    
        const results = await client.query("select * from users WHERE id=$1", [id])
        response.status(200).json(results.rows)
        
    }
    catch(err){
        console.log(err)
    }
    finally{
        console.log('connection disconnected')
        await client.end()
    }
}



const createUser = async (request, response)=>{
    const {name,email } = request.body
    const client = new Client(dbInfo)
    try{
        
        await client.connect()
        console.log('connected via async')
    
        const res = await client.query("insert into users (name,email) values ($1,$2)",[name,email])
        response.status(201).send(`User added with id: ${res.insertId}`)
    }
    catch(err){
        console.log(err)
    }
    finally{
        console.log('connection disconnected')
        await client.end()
    }
}



const updateUser = async (request,response)=>{
    const id = parseInt(request.params.id)
    const {name, email} = request.body
    const client = new Client(dbInfo)
    try{
        
        await client.connect()
        console.log('connected via async')
    
        const results = await client.query("update users set name=$1, email =$2 where id =$3",[name,email,id])
        response.status(200).send(`User modified with ID: ${id}`)
    }
    catch(err){
        console.log(err)
    }
    finally{
        console.log('connection disconnected')
        await client.end()
    }
}


const deleteUser = async (request, response) =>{
    const id = parseInt(request.params.id)
    const client = new Client(dbInfo)
    try{
        
        await client.connect()
        console.log('connected via async')
    
        const results = await client.query("DELETE from users WHERE id=$1", [id])
        response.status(200).send(`User deleted with ID: ${id}`)
    
    }
    catch(err){
        console.log(err)
    }
    finally{
        console.log('connection disconnected')
        await client.end()
    }
}



module.exports ={
    getUsers,
    getUserById, 
    createUser,
    updateUser,
    deleteUser

}