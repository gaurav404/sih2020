const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
	username: { type: String, unique: true },
	email: { type: String, default:'' },
	created:Date,
	password: { type: String, default: '' },
	userImage: { type: String, default: 'default.png' },

	sentRequest: [{ username: { type: String, default: '' } }],
	request: [
		{
			userId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatUser' },
			username: { type: String, default: '' },
		},
	],
	friendList: [
		{
			friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatUser' },
			friendName: { type: String, default: '' },
		},
	],
	gender: { type: String, default: '' },
});

userSchema.methods = {
	encryptPassword: function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	},
	validUserPassword: function(password) {
		return bcrypt.compareSync(password, this.password);
	},
};

module.exports = mongoose.model('ChatUser', userSchema);
