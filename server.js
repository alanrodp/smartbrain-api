const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'alan',
            email: 'alan@alan.com',
            password: 'alan123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'brian',
            email: 'brian@brian.com',
            password: 'brian123',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    database.users.push({
        id: '1',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if(!found) {
        res.status(400).json('Not found')
    }
})

app.put('/image', (req,res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id == id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json('Not found')
    }
})

app.listen(3000)