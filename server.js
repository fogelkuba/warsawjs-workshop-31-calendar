const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fs2 = require('mz/fs');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 3333;
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// app.get('/abc', (req, res) => {
//     console.log('Server GET Abc');
//
//     if (req.query.a == null) {
//         return res.status(400).end('Error');
//     }
//
//     console.log(req.query.a);
//
//     res.status(200);
//     res.write('/GET ABC');
//     res.write('A: ' + req.query.a);
//
//     res.status(201).end()
// });
//
// app.get('/abc/:id', (req, res) => {
//     console.log(req.params);
//     res.end(req.params.id)
// });
//
// app.post('/abc', (req, res) => {
//     console.log('Server POST Abc');
//
//     res.status(200);
//     console.log(req.body);
//     res.end('/POST ABC')
// });


const data = {
    "1": {
        "name": "Stephen"
    },
    "2": {
        "name": "John"
    },
    "3": {
        "name": "Peter"
    }
};

app.get('/data', (req, res) => {
    // setTimeout(() => {
        res.json(data);
    // }, 2000)
});

app.get('/data/:id', (req, res) => {
    if (!data.hasOwnProperty(req.params.id)) {
        return res.status(404).json({
            error: 'not found'
        })
    }
    res.json(data[req.params.id]);
});

app.delete('/data/:id', (req, res) => {
    if (!data.hasOwnProperty(req.params.id)) {
        return res.status(404).json({
            error: 'not found'
        })
    }
    delete data[req.params.id];
    res.status(200).json({
        ok: true
    })
});

app.patch('/data/:id', (req, res) => {
   const old = data[req.params.id];
   const change = req.body;
   data[req.params.id] = { ...old, ...change};
   res.status(200).json({
       patched: 'ok'
   })
});

app.put('/data/:id', (req, res) => {
    data[req.params.id] = req.body;
    res.status(201).end()
});

app.post('/data', (req, res) => {
    const id = uuid.v4();
    data[id] = req.body;
    res.status(201).json({id})
});

//
//





app.get('/file', (req, res) => {
    fs.readFile('file.txt', 'utf-8', (error, data) => {
        if (error) {
            return res.status(404).json({
                error: 'file not found'
            })
        }
        res.json({
            data
        });
    })
});

app.get('/file2', (req, res) => {
    fs2.readFile('file.txt', 'utf-8')
        .then(data => {
            res.json({data, msg: 'ok'})
        })
        .catch(err => {
            res.status(404).json({
                error: 'file2 not found'
            })
        })
});
