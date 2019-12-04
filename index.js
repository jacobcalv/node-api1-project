// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();
const port = 4000;

server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})

server.use(express.json());

server.get('/', (req, res) => {
    res.send('you got mail');
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The users information could not be retrieved.",
                success: false
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if(user){
              res.status(200).json(user)  
            } else {
                res.status(404).json({ 
                    message: `The user with the specified ID (${id}) does not exist. `
                })
            }  
        })
        .catch(err => {
            
            res.status(500).json({
                errorMessage: "The user information could not be retrieved.",
                success: false
            })
        })
})

server.post('/api/users', (req, res) => {
    const body = req.body;
    db.insert(body)
        .then(user => {
            res.status(201).json({
                success: true,
                user 
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                errorMessage: "There was an error while saving the user to the database"
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.remove(id)
        .then(user => {
            if(user) {
                res.status(204).end()
            } else{
                res.status(404).json({
                    success: false,
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                errorMessage: "The user could not be removed"
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    db.update(id, body)
        .then(user => {
            if(user){
                res.status(200).json({success: true, user})
            } else{
                res.status(404).json({
                    success: false, 
                    message: `id ${id} doesn't exist bruh`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                errorMessage: "The user information could not be modified.", 
                err
            })
        })
})