require('dotenv').config()

const dbMode = process.env.DB_MODE
let replicaHost, replicaConfig = []

if (dbMode === 'replica') {
    replicaHost = process.env.DB_REP_HOST

    replicaConfig = replicaHost.split(';').map(host => {
        return {
            host,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        }
    })
}

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
        connectionTimeout: 0,
        logging: false
    },
    development_replica: {
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
        replication: {
            read: replicaConfig,
            write: { host: process.env.DB_HOST, username: process.env.DB_USERNAME, password: process.env.DB_PASSWORD }
        },
        connectionTimeout: 0,
        logging: false
    },
}