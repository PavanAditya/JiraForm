const promiseJira = (db, json) => (new Promise((resolve, reject) => {
    // const promiseJira = async (db) => (new Promise((resolve, reject) => { //async-await
    // console.log(db)
    const collection = db.collection('documents');
    // const collection = await db.collection('documents'); //async-await
    // console.table(json);
    jira = JSON.stringify(json);
    // console.table(jira);
    // herosArray.forEach(element => {
    //     let obj = JSON.stringify(element);
    collection.insertOne(JSON.parse(jira),
        function (err, docs) {
            resolve(docs);
        }
    );
    // });
}))

module.exports = promiseJira;
