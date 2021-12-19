const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false
});

databaseConnect = () => {
    try {
        sequelize.authenticate();
        console.log(`Connecté à la base de données MySQL : ${process.env.DB_DATABASE}`);

    } catch (error) {
        console.error('Impossible de se connecter, erreur suivante :', error);
    }
}

databaseConnect()

module.exports = sequelize;
