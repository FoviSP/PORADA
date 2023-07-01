const sequelize = require('./postgre-connect');
const {DataTypes} = require('sequelize');

// USER
const user_m = sequelize.define('user', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		username: {type: DataTypes.STRING, allowNull: false },
		description: {type: DataTypes.STRING, allowNull: false },
		password: {type: DataTypes.STRING, allowNull: false },
		email: {type: DataTypes.STRING, unique: true },
		avatar: {type: DataTypes.STRING, allowNull: false },
		role: {type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: 'USER' },
	},
	{
      paranoid: true,
      timestamps: true,
    }
)
const links_m = sequelize.define('links', {
	link: {type: DataTypes.STRING, unique: true}
})
links_m.removeAttribute('id');

// 1 PUBLIC
// 1.1 PAGE
const page_m = sequelize.define('page', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: {type: DataTypes.STRING },
	description: {type: DataTypes.STRING },
})
const score_m = sequelize.define('score', {
	score: {type: DataTypes.INTEGER, defaultValue: "0" }
})

//1.2 TAGS
const tags_m = sequelize.define('tags', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const taglist_m = sequelize.define('taglist', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: {type: DataTypes.STRING, unique: true, allowNull: false }
})

// 1.3 COMMENT
const comment_m = sequelize.define('comment', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	content: {type: DataTypes.STRING, allowNull: false },
	reply: {type: DataTypes.INTEGER, defaultValue: "-1" },
})
// 1.4 FILES
const pfiles_m = sequelize.define('pfiles', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// 2 DIRECT
// 2.1 PAGE
const directlist_m = sequelize.define('directlist', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const directs_m = sequelize.define('directs', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
// 2.2 MESSAGE
const message_m = sequelize.define('message', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	content: {type: DataTypes.STRING, allowNull: false},
})
// 2.3 FILES
const dfiles_m = sequelize.define('dfiles', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// 3 FILELIST
const filelist_m = sequelize.define('filelist', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	link: {type: DataTypes.STRING, unique: true, allowNull: false}
})

user_m.hasOne(links_m)
links_m.belongsTo(user_m, {
  foreignKey: 'userId'
});

user_m.hasMany(page_m)
page_m.belongsTo(user_m)

page_m.hasMany(score_m)
score_m.belongsTo(page_m)

user_m.hasMany(score_m)
score_m.belongsTo(user_m)

page_m.belongsToMany(taglist_m, {through: tags_m})
taglist_m.belongsToMany(page_m, {through: tags_m})

page_m.hasMany(comment_m)
comment_m.belongsTo(page_m)

user_m.belongsToMany(directlist_m, {through: directs_m})
directlist_m.belongsToMany(user_m, {through: directs_m})

directlist_m.hasMany(message_m)
message_m.belongsTo(directlist_m)

user_m.hasMany(message_m)
message_m.belongsTo(user_m)


message_m.belongsToMany(filelist_m, {through: dfiles_m})
filelist_m.belongsToMany(message_m, {through: dfiles_m})

user_m.hasMany(comment_m)
comment_m.belongsTo(user_m)

comment_m.belongsToMany(filelist_m, {through: pfiles_m})
filelist_m.belongsToMany(comment_m, {through: pfiles_m})

module.exports = {
	user_m, page_m, tags_m, taglist_m, score_m, links_m,
	comment_m, pfiles_m, directlist_m, directs_m, message_m, dfiles_m, filelist_m
}