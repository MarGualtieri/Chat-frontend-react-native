const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://admin:1234@cluster0.2ga9n.mongodb.net/TPFinal-TP2?retryWrites=true&w=majority';

const client = new MongoClient(uri);

let instance = null;

async function getConnection(){
    if(instance == null){
        try{
            instance = await client.connect();
        } catch(err){
            console.log(err.message);
        }
    }
    return instance;
}

module.exports = {getConnection};


