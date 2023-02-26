const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

port = 3080;
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});


var admin = require("firebase-admin");

var serviceAccount = require("./book-net-eb5c1-firebase-adminsdk-atp4r-064fe385bd.json");
const {getFirestore} = require("firebase-admin/firestore");

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
        app.get('/api/firebase',(req,res)=>{
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
