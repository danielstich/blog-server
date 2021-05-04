const mongo = require('mongodb');

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
    } 
}

exports.findByID = findByID;
exports.getPosts = getPosts;