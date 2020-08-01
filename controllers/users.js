module.exports = function(_, passport, User) {
	return {
		setRouting: function(router) {
			router.get('/chatlogin', this.indexPage);
			router.get('/signup', this.getSignUp);
		


			router.post('/chatlogin', User.loginValidation, this.postLogin);
			router.post('/signup', User.signupValidation, this.postSignUp);
		},
		indexPage: function(req, res) {
			const errors = req.flash('error');

			return res.render('index', {
				title: 'ChatLogin',
				messages: errors,
				hasErrors: errors.length > 0,
			});
		},
		postLogin: passport.authenticate('local.login', {
			successRedirect: '/home',
			failureRedirect: '/chatlogin',
			failureFlash: true,
		}),
		getSignUp: function(req, res) {
			const errors = req.flash('error');

			return res.render('signup', {
				title: 'ChatSignup',
				messages: errors,
				hasErrors: errors.length > 0,
			});
		},
		postSignUp: passport.authenticate('local.signup', {
			successRedirect: '/home',
			failureRedirect: '/signup',
			failureFlash: true,
		}),
		

	};
};
