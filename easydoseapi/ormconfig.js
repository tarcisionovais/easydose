module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "iasmimoliveira",
    "password": "1234",
    "database": "crud_user",
    "synchronize": false,
    "logging": true,
    "cli": {
      "migrationsDir": './src/database/migrations'
   },
    "entities": [
       "./src/entities/**/*.ts"
    ],
    "migrations": [
       "./src/database/migrations/*.ts"
    ]
}