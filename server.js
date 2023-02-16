const express = require('express');
const app = express();

app.use(express.json());

port = 3080;
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

app.get('/srv/node', (req,res) => {
    const dades = { id: 1, nom: "Ian"}
    res.json(dades);
});