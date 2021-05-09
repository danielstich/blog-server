const mongo = require('mongodb');
const crypto = require('crypto');

// database URI
const uri = require('../config/keys')

// connect to MongoDB
const client = new mongo.MongoClient(uri,{ useUnifiedTopology: true });
client.connect();

async function findByID(id) {
    try {
        const db = client.db('blog');
        const collection = db.collection('posts');

        const oID = mongo.ObjectID(id);
        const post = await collection.findOne({ '_id': oID});

        return post;

    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function getPosts() {
    try {
        const db = client.db('blog');
        const collection = db.collection('posts');

        const oID = mongo.ObjectID('6091a5d10afdadb0accf2ce9');
        const post = await collection.findOne({ '_id': oID});
        // console.log(post)
        return post;

    } catch (err) {
        console.log(err)
        throw err;
    } 
}

async function getToken(password) {
    try {
        const db = client.db('blog');
        const collection = db.collection('password');

        // hash password
        const hash = crypto.createHash('sha256').update(password).digest('hex');
    
        // create token
        const token = crypto.randomBytes(128).toString('hex');
        console.log(token);

        // query password collection for has
        const success = await collection.findOneAndUpdate( { 'password': hash}, { $set : { 'token': token} } );
        console.log(success.value);

        // if not found return
        if(!success.value) throw new Error("Wrong Password");

        console.log("Correct Password")
        return token;

    } catch (err) {
        throw err;
    }
}

exports.findByID = findByID;
exports.getPosts = getPosts;
exports.getToken = getToken;