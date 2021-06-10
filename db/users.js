const bcrypt = require('bcrypt');
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

const add=async user=>{
user.passwordHash=await bcrypt.hash(user.password,10);
delete user.password;
await knex('users').insert(user);
}

const login = async (email, password) => {
    const results = await knex('users').where('Email', email);
    if(!results.length) {
        return null;
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    return isMatch ? user : null;
}

module.exports={
    add,
    login
}