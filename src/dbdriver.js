import {default as mongodb} from 'mongodb';

var MongoClient = mongodb.MongoClient;

function initialize(dbConnectionUrl, dbName, dbCollectionName,successCallback, failureCallback, query, res){
    let client = new MongoClient(dbConnectionUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    client.connect(err => {
        if (err) {
            console.log(`[MONGO DB connection] Error: ${err}`);
            failureCallback(err);
        }
        const collection = client.db(dbName).collection(dbCollectionName);
        console.log(`[Mongo DB connection] SUCCESS`);
         let response = successCallback(query, collection);
            if(response !== 0){
            res.send(JSON.stringify(response));
            } else {
            res.send("No se encontró un alumno con ese DNI");
            }
    });
}

export {
    initialize
}