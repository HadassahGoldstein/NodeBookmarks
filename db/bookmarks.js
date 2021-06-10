
const knex = require('knex')({
    client: 'mssql',
    connection: {
        server: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        options: {
            port: 1433,
            instanceName: 'SQLEXPRESS'
        }
    }
});
const addBookmark=async bookmark =>{
    await knex('bookmarks').insert(bookmark);
}
const getUserBookmarks=async id=>{
    return await knex('bookmarks').where('userId',id);
}
const deleteBookmark=async id=>{
    await knex('bookmarks').where('id', id).del();
}
const updateBookmark=async bookmark=>{
    await knex('bookmarks').update('title', bookmark.Title).where('id',bookmark.Id);
}
const GetTop5Urls=async()=>{
    return await knex.from('bookmarks').select({url: 'bookmarks.url'})
    .count({ count: 'bookmarks.url' }).groupBy('bookmarks.url')
    .orderBy('count', 'desc').limit(5);
}
module.exports={
    addBookmark,
    getUserBookmarks,
    deleteBookmark,
    updateBookmark,
    GetTop5Urls
}






       
        
       
        
      
