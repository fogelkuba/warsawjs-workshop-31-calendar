const express = require('express');

const app = express();

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/abc', (req, res) => {
    console.log('Server GET Abc');

    if (req.query.a == null) {
        return res.status(400).end('Error');
    }

    console.log(req.query.a);

    res.status(200);
    res.write('/GET ABC');

    res.status(201).end('/GET ABC' + req.query.a)
});


app.post('/abc', (req, res) => {
    console.log('Server POST Abc');

    res.status(403);
    res.end('/POST ABC')
});
