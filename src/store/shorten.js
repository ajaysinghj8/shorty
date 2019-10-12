const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('shorten_database');

async function create({ url, shortcode }) {
    return await db.post({
        _id: new Date().toISOString(),
        url,
        shortcode,
        startDate: new Date().toISOString(),
        redirectCount: 0,
        lastSeenDate: ''
    });
}

async function findByShortcode({ shortcode }) {
    return await db.find({
        selector: {shortcode: shortcode },
        fields: ['_id', 'url', 'shortcode','startDate', 'lastSeenDate', 'redirectCount'],
    });
}

async function getByUrl({ url }) {
    return await db.find({ url })
}

async function update({shortcode}) {
   const {docs}= await findByShortcode({shortcode});
   const doc = docs[0];
   doc.redirectCount = doc.redirectCount+1;
   doc.lastSeenDate = new Date().toISOString();
   return await db.put(doc); 
}


module.exports = {
    create, findByShortcode, getByUrl, update
};
