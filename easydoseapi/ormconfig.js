module.exports = {
    "type": "postgres",
    "host": `${process.env.DATABASE_HOST}`,
    "port": `${process.env.DATABASE_PORT}`,
    "username": `${process.env.DATABASE_USERNAME}`,
    "password": `${process.env.DATABASE_PASSWORD}`,
    "database": `${process.env.DATABASE_NAME}`,
    "synchronize": true,
    "logging": true,
    "cli": {
      "migrationsDir": './src/database/migrations',
      "entitiesDir": "./src/entities/"
   },
    "entities": [
       "./src/entities/**/*.ts"
    ],
    "migrations": [
       "./src/database/migrations/*.ts"
    ]
}