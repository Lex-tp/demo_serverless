const express = require('express');
const AWS = require('aws-sdk');
const path = require('path');

const router = express.Router();
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'xxxxxx',
    secretAccessKey: 'xxxxxx'
})

router.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

router.get('/footballers/:footballerId', (req, res) => {
    const params = {
        TableName: 'footballersTable',
        Key: {
            footballerId: req.params.footballerId
        }
    }

    dynamoDb.get(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Could not get footballer' });
        }
        if (result.Item) {
            const {footballerId, name, club} = result.Item;
            res.json({ footballerId, name, club });
        } else {
            res.status(404).json({ error: "Footballer not found" });
        }
    });
});

router.get('/footballers', (req, res)  => {

    const params = {
        TableName: 'footballersTable',
    };

    dynamoDb.scan(params, (error,data) => {
        if (error) {
            res.status(400).json({ error: 'No data available' });
        }
        console.log(data);
        res.json({data});
    });
});

router.post('/footballers', (req, res)  => {
    const { footballerId, name, club } = req.body;
    console.log(typeof footballerId);
    if (typeof footballerId !== 'string') {
        res.status(400).json({ error: '"footballerId" must be a string' });
    } else if (typeof name !== 'string') {
        res.status(400).json({ error: '"Name" must be a string' });
    }

    const params = {
        TableName: 'footballersTable',
        Item: {
            footballerId: footballerId,
            name: name,
            club: club
        },
    };

    dynamoDb.put(params, (error) => {
        if (error) {
            res.status(400).json({ error: 'Could not create new footballer' });
        }
        res.json({ footballerId, name, club });
    });
});

router.use('*', (req,res)=> {
    res.status(400).send(`Page not found`);
})

module.exports = router;