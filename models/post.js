var mongoose = require('mongoose');

var schemaOptions = {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
};

var Posts = new mongoose.Schema({
	title : { type: String, default: '', required: true },
	sumary : { type: String, default: '', required: true },
	text : { type: String, default: '', required: true },
	city : { type: String, default: '' },
	state : { type: String, default: '' },
	country : { type: String, default: '' },
	photo : [Photos],
	geopoint : [],
	created : { type: Date, default: Date.now },
	modified : { type: Date }
}, schemaOptions);

var Photos = new mongoose.Schema({
	url : { type: String },
	caption : { type: String },
	thumb : { type: String }
});

var UserSchema = new mongoose.Schema({
	username : { type: String, default: '', required: true },
	avatar : { type: String },
	name : { type: String, default: '', required: true },
	email : { type: String, default: '', required: true },
	city : { type: String, default: '' },
	country : { type: String, default: '' },
	red: String,
	redId: String,
	token: String,
	tokenSecret: String,
	posts : [Posts],
	ip: { type: String, default: '' },
	registered : { type: Date, default: Date.now },
	lastvisit : { type: Date }
});

UserSchema.statics.findOrCreate = function (profile, done) {
  this.findOne({ redId: profile.redId }, function (err, user) {
    if(err) return done(err);
    if(user) return done(null, user);
    user = new User(profile);
    user.save(done);
  });
};

var Users = mongoose.model('Users', UserSchema);



