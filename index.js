const express = require('express');
const app = express();
const myData = [
    {
        'id': 1,
        'name': 'Elon'
    },
    {
        'id': 2,
        'name': 'Mark'
    },
    {
        'id': 3,
        'name': 'Bill'
    }
];

const bodyParser = require('body-parser');
app.use(express.json()); 
app.use(bodyParser.json());

//get request that fetches the entire data array
app.get('/api/data', (req, res) => {
    if (!myData ) res.status(404).send('Unable to fetch data');
    setTimeout(() => res.send(myData), 1000);
})

//post request to add a new entry to the database
app.post('/api/data', (req, res) => {
    const data = req.body;
    if (!data) res.status(404).send('Unable to fetch data');
    myData.push(data);
    setTimeout(() => res.send(myData), 1000);
})

//put request to update an existing entry in the database
app.put('/api/data/:element', (req, res) => {
    const index = myData.findIndex((obj) => {
        return obj.id === parseInt(req.params.element, 10);
        
    });
    if (index === -1) res.status(404).send('The requested data does not exist');
    myData[index] = req.body;
    setTimeout(() => res.send(myData), 1000);
})

//delete request that deletes an entry from the database
app.delete('/api/data/:element', (req, res) => {
    const index = myData .findIndex((obj) => {
        return obj.id === parseInt(req.params.element, 10);
        
    });
    if (index === -1) res.status(404).send('The requested data does not exist');
    myData.splice(index, 1);
    setTimeout(() => res.send(myData), 1000);
})

//Creating a port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
