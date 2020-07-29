module.exports = function(async, Club, ChatUsers) {
	return {
		setRouting: function(router) {
			router.get('/results', this.getResults);
			router.post('/results', this.postResults);
			router.get('/members', this.viewMembers);
			router.post('/members', this.searchMembers);
		},
		getResults: function(req, res) {
			res.redirect('home');
		},
		postResults: function(req, res) {
			async.parallel(
				[
					function(callback) {
						const regex = new RegExp(req.body.country, 'gi');

						Club.find({ $or: [{ country: regex }, { name: regex }] }, (err, result) => {
							callback(err, result);
						});
					},
				],
				(err, results) => {
					const res1 = results[0];

					const dataChunk = [];
					const chunkSize = 3;

					for (let i = 0; i < res1.length; i += chunkSize) {
						dataChunk.push(res1.slice(i, i + chunkSize));
					}

					res.render('results', {
						title: 'Results',
						user: req.user,
						chunks: dataChunk,
					});
				},
			);
		},
		viewMembers: function(req, res) {
			async.parallel(
				[
					function(callback) {
						ChatUsers.find({}, (err, result) => callback(err, result));
					},
				],
				(err, results) => {
					const res1 = results[0];

					const dataChunk = [];
					const chunkSize = 4;

					for (let i = 0; i < res1.length; i += chunkSize) {
						dataChunk.push(res1.slice(i, i + chunkSize));
					}

					res.render('members', {
						title: 'Members',
						user: req.user,
						chunks: dataChunk,
					});
				},
			);
		},
		searchMembers: function(req, res) {
			async.parallel(
				[
					function(callback) {
						const regex = new RegExp(req.body.username, 'gi');

						ChatUsers.find({ username: regex }, (err, result) => {
							callback(err, result);
						});
					},
				],
				(err, results) => {
					const res1 = results[0];

					const dataChunk = [];
					const chunkSize = 4;

					for (let i = 0; i < res1.length; i += chunkSize) {
						dataChunk.push(res1.slice(i, i + chunkSize));
					}

					res.render('members', {
						title: 'Members',
						user: req.user,
						chunks: dataChunk,
					});
				},
			);
		},
	};
};
