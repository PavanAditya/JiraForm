const promiseJira = (db, res) => (new Promise((resolve, reject) => {
    // const promiseMovies = async (db) => (new Promise((resolve, reject) => { //async-await

    // Get the documents collection
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await

    collection.find({}).toArray(function (err, docs) {

        console.log("Found the following data");
        res.send(docs);
        resolve();
    });
}))

module.exports = promiseJira;