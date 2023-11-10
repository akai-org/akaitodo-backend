const dbConfig = require('../configs/mysql.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DATABASE,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.DIALECT,
    },
);

const db = {};
db.sequelize = sequelize;
db.models = {};

db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.Note = require('./note')(sequelize, Sequelize.DataTypes);
db.models.Task = require('./task')(sequelize, Sequelize.DataTypes);
db.models.EventTemplate = require('./eventTemplate')(
    sequelize,
    Sequelize.DataTypes,
);
db.models.Event = require('./event')(sequelize, Sequelize.DataTypes);
db.models.Session = require('./session')(sequelize, Sequelize.DataTypes);
db.models.AccessToken = require('./accessToken')(
    sequelize,
    Sequelize.DataTypes,
);

// User - Session relation
db.models.User.hasMany(db.models.Session, {
    foreignKey: {
        name: 'userId',
    },
});
db.models.Session.belongsTo(db.models.User);

// User - Access Token relation
db.models.User.hasMany(db.models.AccessToken, {
    foreignKey: {
        name: 'userId',
    },
});
db.models.AccessToken.belongsTo(db.models.User);

// User - Notes relation
db.models.User.hasMany(db.models.Note, {
    foreignKey: {
        name: 'userId',
    },
});
db.models.Note.belongsTo(db.models.User);

// User - Tasks relation
db.models.User.hasMany(db.models.Task, {
    foreignKey: {
        name: 'userId',
    },
});
db.models.Task.belongsTo(db.models.User);

// User - Event (template) relation
db.models.User.hasMany(db.models.EventTemplate, {
    foreignKey: {
        name: 'userId',
    },
});
db.models.EventTemplate.belongsTo(db.models.User);

// Event - Event (template) relation
db.models.EventTemplate.hasMany(db.models.Event, {
    foreignKey: {
        name: 'eventTemplateId',
    },
});
db.models.Event.belongsTo(db.models.EventTemplate);

module.exports = db;
