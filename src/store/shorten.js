const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('shorten_database');

async function create({ url, shortcode }) {
    return await db.post({
        _id: new Date().toISOString(),
        url,
        shortcode
    });
}

async function has({ shortcode }) {
    return await db.find({
        selector: {shortcode: shortcode },
        fields: ['_id', 'url', 'shortcode'],
    });
}

async function getByUrl({ url }) {
    return await db.find({ url })
}


module.exports = {
    create, has, getByUrl
};
