const promiseJira = (db, res, track) => (new Promise((resolve, reject) => {
    // const promiseMovies = async (db) => (new Promise((resolve, reject) => { //async-await

    // Get the documents collection
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await

    collection.find({trackName : track}).toArray(function (err, docs) {

        console.log("Found the following tracks");
        // console.log(docs)
        res.send(JSON.stringify(docs));
        // resolve();
    });
}))

module.exports = promiseJira;