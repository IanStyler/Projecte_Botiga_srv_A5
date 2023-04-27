const express = require('express');
const app = express();
const cors = require('cors');
const {FieldValue} = require('firebase-admin/firestore')
app.use(cors());
app.use(express.json());

const mysql = require('mysql');
port = 3080;
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

//connectar bd relacional Mysql____
const connectionMysql = mysql.createConnection({
    host: 'localhost', //Canviar per ip del servidor un cop estigui el node alla?
    user: 'root',
    password: 'admin',
    database: 'projecta_botiga'
});
connectionMysql.connect((err)=>{
    if (err) throw err;
    console.log('Connectat!');
});
//______________________________________


var admin = require("firebase-admin");

var serviceAccount = require("./book-net-eb5c1-firebase-adminsdk-atp4r-064fe385bd.json");
const {getFirestore} = require("firebase-admin/firestore");
const {firestore} = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = getFirestore();
dbConnection();

async function dbConnection(){
    const conn = db.collection("book-net").doc("clients");
    const doc = await conn.get();
    if (!doc.exists){
        console.log("El document no existeix!")
    }else{
        app.get('/api/firebase',async (req, res) => {

            const conn = db.collection("book-net").doc("clients");
            const doc = await conn.get();

            const document = doc.data();
            res.json(document);
        })

    }
}
app.post('/signup', async (req, res) =>{
    const userResponse = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        disabled: false,
    });
    res.json(userResponse);
})
app.post('/datausers',(req, res) => {
    db.collection("book-net").doc("clients").set({
        clients: FieldValue.arrayUnion({
            Adreça: req.body.Adreça,
            Cognoms: req.body.Cognoms,
            Correu: req.body.Correu,
            Nom: req.body.Nom,
            Telèfon: req.body.Telèfon})
    },{merge:true})
})

app.post('/datausersdelete',(req, res) => {
    db.collection("book-net").doc("clients").update({
        clients: FieldValue.arrayRemove({
            Adreça: req.body.Adreça,
            Cognoms: req.body.Cognoms,
            Correu: req.body.Correu,
            Nom: req.body.Nom,
            Telèfon: req.body.Telèfon})
    })
})

// Projecte Botiga A5


//Prova de connexio a bd mysql
app.get('/provaSelect',(req,res)=>{
    connectionMysql.query("SELECT * FROM projecta_botiga.productes",(err,rows)=>{
        if(err) throw err;
        res.json(rows);
    })
})