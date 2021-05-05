import {default as mongodb} from 'mongodb';

let MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://admin:admin@branalanacluster.rjrre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
    const collection = client.db("universidad").collection("alumnos");
    collection.find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close().then(()=> console.log("Conexión cerrada"));
    });
});
